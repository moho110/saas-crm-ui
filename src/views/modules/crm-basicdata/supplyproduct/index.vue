<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="产品价格" prop="productprice">
        <el-input
          v-model="queryParams.productprice"
          placeholder="请输入产品价格"
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
          v-hasPermi="['crm-basicdata:supplyproduct:add']"
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
          v-hasPermi="['crm-basicdata:supplyproduct:edit']"
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
          v-hasPermi="['crm-basicdata:supplyproduct:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:supplyproduct:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplyproductList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="供应商ID" align="center" prop="supplyid" />
      <el-table-column label="产品ID" align="center" prop="productid" />
      <el-table-column label="产品价格" align="center" prop="productprice" />
      <el-table-column label="产品日期" align="center" prop="pricedate" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:supplyproduct:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:supplyproduct:remove']"
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

    <!-- 添加或修改供应商产品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="产品ID" prop="productid">
          <el-input v-model="form.productid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="产品价格" prop="productprice">
          <el-input v-model="form.productprice" placeholder="请输入产品价格" />
        </el-form-item>
        <el-form-item label="价格日期" prop="pricedate">
          <el-input v-model="form.pricedate" placeholder="请输入价格日期" />
        </el-form-item>
        <el-form-item label="说明" prop="explianstr">
          <el-input v-model="form.explianstr" placeholder="请输入说明" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="cycle" prop="cycle">
          <el-input v-model="form.cycle" placeholder="请输入cycle" />
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入附件" />
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
import { listSupplyproduct, getSupplyproduct, delSupplyproduct, addSupplyproduct, updateSupplyproduct } from "@/api/crm-basicdata/supplyproduct";

export default {
  name: "Supplyproduct",
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
      // 供应商产品表格数据
      supplyproductList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        supplyid: null,
        productid: null,
        productprice: null,
        pricedate: null,
        explianstr: null,
        userFlag: null,
        cycle: null,
        fujian: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        productid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        productprice: [
          { required: true, message: "产品价格不能为空", trigger: "blur" }
        ],
        pricedate: [
          { required: true, message: "价格日期不能为空", trigger: "blur" }
        ],
        explianstr: [
          { required: true, message: "说明不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        cycle: [
          { required: true, message: "cycle不能为空", trigger: "blur" }
        ],
        fujian: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询供应商产品列表 */
    getList() {
      this.loading = true;
      listSupplyproduct(this.queryParams).then(response => {
        this.supplyproductList = response.rows;
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
        userId: null,
        supplyid: null,
        productid: null,
        productprice: null,
        pricedate: null,
        explianstr: null,
        userFlag: null,
        cycle: null,
        fujian: null
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
      this.title = "添加供应商产品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSupplyproduct(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商产品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSupplyproduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupplyproduct(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除供应商产品编号为"' + ids + '"的数据项？').then(function() {
        return delSupplyproduct(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/supplyproduct/export', {
        ...this.queryParams
      }, `supplyproduct_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
