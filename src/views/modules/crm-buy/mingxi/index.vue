<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="产品名称" prop="prodname">
        <el-input
          v-model="queryParams.prodname"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入价格"
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
          v-hasPermi="['crm-buy:mingxi:add']"
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
          v-hasPermi="['crm-buy:mingxi:edit']"
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
          v-hasPermi="['crm-buy:mingxi:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-buy:mingxi:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mingxiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="过往产品ID" align="center" prop="oldproductid" />
      <el-table-column label="产品ID" align="center" prop="prodid" />
      <el-table-column label="最终价格" align="center" prop="lastprice" />
      <el-table-column label="产品名称" align="center" prop="prodname" />
      <el-table-column label="产品数据" align="center" prop="num" />
      <el-table-column label="产品价格" align="center" prop="price" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-buy:mingxi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-buy:mingxi:remove']"
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

    <!-- 添加或修改采购单名细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="过往产品ID" prop="oldproductid">
          <el-input v-model="form.oldproductid" placeholder="请输入过往产品ID" />
        </el-form-item>
        <el-form-item label="产品ID" prop="prodid">
          <el-input v-model="form.prodid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="最终价格" prop="lastprice">
          <el-input v-model="form.lastprice" placeholder="请输入最终价格" />
        </el-form-item>
        <el-form-item label="产品名称" prop="prodname">
          <el-input v-model="form.prodname" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品价格" prop="num">
          <el-input v-model="form.num" placeholder="请输入产品价格" />
        </el-form-item>
        <el-form-item label="产品价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入产品价格" />
        </el-form-item>
        <el-form-item label="金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="主表ID" prop="mainrowid">
          <el-input v-model="form.mainrowid" placeholder="请输入主表ID" />
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
import { listMingxi, getMingxi, delMingxi, addMingxi, updateMingxi } from "@/api/crm-buy/mingxi";

export default {
  name: "Mingxi",
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
      // 采购单名细表格数据
      mingxiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        oldproductid: null,
        prodid: null,
        lastprice: null,
        prodname: null,
        num: null,
        price: null,
        jine: null,
        beizhu: null,
        mainrowid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        oldproductid: [
          { required: true, message: "过往产品ID不能为空", trigger: "blur" }
        ],
        prodid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        lastprice: [
          { required: true, message: "最终价格不能为空", trigger: "blur" }
        ],
        prodname: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        num: [
          { required: true, message: "产品数据不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "产品价格不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        mainrowid: [
          { required: true, message: "主表ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询采购单名细列表 */
    getList() {
      this.loading = true;
      listMingxi(this.queryParams).then(response => {
        this.mingxiList = response.rows;
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
        oldproductid: null,
        prodid: null,
        lastprice: null,
        prodname: null,
        num: null,
        price: null,
        jine: null,
        beizhu: null,
        mainrowid: null
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
      this.title = "添加采购单名细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMingxi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采购单名细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMingxi(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMingxi(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除采购单名细编号为"' + ids + '"的数据项？').then(function() {
        return delMingxi(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-buy/mingxi/export', {
        ...this.queryParams
      }, `mingxi_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
