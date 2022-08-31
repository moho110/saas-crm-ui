<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主题" prop="zhuti">
        <el-input
          v-model="queryParams.zhuti"
          placeholder="请输入主题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发货金额" prop="fahuojine">
        <el-input
          v-model="queryParams.fahuojine"
          placeholder="请输入发货金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开票金额" prop="kaipiaojine">
        <el-input
          v-model="queryParams.kaipiaojine"
          placeholder="请输入开票金额"
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
          v-hasPermi="['crm-sales:sellplanmain:add']"
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
          v-hasPermi="['crm-sales:sellplanmain:edit']"
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
          v-hasPermi="['crm-sales:sellplanmain:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:sellplanmain:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sellplanmainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主题" align="center" prop="zhuti" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="供应商ID" align="center" prop="supplyid" />
      <el-table-column label="机会ID" align="center" prop="chanceid" />
      <el-table-column label="销售计划编号" align="center" prop="sellplanno" />
      <el-table-column label="总金额" align="center" prop="totalmoney" />
      <el-table-column label="支付类型" align="center" prop="paytype" />
      <el-table-column label="汇款金额" align="center" prop="huikuanjine" />
      <el-table-column label="发货金额" align="center" prop="fahuojine" />
      <el-table-column label="开票金额" align="center" prop="kaipiaojine" />
      <el-table-column label="计划日期" align="center" prop="plandate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.plandate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-sales:sellplanmain:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:sellplanmain:remove']"
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

    <!-- 添加或修改销售计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="主题" prop="zhuti">
          <el-input v-model="form.zhuti" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="机会ID" prop="chanceid">
          <el-input v-model="form.chanceid" placeholder="请输入机会ID" />
        </el-form-item>
        <el-form-item label="销售计划编号" prop="sellplanno">
          <el-input v-model="form.sellplanno" placeholder="请输入销售计划编号" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalmoney">
          <el-input v-model="form.totalmoney" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="支付类型" prop="paytype">
          <el-radio v-model="form.paytype" label="1">微信</el-radio>
          <el-radio v-model="form.paytype" label="0">现金</el-radio>
        </el-form-item>
        <el-form-item label="汇款金额" prop="huikuanjine">
          <el-input v-model="form.huikuanjine" placeholder="请输入汇款金额" />
        </el-form-item>
        <el-form-item label="发货金额" prop="fahuojine">
          <el-input v-model="form.fahuojine" placeholder="请输入发货金额" />
        </el-form-item>
        <el-form-item label="开票金额" prop="kaipiaojine">
          <el-input v-model="form.kaipiaojine" placeholder="请输入开票金额" />
        </el-form-item>
        <el-form-item label="计划日期" prop="plandate">
          <el-date-picker clearable
            v-model="form.plandate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择计划日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最晚发货日期" prop="zuiwanfahuodate">
          <el-date-picker clearable
            v-model="form.zuiwanfahuodate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最晚发货日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签约人" prop="qianyueren">
          <el-input v-model="form.qianyueren" placeholder="请输入签约人" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="文件地址" prop="fileaddress">
          <el-input v-model="form.fileaddress" placeholder="请输入文件地址" />
        </el-form-item>
        <el-form-item label="发货日期" prop="fahuostate">
          <el-input v-model="form.fahuostate" placeholder="请输入发货日期" />
        </el-form-item>
        <el-form-item label="概要" prop="gaiyao">
          <el-input v-model="form.gaiyao" placeholder="请输入概要" />
        </el-form-item>
        <el-form-item label="仓库ID" prop="storeid">
          <el-input v-model="form.storeid" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="移动电话" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入移动电话" />
        </el-form-item>
        <el-form-item label="清单类型" prop="billtype">
          <el-radio v-model="form.billtype" label="1">特殊</el-radio>
          <el-radio v-model="form.billtype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="是否支付" prop="ifpay">
          <el-radio v-model="form.ifpay" label="1">是</el-radio>
          <el-radio v-model="form.ifpay" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="备用" prop="beiyong">
          <el-input v-model="form.beiyong" placeholder="请输入备用" />
        </el-form-item>
        <el-form-item label="开票状态" prop="kaipiaostate">
          <el-radio v-model="form.kaipiaostate" label="1">特殊</el-radio>
          <el-radio v-model="form.kaipiaostate" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="发票内容" prop="fapiaoneirong">
          <el-input v-model="form.fapiaoneirong" placeholder="请输入发票内容" />
        </el-form-item>
        <el-form-item label="发票编号" prop="fapiaono">
          <el-input v-model="form.fapiaono" placeholder="请输入发票编号" />
        </el-form-item>
        <el-form-item label="发票类型" prop="fapiaotype">
          <el-radio v-model="form.fapiaotype" label="1">特殊</el-radio>
          <el-radio v-model="form.fapiaotype" label="0">普通</el-radio>
        </el-form-item>
        <el-form-item label="发货类型" prop="fahuotype">
          <el-radio v-model="form.fahuotype" label="1">特殊</el-radio>
          <el-radio v-model="form.fahuotype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="发货单" prop="fahuodan">
          <el-input v-model="form.fahuodan" placeholder="请输入发货单" />
        </el-form-item>
        <el-form-item label="发货运费" prop="fahuoyunfei">
          <el-input v-model="form.fahuoyunfei" placeholder="请输入发货运费" />
        </el-form-item>
        <el-form-item label="运费类型" prop="yunfeitype">
          <el-radio v-model="form.yunfeitype" label="1">特殊</el-radio>
          <el-radio v-model="form.yunfeitype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="零碎事务" prop="oddment">
          <el-input v-model="form.oddment" placeholder="请输入零碎事务" />
        </el-form-item>
        <el-form-item label="Integral" prop="integral">
          <el-input v-model="form.integral" placeholder="请输入Integral" />
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
import { listSellplanmain, getSellplanmain, delSellplanmain, addSellplanmain, updateSellplanmain } from "@/api/crm-sales/sellplanmain";

