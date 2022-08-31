<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="表名" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入表名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="全名" prop="fullName">
        <el-input
          v-model="queryParams.fullName"
          placeholder="请输入全名"
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
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="queryParams.path"
          placeholder="请输入路径"
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
          v-hasPermi="['crm-mytable:comment:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="commentList"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="父级ID" prop="parentId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="喜欢数量" align="center" prop="likeCount" />
      <el-table-column label="不喜欢数量" align="center" prop="dislikeCount" />
      <el-table-column label="删除时间" align="center" prop="deleteTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deleteTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="表名" align="center" prop="tableName" />
      <el-table-column label="全名" align="center" prop="fullName" />
      <el-table-column label="URL地址" align="center" prop="url" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:comment:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['crm-mytable:comment:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:comment:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改评论表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="父级ID" prop="parentId">
          <treeselect v-model="form.parentId" :options="commentOptions" :normalizer="normalizer" placeholder="请选择${comment}" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="发给用户" prop="toUserId">
          <el-input v-model="form.toUserId" placeholder="请输入发给用户" />
        </el-form-item>
        <el-form-item label="对象ID" prop="objectId">
          <el-input v-model="form.objectId" placeholder="请输入对象ID" />
        </el-form-item>
        <el-form-item label="喜欢数量" prop="likeCount">
          <el-input v-model="form.likeCount" placeholder="请输入喜欢数量" />
        </el-form-item>
        <el-form-item label="不喜欢数量" prop="dislikeCount">
          <el-input v-model="form.dislikeCount" placeholder="请输入不喜欢数量" />
        </el-form-item>
        <el-form-item label="楼层" prop="floor">
          <el-input v-model="form.floor" placeholder="请输入楼层" />
        </el-form-item>
        <el-form-item label="删除时间" prop="deleteTime">
          <el-date-picker clearable
            v-model="form.deleteTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择删除时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="form.status" label="1">特殊</el-radio>
          <el-radio v-model="form.status" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="type" prop="type">
          <el-radio v-model="form.type" label="1">特殊</el-radio>
          <el-radio v-model="form.type" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="表名" prop="tableName">
          <el-input v-model="form.tableName" placeholder="请输入表名" />
        </el-form-item>
        <el-form-item label="全名" prop="fullName">
          <el-input v-model="form.fullName" placeholder="请输入全名" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入路径" />
        </el-form-item>
        <el-form-item label="URL地址" prop="url">
          <el-input v-model="form.url" type="textarea" placeholder="请输入URL地址" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="更多" prop="more">
          <el-input v-model="form.more" type="textarea" placeholder="请输入更多" />
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
import { listComment, getComment, delComment, addComment, updateComment } from "@/api/crm-mytable/comment";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Comment",
  components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 评论表表格数据
      commentList: [],
      // 评论表树选项
      commentOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        parentId: null,
        userId: null,
        toUserId: null,
        objectId: null,
        likeCount: null,
        dislikeCount: null,
        floor: null,
        deleteTime: null,
        status: null,
        type: null,
        tableName: null,
        fullName: null,
        email: null,
        path: null,
        url: null,
        content: null,
        more: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: "父级ID不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        toUserId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        objectId: [
          { required: true, message: "对象ID不能为空", trigger: "blur" }
        ],
        likeCount: [
          { required: true, message: "喜欢数量不能为空", trigger: "blur" }
        ],
        dislikeCount: [
          { required: true, message: "不喜欢数量不能为空", trigger: "blur" }
        ],
        floor: [
          { required: true, message: "楼层不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        deleteTime: [
          { required: true, message: "删除时间不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        tableName: [
          { required: true, message: "表名不能为空", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "全名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "电子邮件不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "路径不能为空", trigger: "blur" }
        ],
        url: [
          { required: true, message: "URL地址不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        more: [
          { required: true, message: "更多不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询评论表列表 */
    getList() {
      this.loading = true;
      listComment(this.queryParams).then(response => {
        this.commentList = this.handleTree(response.data, "id", "parentId");
        this.loading = false;
      });
    },
    /** 转换评论表数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.tableName,
        children: node.children
      };
    },
	/** 查询评论表下拉树结构 */
    getTreeselect() {
      listComment().then(response => {
        this.commentOptions = [];
        const data = { id: 0, tableName: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "id", "parentId");
        this.commentOptions.push(data);
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
        parentId: null,
        userId: null,
        toUserId: null,
        objectId: null,
        likeCount: null,
        dislikeCount: null,
        floor: null,
        createTime: null,
        deleteTime: null,
        status: 0,

        type: null,
        tableName: null,
        fullName: null,
        email: null,
        path: null,
        url: null,
        content: null,
        more: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.id) {
        this.form.parentId = row.id;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加评论表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentId = row.id;
      }
      getComment(row.id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改评论表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateComment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addComment(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除评论表编号为"' + row.id + '"的数据项？').then(function() {
        return delComment(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
