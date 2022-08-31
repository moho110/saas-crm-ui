<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="部门" prop="department">
        <el-input
          v-model="queryParams.department"
          placeholder="请输入部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员" prop="person">
        <el-input
          v-model="queryParams.person"
          placeholder="请输入人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input
          v-model="queryParams.class"
          placeholder="请输入班级"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人" prop="exman">
        <el-input
          v-model="queryParams.exman"
          placeholder="请输入审核人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员名称" prop="personname">
        <el-input
          v-model="queryParams.personname"
          placeholder="请输入人员名称"
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
          v-hasPermi="['crm-hr:xingzhengqingjia:add']"
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
          v-hasPermi="['crm-hr:xingzhengqingjia:edit']"
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
          v-hasPermi="['crm-hr:xingzhengqingjia:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:xingzhengqingjia:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="xingzhengqingjiaList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款" align="center" prop="term" />
      <el-table-column label="部门" align="center" prop="department" />
      <el-table-column label="人员" align="center" prop="person" />
      <el-table-column label="时间" align="center" prop="time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.time, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="exstatus" />
      <el-table-column label="审核人" align="center" prop="exman" />
      <el-table-column label="人员名称" align="center" prop="personname" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:xingzhengqingjia:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:xingzhengqingjia:remove']"
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

    <!-- 添加或修改行政请假对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款" prop="term">
          <el-input v-model="form.term" placeholder="请输入条款" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="人员" prop="person">
          <el-input v-model="form.person" placeholder="请输入人员" />
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker clearable
            v-model="form.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周" prop="week">
          <el-input v-model="form.week" placeholder="请输入周" />
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="form.class" placeholder="请输入班级" />
        </el-form-item>
        <el-form-item label="请假类型" prop="qingjiaType">
          <el-radio v-model="form.qingjiaType" label="1">特殊</el-radio>
          <el-radio v-model="form.qingjiaType" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="审核状态" prop="exStatus">
          <el-radio v-model="form.exStatus" label="1">良好</el-radio>
          <el-radio v-model="form.exStatus" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="工作流ID" prop="workflowid">
          <el-input v-model="form.workflowid" placeholder="请输入工作流ID" />
        </el-form-item>
        <el-form-item label="审核人" prop="exman">
          <el-input v-model="form.exman" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="extime">
          <el-input v-model="form.extime" placeholder="请输入审核时间" />
        </el-form-item>
        <el-form-item label="人员名称" prop="personname">
          <el-input v-model="form.personname" placeholder="请输入${comment}" />
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
import { listXingzhengqingjia, getXingzhengqingjia, delXingzhengqingjia, addXingzhengqingjia, updateXingzhengqingjia } from "@/api/crm-hr/xingzhengqingjia";

export default {
  name: "Xingzhengqingjia",
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
      // 行政请假表格数据
      xingzhengqingjiaList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        term: null,
        department: null,
        person: null,
        time: null,
        week: null,
        class: null,
        qingjiatype: null,
        exstatus: null,
        workflowid: null,
        exman: null,
        extime: null,
        personname: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        term: [
          { required: true, message: "条款不能为空", trigger: "blur" }
        ],
        department: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        person: [
          { required: true, message: "人员不能为空", trigger: "blur" }
        ],
        time: [
          { required: true, message: "时间不能为空", trigger: "blur" }
        ],
        week: [
          { required: true, message: "周不能为空", trigger: "blur" }
        ],
        class: [
          { required: true, message: "班级不能为空", trigger: "blur" }
        ],
        qingjiatype: [
          { required: true, message: "请假类型不能为空", trigger: "change" }
        ],
        exstatus: [
          { required: true, message: "审核状态不能为空", trigger: "blur" }
        ],
        workflowid: [
          { required: true, message: "工作流ID不能为空", trigger: "blur" }
        ],
        exman: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        extime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        personname: [
          { required: true, message: "人员名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政请假列表 */
    getList() {
      this.loading = true;
      listXingzhengqingjia(this.queryParams).then(response => {
        this.xingzhengqingjiaList = response.rows;
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
        term: null,
        department: null,
        person: null,
        time: null,
        week: null,
        class: null,
        qingjiatype: null,
        exstatus: 0,
        workflowid: null,
        exman: null,
        extime: null,
        personname: null
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
      this.title = "添加行政请假";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getXingzhengqingjia(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政请假";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXingzhengqingjia(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXingzhengqingjia(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政请假编号为"' + ids + '"的数据项？').then(function() {
        return delXingzhengqingjia(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/xingzhengqingjia/export', {
        ...this.queryParams
      }, `xingzhengqingjia_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
