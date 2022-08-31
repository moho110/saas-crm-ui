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
      <el-form-item label="产品规格" prop="prodguige">
        <el-input
          v-model="queryParams.prodguige"
          placeholder="请输入产品规格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品型号" prop="prodxinghao">
        <el-input
          v-model="queryParams.prodxinghao"
          placeholder="请输入产品型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="proddanwei">
        <el-input
          v-model="queryParams.proddanwei"
          placeholder="请输入单位"
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
          v-hasPermi="['crm-sales:salesdetail:add']"
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
          v-hasPermi="['crm-sales:salesdetail:edit']"
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
          v-hasPermi="['crm-sales:salesdetail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:salesdetail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="salesdetailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="产品ID" align="center" prop="prodid" />
      <el-table-column label="产品名称" align="center" prop="prodname" />
      <el-table-column label="产品规格" align="center" prop="prodguige" />
      <el-table-column label="产品型号" align="center" prop="prodxinghao" />
      <el-table-column label="产品单位" align="center" prop="proddanwei" />
      <el-table-column label="产品价格" align="center" prop="price" />
      <el-table-column label="产品折扣" align="center" prop="zhekou" />
      <el-table-column label="产品数量" align="center" prop="num" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-sales:salesdetail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:salesdetail:remove']"
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

    <!-- 添加或修改销售计划明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="产品ID" prop="prodid">
          <el-input v-model="form.prodid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="产品名称" prop="prodname">
          <el-input v-model="form.prodname" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品规格" prop="prodguige">
          <el-input v-model="form.prodguige" placeholder="请输入产品规格" />
        </el-form-item>
        <el-form-item label="产品型号" prop="prodxinghao">
          <el-input v-model="form.prodxinghao" placeholder="请输入产品型号" />
        </el-form-item>
        <el-form-item label="产品单位" prop="proddanwei">
          <el-input v-model="form.proddanwei" placeholder="请输入产品单位" />
        </el-form-item>
        <el-form-item label="产品价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入产品价格" />
        </el-form-item>
        <el-form-item label="产品折扣" prop="zhekou">
          <el-input v-model="form.zhekou" placeholder="请输入产品折扣" />
        </el-form-item>
        <el-form-item label="产品数量" prop="num">
          <el-input v-model="form.num" placeholder="请输入产品数量" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="主表ID" prop="mainrowid">
          <el-input v-model="form.mainrowid" placeholder="请输入主表ID" />
        </el-form-item>
        <el-form-item label="金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="出库数量" prop="chukunum">
          <el-input v-model="form.chukunum" placeholder="请输入出库数量" />
        </el-form-item>
        <el-form-item label="计划日期" prop="plandate">
          <el-date-picker clearable
            v-model="form.plandate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择计划日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期次" prop="qici">
          <el-input v-model="form.qici" placeholder="请输入期次" />
        </el-form-item>
        <el-form-item label="要求" prop="yaoqiu">
          <el-input v-model="form.yaoqiu" placeholder="请输入要求" />
        </el-form-item>
        <el-form-item label="是否提醒" prop="iftixing">
          <el-radio v-model="form.iftixing" label="1">是</el-radio>
          <el-radio v-model="form.iftixing" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="利润" prop="lirun">
          <el-input v-model="form.lirun" placeholder="请输入利润" />
        </el-form-item>
        <el-form-item label="过往产品ID" prop="oldprodid">
          <el-input v-model="form.oldprodid" placeholder="请输入过往产品ID" />
        </el-form-item>
        <el-form-item label="操作类型" prop="opertype">
          <el-radio v-model="form.opertype" label="1">特殊</el-radio>
          <el-radio v-model="form.opertype" label="0">一般</el-radio>
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
import { listSalesdetail, getSalesdetail, delSalesdetail, addSalesdetail, updateSalesdetail } from "@/api/crm-sales/salesdetail";

export default {
  name: "Salesdetail",
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
      // 销售计划明细表格数据
      salesdetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prodid: null,
        prodname: null,
        prodguige: null,
        prodxinghao: null,
        proddanwei: null,
        price: null,
        zhekou: null,
        num: null,
        beizhu: null,
        mainrowid: null,
        jine: null,
        chukunum: null,
        plandate: null,
        qici: null,
        yaoqiu: null,
        iftixing: null,
        createtime: null,
        lirun: null,
        oldprodid: null,
        opertype: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        prodid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        prodname: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        prodguige: [
          { required: true, message: "产品规格不能为空", trigger: "blur" }
        ],
        prodxinghao: [
          { required: true, message: "产品型号不能为空", trigger: "blur" }
        ],
        proddanwei: [
          { required: true, message: "产品单位不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "产品价格不能为空", trigger: "blur" }
        ],
        zhekou: [
          { required: true, message: "产品折扣不能为空", trigger: "blur" }
        ],
        num: [
          { required: true, message: "产品数量不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        mainrowid: [
          { required: true, message: "主表ID不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "金额能为空", trigger: "blur" }
        ],
        chukunum: [
          { required: true, message: "出库数量不能为空", trigger: "blur" }
        ],
        plandate: [
          { required: true, message: "计划日期不能为空", trigger: "blur" }
        ],
        qici: [
          { required: true, message: "期次不能为空", trigger: "blur" }
        ],
        yaoqiu: [
          { required: true, message: "要求不能为空", trigger: "blur" }
        ],
        iftixing: [
          { required: true, message: "是否提醒不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        lirun: [
          { required: true, message: "利润不能为空", trigger: "blur" }
        ],
        oldprodid: [
          { required: true, message: "过往产品ID不能为空", trigger: "blur" }
        ],
        opertype: [
          { required: true, message: "操作类型不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询销售计划明细列表 */
    getList() {
      this.loading = true;
      listSalesdetail(this.queryParams).then(response => {
        this.salesdetailList = response.rows;
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
        prodid: null,
        prodname: null,
        prodguige: null,
        prodxinghao: null,
        proddanwei: null,
        price: null,
        zhekou: null,
        num: null,
        beizhu: null,
        mainrowid: null,
        jine: null,
        chukunum: null,
        plandate: null,
        qici: null,
        yaoqiu: null,
        iftixing: null,
        createtime: null,
        lirun: null,
        oldprodid: null,
        opertype: null
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
      this.title = "添加销售计划明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSalesdetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改销售计划明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSalesdetail(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSalesdetail(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除销售计划明细编号为"' + ids + '"的数据项？').then(function() {
        return delSalesdetail(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/salesdetail/export', {
        ...this.queryParams
      }, `salesdetail_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
