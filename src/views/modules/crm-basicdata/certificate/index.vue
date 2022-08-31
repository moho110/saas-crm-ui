<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="认证编号" prop="certificateno">
        <el-input
          v-model="queryParams.certificateno"
          placeholder="请输入认证编号"
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
          v-hasPermi="['crm-basicdata:certificate:add']"
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
          v-hasPermi="['crm-basicdata:certificate:edit']"
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
          v-hasPermi="['crm-basicdata:certificate:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:certificate:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="certificateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="$ID" align="center" prop="id" />
      <el-table-column label="认证类型" align="center" prop="certificatetype" />
      <el-table-column label="认证编号" align="center" prop="certificateno" />
      <el-table-column label="开始时间" align="center" prop="fromdate" />
      <el-table-column label="结束时间" align="center" prop="enddate" />
      <el-table-column label="文件地址" align="center" prop="fileaddress" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:certificate:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:certificate:remove']"
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

    <!-- 添加或修改认证对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="认证编号" prop="certificateno">
          <el-input v-model="form.certificateno" placeholder="请输入认证编号" />
        </el-form-item>
        <el-form-item label="认证信息" prop="certificateinfo">
          <el-input v-model="form.certificateinfo" placeholder="请输入认证信息" />
        </el-form-item>
        <el-form-item label="开始时间" prop="fromdate">
          <el-input v-model="form.fromdate" placeholder="请输入开始时间" />
        </el-form-item>
        <el-form-item label="结束时间" prop="enddate">
          <el-input v-model="form.enddate" placeholder="请输入结束时间" />
        </el-form-item>
        <el-form-item label="说明" prop="explianstr">
          <el-input v-model="form.explianstr" placeholder="请输入说明" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="文件地址" prop="fileaddress">
          <el-input v-model="form.fileaddress" placeholder="请输入文件地址" />
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
import { listCertificate, getCertificate, delCertificate, addCertificate, updateCertificate } from "@/api/crm-basicdata/certificate";

export default {
  name: "Certificate",
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
      // 认证表格数据
      certificateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        supplyid: null,
        certificatetype: null,
        certificateno: null,
        certificateinfo: null,
        fromdate: null,
        enddate: null,
        explianstr: null,
        userFlag: null,
        fileaddress: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        certificatetype: [
          { required: true, message: "认证类型不能为空", trigger: "change" }
        ],
        certificateno: [
          { required: true, message: "认证编号不能为空", trigger: "blur" }
        ],
        certificateinfo: [
          { required: true, message: "认证信息不能为空", trigger: "blur" }
        ],
        fromdate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        enddate: [
          { required: true, message: "结束日期不能为空", trigger: "blur" }
        ],
        explianstr: [
          { required: true, message: "说明不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        fileaddress: [
          { required: true, message: "文件地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询认证列表 */
    getList() {
      this.loading = true;
      listCertificate(this.queryParams).then(response => {
        this.certificateList = response.rows;
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
        supplyid: null,
        certificatetype: null,
        certificateno: null,
        certificateinfo: null,
        fromdate: null,
        enddate: null,
        explianstr: null,
        userFlag: null,
        fileaddress: null
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
      this.title = "添加认证";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCertificate(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改认证";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCertificate(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCertificate(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除认证编号为"' + ids + '"的数据项？').then(function() {
        return delCertificate(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/certificate/export', {
        ...this.queryParams
      }, `certificate_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
