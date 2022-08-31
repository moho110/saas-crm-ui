<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="来自ID" prop="fromId">
        <el-input
          v-model="queryParams.fromId"
          placeholder="请输入来自ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标题" prop="subject">
        <el-input
          v-model="queryParams.subject"
          placeholder="请输入标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发送时间" prop="sendTime">
        <el-date-picker clearable
          v-model="queryParams.sendTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择发送时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发送标识" prop="sendFlag">
        <el-input
          v-model="queryParams.sendFlag"
          placeholder="请输入发送标识"
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
          v-hasPermi="['crm-mytable:email:add']"
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
          v-hasPermi="['crm-mytable:email:edit']"
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
          v-hasPermi="['crm-mytable:email:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:email:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="emailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="来自ID" align="center" prop="fromId" />
      <el-table-column label="客户" align="center" prop="customers" />
      <el-table-column label="供应商" align="center" prop="supplys" />
      <el-table-column label="其他" align="center" prop="others" />
      <el-table-column label="标题" align="center" prop="subject" />
      <el-table-column label="发送时间" align="center" prop="sendTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.sendTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:email:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:email:remove']"
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

    <!-- 添加或修改发送邮件对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="来自ID" prop="fromId">
          <el-input v-model="form.fromId" placeholder="请输入来自ID" />
        </el-form-item>
        <el-form-item label="客户" prop="customers">
          <el-input v-model="form.customers" type="textarea" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplys">
          <el-input v-model="form.supplys" type="textarea" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="其他" prop="others">
          <el-input v-model="form.others" type="textarea" placeholder="请输入其他" />
        </el-form-item>
        <el-form-item label="标题" prop="subject">
          <el-input v-model="form.subject" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="发送时间" prop="sendTime">
          <el-date-picker clearable
            v-model="form.sendTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发送时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件ID" prop="attachmentId">
          <el-input v-model="form.attachmentId" type="textarea" placeholder="请输入附件ID" />
        </el-form-item>
        <el-form-item label="附件名称" prop="attachmentName">
          <el-input v-model="form.attachmentName" type="textarea" placeholder="请输入附件名称" />
        </el-form-item>
        <el-form-item label="发送标识" prop="sendFlag">
          <el-radio v-model="form.sendFlag" label="1">已发送</el-radio>
          <el-radio v-model="form.sendFlag" label="0">未发送</el-radio>
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
import { listEmail, getEmail, delEmail, addEmail, updateEmail } from "@/api/crm-mytable/email";

export default {
  name: "Email",
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
      // 发送邮件表格数据
      emailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fromId: null,
        customers: null,
        supplys: null,
        others: null,
        subject: null,
        content: null,
        sendTime: null,
        attachmentId: null,
        attachmentName: null,
        sendFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fromId: [
          { required: true, message: "来自ID不能为空", trigger: "blur" }
        ],
        customers: [
          { required: true, message: "客户不能为空", trigger: "blur" }
        ],
        supplys: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ],
        others: [
          { required: true, message: "其他不能为空", trigger: "blur" }
        ],
        subject: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        sendTime: [
          { required: true, message: "发送时间不能为空", trigger: "blur" }
        ],
        attachmentId: [
          { required: true, message: "附件ID不能为空", trigger: "blur" }
        ],
        attachmentName: [
          { required: true, message: "附件名称不能为空", trigger: "blur" }
        ],
        sendFlag: [
          { required: true, message: "发送标识不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询发送邮件列表 */
    getList() {
      this.loading = true;
      listEmail(this.queryParams).then(response => {
        this.emailList = response.rows;
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
        fromId: null,
        customers: null,
        supplys: null,
        others: null,
        subject: null,
        content: null,
        sendTime: null,
        attachmentId: null,
        attachmentName: null,
        sendFlag: null
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
      this.title = "添加发送邮件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getEmail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改发送邮件";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEmail(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEmail(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除发送邮件编号为"' + ids + '"的数据项？').then(function() {
        return delEmail(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/email/export', {
        ...this.queryParams
      }, `email_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
