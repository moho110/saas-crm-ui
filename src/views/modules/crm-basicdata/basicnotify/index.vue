<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
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
          v-hasPermi="['crm-basicdata:basicnotify:add']"
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
          v-hasPermi="['crm-basicdata:basicnotify:edit']"
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
          v-hasPermi="['crm-basicdata:basicnotify:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:basicnotify:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="basicnotifyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="发送给用户" align="center" prop="toUser" />
      <el-table-column label="附件" align="center" prop="attachment" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:basicnotify:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:basicnotify:remove']"
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

    <!-- 添加或修改公告通知对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="发送给用户" prop="toUser">
          <el-input v-model="form.toUser" placeholder="请输入发送给用户" />
        </el-form-item>
        <el-form-item label="来自用户" prop="fromUser">
          <el-date-picker clearable
            v-model="form.fromUser"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择来自用户">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件" prop="attachment">
          <el-input v-model="form.attachment" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="是否读取" prop="ifread">
          <el-radio v-model="form.ifread" label="1">是</el-radio>
          <el-radio v-model="form.ifread" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否发送短信" prop="ifsms">
          <el-radio v-model="form.ifsms" label="1">是</el-radio>
          <el-radio v-model="form.ifsms" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-date-picker clearable
            v-model="form.grade"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择等级">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否发送邮件" prop="ifemail">
          <el-radio v-model="form.ifemail" label="1">是</el-radio>
          <el-radio v-model="form.ifemail" label="0">否</el-radio>
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
import { listBasicnotify, getBasicnotify, delBasicnotify, addBasicnotify, updateBasicnotify } from "@/api/crm-basicdata/basicnotify";

export default {
  name: "Basicnotify",
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
      // 公告通知表格数据
      basicnotifyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        content: null,
        toUser: null,
        fromUser: null,
        attachment: null,
        createtime: null,
        ifread: null,
        ifsms: null,
        grade: null,
        ifemail: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        toUser: [
          { required: true, message: "发送给用户不能为空", trigger: "blur" }
        ],
        fromUser: [
          { required: true, message: "来自用户不能为空", trigger: "blur" }
        ],
        attachment: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        ifread: [
          { required: true, message: "是否读取不能为空", trigger: "blur" }
        ],
        ifsms: [
          { required: true, message: "是否发送短信不能为空", trigger: "blur" }
        ],
        grade: [
          { required: true, message: "等级不能为空", trigger: "blur" }
        ],
        ifemail: [
          { required: true, message: "是否发送邮件不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询公告通知列表 */
    getList() {
      this.loading = true;
      listBasicnotify(this.queryParams).then(response => {
        this.basicnotifyList = response.rows;
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
        title: null,
        content: null,
        toUser: null,
        fromUser: null,
        attachment: null,
        createtime: null,
        ifread: null,
        ifsms: null,
        grade: null,
        ifemail: null
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
      this.title = "添加公告通知";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBasicnotify(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公告通知";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBasicnotify(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBasicnotify(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除公告通知编号为"' + ids + '"的数据项？').then(function() {
        return delBasicnotify(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/basicnotify/export', {
        ...this.queryParams
      }, `basicnotify_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
