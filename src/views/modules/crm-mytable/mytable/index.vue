<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="模块名称" prop="modulename">
        <el-input
          v-model="queryParams.modulename"
          placeholder="请输入模块名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模块位置" prop="moduleposition">
        <el-input
          v-model="queryParams.moduleposition"
          placeholder="请输入模块位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模块属性" prop="moduleattr">
        <el-input
          v-model="queryParams.moduleattr"
          placeholder="请输入模块属性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="显示行数" prop="displaylinenumber">
        <el-input
          v-model="queryParams.displaylinenumber"
          placeholder="请输入显示行数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="滚动显示" prop="scrolldisplay">
        <el-input
          v-model="queryParams.scrolldisplay"
          placeholder="请输入滚动显示"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="queryParams.creator"
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
          v-hasPermi="['crm-mytable:mytable:add']"
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
          v-hasPermi="['crm-mytable:mytable:edit']"
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
          v-hasPermi="['crm-mytable:mytable:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:mytable:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mytableList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="模块编号" align="center" prop="moduleid" />
      <el-table-column label="模块名称" align="center" prop="modulename" />
      <el-table-column label="模块位置" align="center" prop="moduleposition" />
      <el-table-column label="模块属性" align="center" prop="moduleattr" />
      <el-table-column label="显示行数" align="center" prop="displaylinenumber" />
      <el-table-column label="滚动显示" align="center" prop="scrolldisplay" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="创建时间" align="center" prop="createtime" />
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:mytable:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:mytable:remove']"
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

    <!-- 添加或修改桌面模块表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="模块编号" prop="moduleid">
          <el-input v-model="form.moduleid" placeholder="请输入模块编号" />
        </el-form-item>
        <el-form-item label="模块名称" prop="modulename">
          <el-input v-model="form.modulename" placeholder="请输入模块名称" />
        </el-form-item>
        <el-form-item label="模块位置" prop="moduleposition">
          <el-input v-model="form.moduleposition" placeholder="请输入模块位置" />
        </el-form-item>
        <el-form-item label="模块属性" prop="moduleattr">
          <el-input v-model="form.moduleattr" placeholder="请输入模块属性" />
        </el-form-item>
        <el-form-item label="显示行数" prop="displaylinenumber">
          <el-input v-model="form.displaylinenumber" placeholder="请输入显示行数" />
        </el-form-item>
        <el-form-item label="滚动显示" prop="scrolldisplay">
          <el-input v-model="form.scrolldisplay" placeholder="请输入滚动显示" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
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
import { listMytable, getMytable, delMytable, addMytable, updateMytable } from "@/api/crm-mytable/mytable";

export default {
  name: "Mytable",
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
      // 桌面模块表表格数据
      mytableList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        moduleid: null,
        modulename: null,
        moduleposition: null,
        moduleattr: null,
        displaylinenumber: null,
        scrolldisplay: null,
        creator: null,
        createtime: null,
        memo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        moduleid: [
          { required: true, message: "模块编号不能为空", trigger: "blur" }
        ],
        modulename: [
          { required: true, message: "模块名称不能为空", trigger: "blur" }
        ],
        moduleposition: [
          { required: true, message: "模块位置不能为空", trigger: "blur" }
        ],
        moduleattr: [
          { required: true, message: "模块属性不能为空", trigger: "blur" }
        ],
        displaylinenumber: [
          { required: true, message: "显示行数不能为空", trigger: "blur" }
        ],
        scrolldisplay: [
          { required: true, message: "滚动显示不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询桌面模块表列表 */
    getList() {
      this.loading = true;
      listMytable(this.queryParams).then(response => {
        this.mytableList = response.rows;
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
        moduleid: null,
        modulename: null,
        moduleposition: null,
        moduleattr: null,
        displaylinenumber: null,
        scrolldisplay: null,
        creator: null,
        createtime: null,
        memo: null
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
      this.title = "添加桌面模块表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMytable(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改桌面模块表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMytable(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMytable(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除桌面模块表编号为"' + ids + '"的数据项？').then(function() {
        return delMytable(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/mytable/export', {
        ...this.queryParams
      }, `mytable_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
