<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务名称" prop="taskName">
        <el-input
          v-model="queryParams.taskName"
          placeholder="请输入任务名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务代码" prop="taskCode">
        <el-input
          v-model="queryParams.taskCode"
          placeholder="请输入任务代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['crm-political:officetask:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['crm-political:officetask:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['crm-political:officetask:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:officetask:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="officetaskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="任务类型" align="center" prop="taskType" />
      <el-table-column label="内部时间" align="center" prop="interval" />
      <el-table-column label="执行时间" align="center" prop="execTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.execTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务URL地址" align="center" prop="taskUrl" />
      <el-table-column label="任务名称" align="center" prop="taskName" />
      <el-table-column label="任务代码" align="center" prop="taskCode" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-political:officetask:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:officetask:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改办公任务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="内部时间" prop="interval">
          <el-radio v-model="form.taskType" label="1">特殊</el-radio>
          <el-radio v-model="form.taskType" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="内部时间" prop="interval">
          <el-input v-model="form.interval" placeholder="请输入内部时间" />
        </el-form-item>
        <el-form-item label="执行时间" prop="execTime">
          <el-date-picker clearable
            v-model="form.execTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择执行时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最终执行" prop="lastExec">
          <el-date-picker clearable
            v-model="form.lastExec"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最终执行">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务URL地址" prop="taskUrl">
          <el-input v-model="form.taskUrl" placeholder="请输入任务URL地址" />
        </el-form-item>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="任务描述" prop="taskDesc">
          <el-input v-model="form.taskDesc" placeholder="请输入任务描述" />
        </el-form-item>
        <el-form-item label="任务代码" prop="taskCode">
          <el-input v-model="form.taskCode" placeholder="请输入任务代码" />
        </el-form-item>
        <el-form-item label="使用标识" prop="useFlag">
          <el-radio v-model="form.useFlag" label="1">保留</el-radio>
          <el-radio v-model="form.useFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="系统任务" prop="sysTask">
          <el-input v-model="form.sysTask" placeholder="请输入系统任务" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOfficetask, getOfficetask, delOfficetask, addOfficetask, updateOfficetask } from "@/api/crm-political/officetask";

export default {
  name: "Officetask",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 办公任务表格数据
      officetaskList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        taskType: null,
        interval: null,
        execTime: null,
        lastExec: null,
        taskUrl: null,
        taskName: null,
        taskDesc: null,
        taskCode: null,
        useFlag: null,
        sysTask: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        taskType: [
          { required: true, message: "任务类型不能为空", trigger: "change" }
        ],
        interval: [
          { required: true, message: "内部时间不能为空", trigger: "blur" }
        ],
        execTime: [
          { required: true, message: "执行时间不能为空", trigger: "blur" }
        ],
        lastExec: [
          { required: true, message: "最后执行不能为空", trigger: "blur" }
        ],
        taskUrl: [
          { required: true, message: "任务URL地址不能为空", trigger: "blur" }
        ],
        taskName: [
          { required: true, message: "任务名称不能为空", trigger: "blur" }
        ],
        taskDesc: [
          { required: true, message: "任务描述不能为空", trigger: "blur" }
        ],
        taskCode: [
          { required: true, message: "任务代码不能为空", trigger: "blur" }
        ],
        useFlag: [
          { required: true, message: "使用标识不能为空", trigger: "blur" }
        ],
        sysTask: [
          { required: true, message: "系统任务不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询办公任务列表 */
    getList() {
      this.loading = true;
      listOfficetask(this.queryParams).then(response => {
        this.officetaskList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        taskType: null,
        interval: null,
        execTime: null,
        lastExec: null,
        taskUrl: null,
        taskName: null,
        taskDesc: null,
        taskCode: null,
        useFlag: null,
        sysTask: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加办公任务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOfficetask(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改办公任务";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOfficetask(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOfficetask(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除办公任务编号为"' + ids + '"的数据项？').then(function() {
        return delOfficetask(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/officetask/export', {
        ...this.queryParams
      }, `officetask_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
