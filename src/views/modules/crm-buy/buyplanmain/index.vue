<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主体" prop="zhuti">
        <el-input
          v-model="queryParams.zhuti"
          placeholder="请输入主体"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="linkman">
        <el-input
          v-model="queryParams.linkman"
          placeholder="请输入联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单号" prop="danhao">
        <el-input
          v-model="queryParams.danhao"
          placeholder="请输入单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createman">
        <el-input
          v-model="queryParams.createman"
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
          v-hasPermi="['crm-buy:buyplanmain:add']"
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
          v-hasPermi="['crm-buy:buyplanmain:edit']"
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
          v-hasPermi="['crm-buy:buyplanmain:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-buy:buyplanmain:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="buyplanmainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主体" align="center" prop="zhuti" />
      <el-table-column label="供应商ID" align="center" prop="supplyid" />
      <el-table-column label="联系人" align="center" prop="linkman" />
      <el-table-column label="采购日期" align="center" prop="caigoudate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.caigoudate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存ID" align="center" prop="storeid" />
      <el-table-column label="到货日期" align="center" prop="daohuodate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.daohuodate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createman" />
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
            v-hasPermi="['crm-buy:buyplanmain:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-buy:buyplanmain:remove']"
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

    <!-- 添加或修改采购计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="主体" prop="zhuti">
          <el-input v-model="form.zhuti" placeholder="请输入主体" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="采购日期" prop="caigoudate">
          <el-date-picker clearable
            v-model="form.caigoudate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择采购日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="库存ID" prop="storeid">
          <el-input v-model="form.storeid" placeholder="请输入库存ID" />
        </el-form-item>
        <el-form-item label="到货日期" prop="daohuodate">
          <el-date-picker clearable
            v-model="form.daohuodate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择到货日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单号" prop="danhao">
          <el-input v-model="form.danhao" placeholder="请输入单号" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalmoney">
          <el-input v-model="form.totalmoney" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="关联订单" prop="guanliandingdan">
          <el-input v-model="form.guanliandingdan" placeholder="请输入关联订单" />
        </el-form-item>
        <el-form-item label="关联客户" prop="guanliankehu">
          <el-input v-model="form.guanliankehu" placeholder="请输入关联客户" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="备用1" prop="beiyong1">
          <el-input v-model="form.beiyong1" placeholder="请输入备用1" />
        </el-form-item>
        <el-form-item label="备用2" prop="beiyong2">
          <el-input v-model="form.beiyong2" placeholder="请输入备用2" />
        </el-form-item>
        <el-form-item label="备用3" prop="beiyong3">
          <el-input v-model="form.beiyong3" placeholder="请输入备用3" />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymoney">
          <el-input v-model="form.paymoney" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="form.state" label="1">良好</el-radio>
          <el-radio v-model="form.state" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="入库金额" prop="rukumoney">
          <el-input v-model="form.rukumoney" placeholder="请输入入库金额" />
        </el-form-item>
        <el-form-item label="收票金额" prop="shoupiaomoney">
          <el-input v-model="form.shoupiaomoney" placeholder="请输入收票金额" />
        </el-form-item>
        <el-form-item label="是否支付" prop="ifpay">
          <el-radio v-model="form.ifpay" label="1">是</el-radio>
          <el-radio v-model="form.ifpay" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="收票状态" prop="shoupiaostate">
          <el-radio v-model="form.shoupiaostate" label="1">是</el-radio>
          <el-radio v-model="form.shoupiaostate" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="业务" prop="oddment">
          <el-input v-model="form.oddment" placeholder="请输入业务" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="帐户ID" prop="accountid">
          <el-input v-model="form.accountid" placeholder="请输入帐户ID" />
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
import { listBuyplanmain, getBuyplanmain, delBuyplanmain, addBuyplanmain, updateBuyplanmain } from "@/api/crm-buy/buyplanmain";

export default {
  name: "Buyplanmain",
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
      // 采购计划表格数据
      buyplanmainList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zhuti: null,
        supplyid: null,
        linkman: null,
        caigoudate: null,
        storeid: null,
        daohuodate: null,
        danhao: null,
        createman: null,
        createtime: null,
        totalmoney: null,
        guanliandingdan: null,
        guanliankehu: null,
        beizhu: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null,
        paymoney: null,
        state: null,
        rukumoney: null,
        shoupiaomoney: null,
        ifpay: null,
        shoupiaostate: null,
        oddment: null,
        userFlag: null,
        accountid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        zhuti: [
          { required: true, message: "主体不能为空", trigger: "blur" }
        ],
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        caigoudate: [
          { required: true, message: "采购日期不能为空", trigger: "blur" }
        ],
        storeid: [
          { required: true, message: "库存ID不能为空", trigger: "blur" }
        ],
        daohuodate: [
          { required: true, message: "到货日期不能为空", trigger: "blur" }
        ],
        danhao: [
          { required: true, message: "单号不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        totalmoney: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        guanliandingdan: [
          { required: true, message: "关联订单不能为空", trigger: "blur" }
        ],
        guanliankehu: [
          { required: true, message: "关联客户不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        beiyong1: [
          { required: true, message: "备用1不能为空", trigger: "blur" }
        ],
        beiyong2: [
          { required: true, message: "备用2不能为空", trigger: "blur" }
        ],
        beiyong3: [
          { required: true, message: "备用3不能为空", trigger: "blur" }
        ],
        paymoney: [
          { required: true, message: "支付金额不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        rukumoney: [
          { required: true, message: "入库金额不能为空", trigger: "blur" }
        ],
        shoupiaomoney: [
          { required: true, message: "收票金额不能为空", trigger: "blur" }
        ],
        ifpay: [
          { required: true, message: "是否支付不能为空", trigger: "blur" }
        ],
        shoupiaostate: [
          { required: true, message: "收票状态不能为空", trigger: "blur" }
        ],
        oddment: [
          { required: true, message: "业务不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        accountid: [
          { required: true, message: "帐户ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询采购计划列表 */
    getList() {
      this.loading = true;
      listBuyplanmain(this.queryParams).then(response => {
        this.buyplanmainList = response.rows;
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
        zhuti: null,
        supplyid: null,
        linkman: null,
        caigoudate: null,
        storeid: null,
        daohuodate: null,
        danhao: null,
        createman: null,
        createtime: null,
        totalmoney: null,
        guanliandingdan: null,
        guanliankehu: null,
        beizhu: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null,
        paymoney: null,
        state: null,
        rukumoney: null,
        shoupiaomoney: null,
        ifpay: null,
        shoupiaostate: null,
        oddment: null,
        userFlag: null,
        accountid: null
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
      this.title = "添加采购计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBuyplanmain(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采购计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBuyplanmain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBuyplanmain(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除采购计划编号为"' + ids + '"的数据项？').then(function() {
        return delBuyplanmain(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-buy/buyplanmain/export', {
        ...this.queryParams
      }, `buyplanmain_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
