<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="仓库名称" prop="warehousename">
        <el-input
          v-model="queryParams.warehousename"
          placeholder="请输入仓库名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库管" prop="warehouseman">
        <el-input
          v-model="queryParams.warehouseman"
          placeholder="请输入库管"
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
          v-hasPermi="['crm-political:officeproductcangku:add']"
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
          v-hasPermi="['crm-political:officeproductcangku:edit']"
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
          v-hasPermi="['crm-political:officeproductcangku:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:officeproductcangku:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="officeproductcangkuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="仓库名称" align="center" prop="warehousename" />
      <el-table-column label="库管" align="center" prop="warehouseman" />
      <el-table-column label="电话号码" align="center" prop="telphone" />
      <el-table-column label="仓库地址" align="center" prop="warehouseaddress" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-political:officeproductcangku:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:officeproductcangku:remove']"
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

    <!-- 添加或修改办公用品仓库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="仓库名称" prop="warehousename">
          <el-input v-model="form.warehousename" placeholder="请输入仓库名称" />
        </el-form-item>
        <el-form-item label="库管" prop="warehouseman">
          <el-input v-model="form.warehouseman" placeholder="请输入库管" />
        </el-form-item>
        <el-form-item label="电话号码" prop="telphone">
          <el-input v-model="form.telphone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="仓库地址" prop="warehouseaddress">
          <el-input v-model="form.warehouseaddress" placeholder="请输入仓库地址" />
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
import { listOfficeproductcangku, getOfficeproductcangku, delOfficeproductcangku, addOfficeproductcangku, updateOfficeproductcangku } from "@/api/crm-political/officeproductcangku";

export default {
  name: "Officeproductcangku",
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
      // 办公用品仓库表格数据
      officeproductcangkuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        warehousename: null,
        warehouseman: null,
        telphone: null,
        warehouseaddress: null,
        memo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        warehousename: [
          { required: true, message: "仓库名称不能为空", trigger: "blur" }
        ],
        warehouseman: [
          { required: true, message: "库管不能为空", trigger: "blur" }
        ],
        telphone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        warehouseaddress: [
          { required: true, message: "仓库地址不能为空", trigger: "blur" }
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
    /** 查询办公用品仓库列表 */
    getList() {
      this.loading = true;
      listOfficeproductcangku(this.queryParams).then(response => {
        this.officeproductcangkuList = response.rows;
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
        warehousename: null,
        warehouseman: null,
        telphone: null,
        warehouseaddress: null,
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
      this.title = "添加办公用品仓库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOfficeproductcangku(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改办公用品仓库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOfficeproductcangku(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOfficeproductcangku(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除办公用品仓库编号为"' + ids + '"的数据项？').then(function() {
        return delOfficeproductcangku(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/officeproductcangku/export', {
        ...this.queryParams
      }, `officeproductcangku_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
