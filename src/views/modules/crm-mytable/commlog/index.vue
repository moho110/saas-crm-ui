<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="系统用户" prop="sysuser">
        <el-input
          v-model="queryParams.sysuser"
          placeholder="请输入系统用户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监视人" prop="moniterman">
        <el-input
          v-model="queryParams.moniterman"
          placeholder="请输入监视人"
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
          v-hasPermi="['crm-mytable:commlog:add']"
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
          v-hasPermi="['crm-mytable:commlog:edit']"
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
          v-hasPermi="['crm-mytable:commlog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:commlog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="commlogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="系统用户" align="center" prop="sysuser" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="客户ID" align="center" prop="customerid" />
      <el-table-column label="通用日志日期" align="center" prop="commdate" />
      <el-table-column label="联系人ID" align="center" prop="linkmanid" />
      <el-table-column label="项目" align="center" prop="project" />
      <el-table-column label="产品ID" align="center" prop="productid" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:commlog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:commlog:remove']"
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

    <!-- 添加或修改通用日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="系统用户" prop="sysuser">
          <el-input v-model="form.sysuser" placeholder="请输入系统用户" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="通用日期" prop="commdate">
          <el-input v-model="form.commdate" placeholder="请输入通用日期" />
        </el-form-item>
        <el-form-item label="联系人ID" prop="linkmanid">
          <el-input v-model="form.linkmanid" placeholder="请输入联系人ID" />
        </el-form-item>
        <el-form-item label="项目" prop="project">
          <el-input v-model="form.project" placeholder="请输入项目" />
        </el-form-item>
        <el-form-item label="产品ID" prop="productid">
          <el-input v-model="form.productid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="项目短语" prop="projectphase">
          <el-input v-model="form.projectphase" placeholder="请输入项目短语" />
        </el-form-item>
        <el-form-item label="是否完成" prop="iscompete">
          <el-radio v-model="form.iscompete" label="1">是</el-radio>
          <el-radio v-model="form.iscompete" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="通用信息" prop="comminfo">
          <el-input v-model="form.comminfo" placeholder="请输入通用信息" />
        </el-form-item>
        <el-form-item label="监视信息" prop="moniterinfo">
          <el-input v-model="form.moniterinfo" placeholder="请输入监视信息" />
        </el-form-item>
        <el-form-item label="监视人" prop="moniterman">
          <el-input v-model="form.moniterman" placeholder="请输入监视人" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
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
import { listCommlog, getCommlog, delCommlog, addCommlog, updateCommlog } from "@/api/crm-mytable/commlog";

export default {
  name: "Commlog",
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
      // 通用日志表格数据
      commlogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sysuser: null,
        userId: null,
        customerid: null,
        commdate: null,
        linkmanid: null,
        project: null,
        productid: null,
        projectphase: null,
        iscompete: null,
        comminfo: null,
        moniterinfo: null,
        moniterman: null,
        userFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        sysuser: [
          { required: true, message: "系统用户不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        commdate: [
          { required: true, message: "通用日期不能为空", trigger: "blur" }
        ],
        linkmanid: [
          { required: true, message: "联系人ID不能为空", trigger: "blur" }
        ],
        project: [
          { required: true, message: "项目不能为空", trigger: "blur" }
        ],
        productid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        projectphase: [
          { required: true, message: "项目短语不能为空", trigger: "blur" }
        ],
        iscompete: [
          { required: true, message: "是否完成不能为空", trigger: "blur" }
        ],
        comminfo: [
          { required: true, message: "通用信息不能为空", trigger: "blur" }
        ],
        moniterinfo: [
          { required: true, message: "监视信息不能为空", trigger: "blur" }
        ],
        moniterman: [
          { required: true, message: "监视人不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询通用日志列表 */
    getList() {
      this.loading = true;
      listCommlog(this.queryParams).then(response => {
        this.commlogList = response.rows;
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
        sysuser: null,
        userId: null,
        customerid: null,
        commdate: null,
        linkmanid: null,
        project: null,
        productid: null,
        projectphase: null,
        iscompete: null,
        comminfo: null,
        moniterinfo: null,
        moniterman: null,
        userFlag: null
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
      this.title = "添加通用日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCommlog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改通用日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCommlog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCommlog(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除通用日志编号为"' + ids + '"的数据项？').then(function() {
        return delCommlog(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/commlog/export', {
        ...this.queryParams
      }, `commlog_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
