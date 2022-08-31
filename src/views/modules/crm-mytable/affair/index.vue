<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="余下日期" prop="remindDate">
        <el-date-picker clearable
          v-model="queryParams.remindDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择余下日期">
        </el-date-picker>
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
          v-hasPermi="['crm-mytable:affair:add']"
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
          v-hasPermi="['crm-mytable:affair:edit']"
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
          v-hasPermi="['crm-mytable:affair:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:affair:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="affairList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="余下日期" align="center" prop="remindDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.remindDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理ID" align="center" prop="managerId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:affair:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:affair:remove']"
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

    <!-- 添加或修改事务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker clearable
            v-model="form.beginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-radio v-model="form.TYPE" label="1">特殊</el-radio>
          <el-radio v-model="form.TYPE" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="余下日期" prop="remindDate">
          <el-date-picker clearable
            v-model="form.remindDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择余下日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="余下时间" prop="remindTime">
          <el-date-picker clearable
            v-model="form.remindTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择余下时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="最后时间" prop="lastRemind">
          <el-date-picker clearable
            v-model="form.lastRemind"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最后时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="短信发送时间" prop="sms2Remind">
          <el-input v-model="form.sms2Remind" placeholder="请输入短信发送时间" />
        </el-form-item>
        <el-form-item label="最后短信发送时间" prop="lastSms2Remind">
          <el-date-picker clearable
            v-model="form.lastSms2Remind"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最后短信发送时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="管理ID" prop="managerId">
          <el-input v-model="form.managerId" placeholder="请输入管理ID" />
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
import { listAffair, getAffair, delAffair, addAffair, updateAffair } from "@/api/crm-mytable/affair";

export default {
  name: "Affair",
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
      // 事务表格数据
      affairList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        beginTime: null,
        endTime: null,
        type: null,
        remindDate: null,
        remindTime: null,
        content: null,
        lastRemind: null,
        sms2Remind: null,
        lastSms2Remind: null,
        managerId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        beginTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        remindDate: [
          { required: true, message: "余下日期不能为空", trigger: "blur" }
        ],
        remindTime: [
          { required: true, message: "余下时间不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        lastRemind: [
          { required: true, message: "最后时间不能为空", trigger: "blur" }
        ],
        sms2Remind: [
          { required: true, message: "短信发送时间不能为空", trigger: "blur" }
        ],
        lastSms2Remind: [
          { required: true, message: "最后短信发送时间不能为空", trigger: "blur" }
        ],
        managerId: [
          { required: true, message: "管理ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询事务列表 */
    getList() {
      this.loading = true;
      listAffair(this.queryParams).then(response => {
        this.affairList = response.rows;
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
        userId: null,
        beginTime: null,
        endTime: null,
        type: null,
        remindDate: null,
        remindTime: null,
        content: null,
        lastRemind: null,
        sms2Remind: null,
        lastSms2Remind: null,
        managerId: null
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
      this.title = "添加事务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAffair(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改事务";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAffair(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAffair(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除事务编号为"' + ids + '"的数据项？').then(function() {
        return delAffair(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/affair/export', {
        ...this.queryParams
      }, `affair_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
