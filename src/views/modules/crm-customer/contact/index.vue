<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建人" prop="createman">
        <el-input
          v-model="queryParams.createman"
          placeholder="请输入创建人"
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
          v-hasPermi="['crm-customer:contact:add']"
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
          v-hasPermi="['crm-customer:contact:edit']"
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
          v-hasPermi="['crm-customer:contact:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-customer:contact:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="contactList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="客户ID" align="center" prop="customerid" />
      <el-table-column label="联系人ID" align="center" prop="linkmanid" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="创建人" align="center" prop="createman" />
      <el-table-column label="联系人" align="center" prop="contact" />
      <el-table-column label="机会" align="center" prop="chance" />
      <el-table-column label="阶段" align="center" prop="stage" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-customer:contact:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-customer:contact:remove']"
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

    <!-- 添加或修改联系方式对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="联系人ID" prop="linkmanid">
          <el-input v-model="form.linkmanid" placeholder="请输入联系人ID" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="机会" prop="chance">
          <el-input v-model="form.chance" placeholder="请输入机会" />
        </el-form-item>
        <el-form-item label="阶段" prop="stage">
          <el-input v-model="form.stage" placeholder="请输入阶段" />
        </el-form-item>
        <el-form-item label="描述" prop="describes">
          <el-input v-model="form.describes" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="联系时间" prop="contacttime">
          <el-date-picker clearable
            v-model="form.contacttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择联系时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下次联系时间" prop="nextcontacttime">
          <el-date-picker clearable
            v-model="form.nextcontacttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下次联系时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下次讨论" prop="nextissue">
          <el-input v-model="form.nextissue" placeholder="请输入下次讨论" />
        </el-form-item>
        <el-form-item label="已经联系" prop="alreadycontact">
          <el-input v-model="form.alreadycontact" placeholder="请输入已经联系" />
        </el-form-item>
        <el-form-item label="公共服务" prop="public">
          <el-input v-model="form.public" placeholder="请输入公共服务" />
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input v-model="form.priority" placeholder="请输入优先级" />
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
import { listContact, getContact, delContact, addContact, updateContact } from "@/api/crm-customer/contact";

export default {
  name: "Contact",
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
      // 联系方式表格数据
      contactList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerid: null,
        linkmanid: null,
        userId: null,
        createman: null,
        contact: null,
        chance: null,
        stage: null,
        describes: null,
        createtime: null,
        contacttime: null,
        nextcontacttime: null,
        nextissue: null,
        alreadycontact: null,
        public: null,
        priority: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        linkmanid: [
          { required: true, message: "联系人ID不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        chance: [
          { required: true, message: "机会不能为空", trigger: "blur" }
        ],
        stage: [
          { required: true, message: "阶段不能为空", trigger: "blur" }
        ],
        describes: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        contacttime: [
          { required: true, message: "联系时间不能为空", trigger: "blur" }
        ],
        nextcontacttime: [
          { required: true, message: "下次联系时间不能为空", trigger: "blur" }
        ],
        nextissue: [
          { required: true, message: "下次讨论不能为空", trigger: "blur" }
        ],
        alreadycontact: [
          { required: true, message: "已联系不能为空", trigger: "blur" }
        ],
        public: [
          { required: true, message: "公共服务不能为空", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "优先级不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询联系方式列表 */
    getList() {
      this.loading = true;
      listContact(this.queryParams).then(response => {
        this.contactList = response.rows;
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
        customerid: null,
        linkmanid: null,
        userId: null,
        createman: null,
        contact: null,
        chance: null,
        stage: null,
        describes: null,
        createtime: null,
        contacttime: null,
        nextcontacttime: null,
        nextissue: null,
        alreadycontact: null,
        public: null,
        priority: null
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
      this.title = "添加联系方式";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getContact(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改联系方式";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateContact(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addContact(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除联系方式编号为"' + ids + '"的数据项？').then(function() {
        return delContact(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-customer/contact/export', {
        ...this.queryParams
      }, `contact_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
