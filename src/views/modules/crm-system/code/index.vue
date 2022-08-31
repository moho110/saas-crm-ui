<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代码编号" prop="codeNo">
        <el-input
          v-model="queryParams.codeNo"
          placeholder="请输入代码编号"
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
          v-hasPermi="['crm-system:code:add']"
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
          v-hasPermi="['crm-system:code:edit']"
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
          v-hasPermi="['crm-system:code:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-system:code:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="codeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="代码编号" align="center" prop="codeNo" />
      <el-table-column label="代码名称" align="center" prop="codeName" />
      <el-table-column label="代码顺序" align="center" prop="codeOrder" />
      <el-table-column label="父级编码" align="center" prop="parentNo" />
      <el-table-column label="代码标识" align="center" prop="codeFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-system:code:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-system:code:remove']"
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

    <!-- 添加或修改系统代码对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="代码编号" prop="codeNo">
          <el-input v-model="form.codeNo" placeholder="请输入代码编号" />
        </el-form-item>
        <el-form-item label="代码名称" prop="codeName">
          <el-input v-model="form.codeName" type="textarea" placeholder="请输入代码名称" />
        </el-form-item>
        <el-form-item label="代码顺序" prop="codeOrder">
          <el-input v-model="form.codeOrder" placeholder="请输入代码顺序" />
        </el-form-item>
        <el-form-item label="父级编号" prop="parentNo">
          <el-input v-model="form.parentNo" placeholder="请输入父级编号" />
        </el-form-item>
        <el-form-item label="代码标识" prop="codeFlag">
          <el-radio v-model="form.codeFlag" label="1">保留</el-radio>
          <el-radio v-model="form.codeFlag" label="0">删除</el-radio>
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
import { listCode, getCode, delCode, addCode, updateCode } from "@/api/crm-system/code";

export default {
  name: "Code",
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
      // 系统代码表格数据
      codeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        codeNo: null,
        codeName: null,
        codeOrder: null,
        parentNo: null,
        codeFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        codeNo: [
          { required: true, message: "代码编号不能为空", trigger: "blur" }
        ],
        codeName: [
          { required: true, message: "代码名称不能为空", trigger: "blur" }
        ],
        codeOrder: [
          { required: true, message: "代码顺序不能为空", trigger: "blur" }
        ],
        parentNo: [
          { required: true, message: "父级编号不能为空", trigger: "blur" }
        ],
        codeFlag: [
          { required: true, message: "代码标识不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询系统代码列表 */
    getList() {
      this.loading = true;
      listCode(this.queryParams).then(response => {
        this.codeList = response.rows;
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
        codeNo: null,
        codeName: null,
        codeOrder: null,
        parentNo: null,
        codeFlag: null
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
      this.title = "添加系统代码";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCode(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改系统代码";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCode(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCode(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除系统代码编号为"' + ids + '"的数据项？').then(function() {
        return delCode(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-system/code/export', {
        ...this.queryParams
      }, `code_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
