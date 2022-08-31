<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="供应商名称" prop="supplyname">
        <el-input
          v-model="queryParams.supplyname"
          placeholder="请输入供应商名称"
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
          v-hasPermi="['crm-basicdata:supplylinkman:add']"
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
          v-hasPermi="['crm-basicdata:supplylinkman:edit']"
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
          v-hasPermi="['crm-basicdata:supplylinkman:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:supplylinkman:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplylinkmanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="供应商名称" align="center" prop="supplyname" />
      <el-table-column label="性别" align="center" prop="gender" />
      <el-table-column label="电话号码" align="center" prop="phone" />
      <el-table-column label="传真号码" align="center" prop="fax" />
      <el-table-column label="电子邮件" align="center" prop="email" />
      <el-table-column label="邮政编码" align="center" prop="postcode" />
      <el-table-column label="业务" align="center" prop="business" />
      <el-table-column label="联系地址" align="center" prop="address" />
      <el-table-column label="供应商编号" align="center" prop="supplycn" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:supplylinkman:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:supplylinkman:remove']"
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

    <!-- 添加或修改供应商联系人对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="供应商名称" prop="supplyname">
          <el-input v-model="form.supplyname" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="备用" prop="beiyong">
          <el-input v-model="form.beiyong" placeholder="请输入备用" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="传真号码" prop="fax">
          <el-input v-model="form.fax" placeholder="请输入传真号码" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model="form.postcode" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input v-model="form.mark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="业务" prop="business">
          <el-input v-model="form.business" placeholder="请输入业务" />
        </el-form-item>
        <el-form-item label="业务说明" prop="businessexpian">
          <el-input v-model="form.businessexpian" placeholder="请输入业务说明" />
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入联系地址" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="供应商编号" prop="supplycn">
          <el-input v-model="form.supplycn" placeholder="请输入供应商编号" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
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
import { listSupplylinkman, getSupplylinkman, delSupplylinkman, addSupplylinkman, updateSupplylinkman } from "@/api/crm-basicdata/supplylinkman";

export default {
  name: "Supplylinkman",
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
      // 供应商联系人表格数据
      supplylinkmanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplyname: null,
        beiyong: null,
        gender: null,
        phone: null,
        fax: null,
        email: null,
        postcode: null,
        mark: null,
        business: null,
        businessexpian: null,
        address: null,
        userFlag: null,
        userId: null,
        supplycn: null,
        supplyid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        supplyname: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ],
        beiyong: [
          { required: true, message: "备用不能为空", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "性别不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        fax: [
          { required: true, message: "传真号码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "电子邮件不能为空", trigger: "blur" }
        ],
        postcode: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
        ],
        mark: [
          { required: true, message: "备汪不能为空", trigger: "blur" }
        ],
        business: [
          { required: true, message: "业务不能为空", trigger: "blur" }
        ],
        businessexpian: [
          { required: true, message: "业务说明不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        supplycn: [
          { required: true, message: "供应商编号不能为空", trigger: "blur" }
        ],
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询供应商联系人列表 */
    getList() {
      this.loading = true;
      listSupplylinkman(this.queryParams).then(response => {
        this.supplylinkmanList = response.rows;
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
        supplyname: null,
        beiyong: null,
        gender: null,
        phone: null,
        fax: null,
        email: null,
        postcode: null,
        mark: null,
        business: null,
        businessexpian: null,
        address: null,
        userFlag: null,
        userId: null,
        supplycn: null,
        supplyid: null
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
      this.title = "添加供应商联系人";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSupplylinkman(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商联系人";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSupplylinkman(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplylinkman(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除供应商联系人编号为"' + ids + '"的数据项？').then(function() {
        return delSupplylinkman(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/supplylinkman/export', {
        ...this.queryParams
      }, `supplylinkman_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
