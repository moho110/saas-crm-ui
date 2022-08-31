<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="办公用品名称" prop="officename">
        <el-input
          v-model="queryParams.officename"
          placeholder="请输入办公用品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办公用品编号" prop="officeno">
        <el-input
          v-model="queryParams.officeno"
          placeholder="请输入办公用品编号"
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
          v-hasPermi="['crm-political:officeproduct:add']"
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
          v-hasPermi="['crm-political:officeproduct:edit']"
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
          v-hasPermi="['crm-political:officeproduct:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:officeproduct:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="officeproductList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="办公用品名称" align="center" prop="officename" />
      <el-table-column label="办公用品编号" align="center" prop="officeno" />
      <el-table-column label="办公用品类型" align="center" prop="officetype" />
      <el-table-column label="规格尺寸" align="center" prop="specsize" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="价格" align="center" prop="price" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="创建人" align="center" prop="creator" />
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
            v-hasPermi="['crm-political:officeproduct:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:officeproduct:remove']"
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

    <!-- 添加或修改办公用品列表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="办公用品名称" prop="officename">
          <el-input v-model="form.officename" placeholder="请输入办公用品名称" />
        </el-form-item>
        <el-form-item label="办公用品编号" prop="officeno">
          <el-input v-model="form.officeno" placeholder="请输入办公用品编号" />
        </el-form-item>
        <el-form-item label="办公用品类型" prop="officeType">
          <el-radio v-model="form.officeType" label="1">特殊</el-radio>
          <el-radio v-model="form.officeType" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="规格尺寸" prop="specsize">
          <el-input v-model="form.specsize" placeholder="请输入规格尺寸" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="仓库信息" prop="warehouseinfo">
          <el-input v-model="form.warehouseinfo" placeholder="请输入仓库信息" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalcount">
          <el-input v-model="form.totalcount" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入品牌" />
        </el-form-item>
        <el-form-item label="存放位置" prop="savedplace">
          <el-input v-model="form.savedplace" placeholder="请输入存放位置" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createtime">
          <el-date-picker clearable
            v-model="form.createtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
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
import { listOfficeproduct, getOfficeproduct, delOfficeproduct, addOfficeproduct, updateOfficeproduct } from "@/api/crm-political/officeproduct";

export default {
  name: "Officeproduct",
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
      // 办公用品列表表格数据
      officeproductList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        officename: null,
        officeno: null,
        officetype: null,
        specsize: null,
        unit: null,
        quantity: null,
        warehouseinfo: null,
        price: null,
        totalcount: null,
        brand: null,
        savedplace: null,
        memo: null,
        creator: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        officename: [
          { required: true, message: "办公用品名称不能为空", trigger: "blur" }
        ],
        officeno: [
          { required: true, message: "办公用品编号不能为空", trigger: "blur" }
        ],
        officetype: [
          { required: true, message: "办公用品类型不能为空", trigger: "change" }
        ],
        specsize: [
          { required: true, message: "规格尺寸不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
        warehouseinfo: [
          { required: true, message: "仓库信息不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
        ],
        totalcount: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        brand: [
          { required: true, message: "品牌不能为空", trigger: "blur" }
        ],
        savedplace: [
          { required: true, message: "存放位置不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询办公用品列表列表 */
    getList() {
      this.loading = true;
      listOfficeproduct(this.queryParams).then(response => {
        this.officeproductList = response.rows;
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
        officename: null,
        officeno: null,
        officetype: null,
        specsize: null,
        unit: null,
        quantity: null,
        warehouseinfo: null,
        price: null,
        totalcount: null,
        brand: null,
        savedplace: null,
        memo: null,
        creator: null,
        createtime: null
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
      this.title = "添加办公用品列表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOfficeproduct(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改办公用品列表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOfficeproduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOfficeproduct(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除办公用品列表编号为"' + ids + '"的数据项？').then(function() {
        return delOfficeproduct(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/officeproduct/export', {
        ...this.queryParams
      }, `officeproduct_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