export default {
  name: "Sellplanmain",
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
      // 销售计划表格数据
      sellplanmainList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zhuti: null,
        userId: null,
        supplyid: null,
        chanceid: null,
        sellplanno: null,
        totalmoney: null,
        paytype: null,
        huikuanjine: null,
        fahuojine: null,
        kaipiaojine: null,
        plandate: null,
        zuiwanfahuodate: null,
        qianyueren: null,
        userFlag: null,
        beizhu: null,
        fileaddress: null,
        fahuostate: null,
        gaiyao: null,
        storeid: null,
        linkman: null,
        address: null,
        mobile: null,
        createtime: null,
        billtype: null,
        ifpay: null,
        beiyong: null,
        kaipiaostate: null,
        fapiaoneirong: null,
        fapiaotype: null,
        fapiaono: null,
        fahuotype: null,
        fahuodan: null,
        fahuoyunfei: null,
        yunfeitype: null,
        oddment: null,
        integral: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        zhuti: [
          { required: true, message: "主题不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        chanceid: [
          { required: true, message: "机会ID不能为空", trigger: "blur" }
        ],
        sellplanno: [
          { required: true, message: "销售计划编号不能为空", trigger: "blur" }
        ],
        totalmoney: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        paytype: [
          { required: true, message: "支付类型不能为空", trigger: "change" }
        ],
        huikuanjine: [
          { required: true, message: "汇款金额不能为空", trigger: "blur" }
        ],
        fahuojine: [
          { required: true, message: "发货金额不能为空", trigger: "blur" }
        ],
        kaipiaojine: [
          { required: true, message: "开票金额不能为空", trigger: "blur" }
        ],
        plandate: [
          { required: true, message: "计划日期不能为空", trigger: "blur" }
        ],
        zuiwanfahuodate: [
          { required: true, message: "最晚发货日期不能为空", trigger: "blur" }
        ],
        qianyueren: [
          { required: true, message: "签约人不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        fileaddress: [
          { required: true, message: "文件地址不能为空", trigger: "blur" }
        ],
        fahuostate: [
          { required: true, message: "发货状态不能为空", trigger: "blur" }
        ],
        gaiyao: [
          { required: true, message: "概要不能为空", trigger: "blur" }
        ],
        storeid: [
          { required: true, message: "库存ID不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "移动电话不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        billtype: [
          { required: true, message: "清单类型不能为空", trigger: "change" }
        ],
        ifpay: [
          { required: true, message: "是否支付不能为空", trigger: "blur" }
        ],
        beiyong: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        kaipiaostate: [
          { required: true, message: "开票状态不能为空", trigger: "blur" }
        ],
        fapiaoneirong: [
          { required: true, message: "发货内容不能为空", trigger: "blur" }
        ],
        fapiaotype: [
          { required: true, message: "发票类型不能为空", trigger: "change" }
        ],
        fapiaono: [
          { required: true, message: "发票编号不能为空", trigger: "blur" }
        ],
        fahuotype: [
          { required: true, message: "发货类型不能为空", trigger: "change" }
        ],
        fahuodan: [
          { required: true, message: "发货单不能为空", trigger: "blur" }
        ],
        fahuoyunfei: [
          { required: true, message: "发货运费不能为空", trigger: "blur" }
        ],
        yunfeitype: [
          { required: true, message: "运费类型不能为空", trigger: "change" }
        ],
        oddment: [
          { required: true, message: "零碎业务不能为空", trigger: "blur" }
        ],
        integral: [
          { required: true, message: "Integral不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询销售计划列表 */
    getList() {
      this.loading = true;
      listSellplanmain(this.queryParams).then(response => {
        this.sellplanmainList = response.rows;
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
        userId: null,
        supplyid: null,
        chanceid: null,
        sellplanno: null,
        totalmoney: null,
        paytype: null,
        huikuanjine: null,
        fahuojine: null,
        kaipiaojine: null,
        plandate: null,
        zuiwanfahuodate: null,
        qianyueren: null,
        userFlag: null,
        beizhu: null,
        fileaddress: null,
        fahuostate: null,
        gaiyao: null,
        storeid: null,
        linkman: null,
        address: null,
        mobile: null,
        createtime: null,
        billtype: null,
        ifpay: null,
        beiyong: null,
        kaipiaostate: null,
        fapiaoneirong: null,
        fapiaotype: null,
        fapiaono: null,
        fahuotype: null,
        fahuodan: null,
        fahuoyunfei: null,
        yunfeitype: null,
        oddment: null,
        integral: null
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
      this.title = "添加销售计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSellplanmain(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改销售计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSellplanmain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSellplanmain(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除销售计划编号为"' + ids + '"的数据项？').then(function() {
        return delSellplanmain(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/sellplanmain/export', {
        ...this.queryParams
      }, `sellplanmain_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
