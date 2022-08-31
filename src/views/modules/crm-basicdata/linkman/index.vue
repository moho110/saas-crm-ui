<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型名称" prop="linkmanname">
        <el-input
          v-model="queryParams.linkmanname"
          placeholder="请输入类型名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="传真号码" prop="fax">
        <el-input
          v-model="queryParams.fax"
          placeholder="请输入传真号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电子邮件" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入电子邮件"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商编号" prop="supplycn">
        <el-input
          v-model="queryParams.supplycn"
          placeholder="请输入供应商编号"
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
          v-hasPermi="['crm-basicdata:linkman:add']"
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
          v-hasPermi="['crm-basicdata:linkman:edit']"
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
          v-hasPermi="['crm-basicdata:linkman:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:linkman:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="linkmanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="联系人名称" align="center" prop="linkmanname" />
      <el-table-column label="性别" align="center" prop="gender" />
      <el-table-column label="电话号码" align="center" prop="phone" />
      <el-table-column label="传真号码" align="center" prop="fax" />
      <el-table-column label="电子邮件" align="center" prop="email" />
      <el-table-column label="邮政编码" align="center" prop="postcode" />
      <el-table-column label="地址" align="center" prop="address" />
      <el-table-column label="用户标识" align="center" prop="userFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:linkman:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:linkman:remove']"
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

    <!-- 添加或修改联系人对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="联系名称" prop="linkmanname">
          <el-input v-model="form.linkmanname" placeholder="请输入联系名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkmanpy">
          <el-input v-model="form.linkmanpy" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="form.gender" label="1">是</el-radio>
          <el-radio v-model="form.gender" label="0">否</el-radio>
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
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">是</el-radio>
          <el-radio v-model="form.userFlag" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="供应商编号" prop="supplycn">
          <el-input v-model="form.supplycn" placeholder="请输入供应商编号" />
        </el-form-item>
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="移动电话" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入移动电话" />
        </el-form-item>
        <el-form-item label="出生年月日" prop="birthday">
          <el-input v-model="form.birthday" placeholder="请输入出生年月日" />
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
import { listLinkman, getLinkman, delLinkman, addLinkman, updateLinkman } from "@/api/crm-basicdata/linkman";

export default {
  name: "Linkman",
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
      // 联系人表格数据
      linkmanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        linkmanname: null,
        linkmanpy: null,
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
        customerid: null,
        mobile: null,
        birthday: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        linkmanname: [
          { required: true, message: "联系人名称不能为空", trigger: "blur" }
        ],
        linkmanpy: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
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
          { required: true, message: "备注不能为空", trigger: "blur" }
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
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "移动电话不能为空", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "出生年月日不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询联系人列表 */
    getList() {
      this.loading = true;
      listLinkman(this.queryParams).then(response => {
        this.linkmanList = response.rows;
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
        linkmanname: null,
        linkmanpy: null,
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
        customerid: null,
        mobile: null,
        birthday: null
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
      this.title = "添加联系人";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLinkman(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改联系人";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLinkman(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLinkman(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除联系人编号为"' + ids + '"的数据项？').then(function() {
        return delLinkman(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/linkman/export', {
        ...this.queryParams
      }, `linkman_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
