<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="产品名称" prop="productname">
        <el-input
          v-model="queryParams.productname"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品编号" prop="productcn">
        <el-input
          v-model="queryParams.productcn"
          placeholder="请输入产品编号"
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
          v-hasPermi="['crm-basicdata:product:add']"
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
          v-hasPermi="['crm-basicdata:product:edit']"
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
          v-hasPermi="['crm-basicdata:product:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:product:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="productList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="产品名称" align="center" prop="productname" />
      <el-table-column label="产品类型" align="center" prop="producttype" />
      <el-table-column label="最小库存" align="center" prop="storemin" />
      <el-table-column label="最大库存" align="center" prop="storemax" />
      <el-table-column label="用户桔识" align="center" prop="userFlag" />
      <el-table-column label="销售价格" align="center" prop="sellprice" />
      <el-table-column label="产品编号" align="center" prop="productcn" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:product:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:product:remove']"
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

    <!-- 添加或修改产品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="产品名称" prop="productname">
          <el-input v-model="form.productname" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="测量ID" prop="measureid">
          <el-input v-model="form.measureid" placeholder="请输入测量ID" />
        </el-form-item>
        <el-form-item label="模式" prop="mode">
          <el-input v-model="form.mode" type="textarea" placeholder="请输入模式" />
        </el-form-item>
        <el-form-item label="标准" prop="standard">
          <el-input v-model="form.standard" type="textarea" placeholder="请输入标准" />
        </el-form-item>
        <el-form-item label="最小库存" prop="storemin">
          <el-input v-model="form.storemin" placeholder="请输入最小库存" />
        </el-form-item>
        <el-form-item label="最大库存" prop="storemax">
          <el-input v-model="form.storemax" placeholder="请输入最大库存" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="销售价格" prop="sellprice">
          <el-input v-model="form.sellprice" placeholder="请输入销售价格" />
        </el-form-item>
        <el-form-item label="产品编号" prop="productcn">
          <el-input v-model="form.productcn" placeholder="请输入产品编号" />
        </el-form-item>
        <el-form-item label="销售价格2" prop="sellprice2">
          <el-input v-model="form.sellprice2" placeholder="请输入销售价格2" />
        </el-form-item>
        <el-form-item label="销售价格3" prop="sellprice3">
          <el-input v-model="form.sellprice3" placeholder="请输入销售价格3" />
        </el-form-item>
        <el-form-item label="文件地址" prop="fileaddress">
          <el-input v-model="form.fileaddress" placeholder="请输入文件地址" />
        </el-form-item>
        <el-form-item label="过往产品ID" prop="oldproductid">
          <el-input v-model="form.oldproductid" placeholder="请输入过往产品ID" />
        </el-form-item>
        <el-form-item label="是否库存" prop="ifkucun">
          <el-radio v-model="form.ifkucun" label="1">是</el-radio>
          <el-radio v-model="form.ifkucun" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="相关文件" prop="relatefiles">
          <el-input v-model="form.relatefiles" placeholder="请输入相关文件" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="是否有颜色" prop="hascolor">
          <el-radio v-model="form.hascolor" label="1">是</el-radio>
          <el-radio v-model="form.hascolor" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="销售价格4" prop="sellprice4">
          <el-input v-model="form.sellprice4" placeholder="请输入销售价格4" />
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
import { listProduct, getProduct, delProduct, addProduct, updateProduct } from "@/api/crm-basicdata/product";

export default {
  name: "Product",
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
      // 产品表格数据
      productList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productname: null,
        measureid: null,
        mode: null,
        standard: null,
        producttype: null,
        storemin: null,
        storemax: null,
        userFlag: null,
        sellprice: null,
        productcn: null,
        sellprice2: null,
        sellprice3: null,
        fileaddress: null,
        oldproductid: null,
        ifkucun: null,
        relatefiles: null,
        supplyid: null,
        hascolor: null,
        sellprice4: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        productname: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        measureid: [
          { required: true, message: "测量ID不能为空", trigger: "blur" }
        ],
        mode: [
          { required: true, message: "模式不能为空", trigger: "blur" }
        ],
        standard: [
          { required: true, message: "标准不能为空", trigger: "blur" }
        ],
        producttype: [
          { required: true, message: "产品类型不能为空", trigger: "change" }
        ],
        storemin: [
          { required: true, message: "最小库存不能为空", trigger: "blur" }
        ],
        storemax: [
          { required: true, message: "最大库存不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        sellprice: [
          { required: true, message: "销售价格不能为空", trigger: "blur" }
        ],
        productcn: [
          { required: true, message: "产品编号不能为空", trigger: "blur" }
        ],
        sellprice2: [
          { required: true, message: "销售价格2不能为空", trigger: "blur" }
        ],
        sellprice3: [
          { required: true, message: "销售价格3不能为空", trigger: "blur" }
        ],
        fileaddress: [
          { required: true, message: "文件地址不能为空", trigger: "blur" }
        ],
        oldproductid: [
          { required: true, message: "过往产品ID不能为空", trigger: "blur" }
        ],
        ifkucun: [
          { required: true, message: "是否库存不能为空", trigger: "blur" }
        ],
        relatefiles: [
          { required: true, message: "相关文件不能为空", trigger: "blur" }
        ],
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        hascolor: [
          { required: true, message: "是否有颜色不能为空", trigger: "blur" }
        ],
        sellprice4: [
          { required: true, message: "销售价格不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询产品列表 */
    getList() {
      this.loading = true;
      listProduct(this.queryParams).then(response => {
        this.productList = response.rows;
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
        productname: null,
        measureid: null,
        mode: null,
        standard: null,
        producttype: null,
        storemin: null,
        storemax: null,
        userFlag: null,
        sellprice: null,
        productcn: null,
        sellprice2: null,
        sellprice3: null,
        fileaddress: null,
        oldproductid: null,
        ifkucun: null,
        relatefiles: null,
        supplyid: null,
        hascolor: null,
        sellprice4: null
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
      this.title = "添加产品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getProduct(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateProduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProduct(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除产品编号为"' + ids + '"的数据项？').then(function() {
        return delProduct(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/product/export', {
        ...this.queryParams
      }, `product_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
