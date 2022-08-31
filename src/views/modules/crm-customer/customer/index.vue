<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="供应商名称" prop="supplyname">
        <el-input
          v-model="queryParams.supplyname"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮政编码" prop="postalcode">
        <el-input
          v-model="queryParams.postalcode"
          placeholder="请输入邮政编码"
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
          v-hasPermi="['crm-customer:customer:add']"
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
          v-hasPermi="['crm-customer:customer:edit']"
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
          v-hasPermi="['crm-customer:customer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-customer:customer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="供应商ID" align="center" prop="supplyid" />
      <el-table-column label="供应商名称" align="center" prop="supplyname" />
      <el-table-column label="会员卡" align="center" prop="membercard" />
      <el-table-column label="邮政编码" align="center" prop="postalcode" />
      <el-table-column label="电话号码" align="center" prop="phone" />
      <el-table-column label="传真号码" align="center" prop="fax" />
      <el-table-column label="联系地址" align="center" prop="contactaddress" />
      <el-table-column label="电子邮件" align="center" prop="email" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-customer:customer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-customer:customer:remove']"
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

    <!-- 添加或修改客户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="supplyname">
          <el-input v-model="form.supplyname" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="供应商简称" prop="supplyshortname">
          <el-input v-model="form.supplyshortname" placeholder="请输入供应商简称" />
        </el-form-item>
        <el-form-item label="输入类型" prop="enterstype">
          <el-input v-model="form.enterstype" placeholder="请输入输入类型" />
        </el-form-item>
        <el-form-item label="职业" prop="calling">
          <el-input v-model="form.calling" placeholder="请输入职业" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="会员卡" prop="membercard">
          <el-input v-model="form.membercard" placeholder="请输入会员卡" />
        </el-form-item>
        <el-form-item label="" prop="充值部分">
          <el-input v-model="form.chargesection" placeholder="请输入充值部分" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalcode">
          <el-input v-model="form.postalcode" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="传真号码" prop="fax">
          <el-input v-model="form.fax" placeholder="请输入传真号码" />
        </el-form-item>
        <el-form-item label="联系地址" prop="contactaddress">
          <el-input v-model="form.contactaddress" placeholder="请输入联系地址" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="网络用语" prop="netword">
          <el-input v-model="form.netword" placeholder="请输入网络用语" />
        </el-form-item>
        <el-form-item label="银行" prop="bank">
          <el-input v-model="form.bank" placeholder="请输入银行" />
        </el-form-item>
        <el-form-item label="银行帐号" prop="accountnumber">
          <el-input v-model="form.accountnumber" placeholder="请输入银行帐号" />
        </el-form-item>
        <el-form-item label="开始日期" prop="startdate">
          <el-input v-model="form.startdate" placeholder="请输入开始日期" />
        </el-form-item>
        <el-form-item label="结束日期" prop="enddate">
          <el-input v-model="form.enddate" placeholder="请输入结束日期" />
        </el-form-item>
        <el-form-item label="样式" prop="style">
          <el-input v-model="form.style" placeholder="请输入样式" />
        </el-form-item>
        <el-form-item label="用户标识" prop="userFlag">
          <el-radio v-model="form.userFlag" label="1">保留</el-radio>
          <el-radio v-model="form.userFlag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="供应商编号" prop="supplycn">
          <el-input v-model="form.supplycn" placeholder="请输入供应商编号" />
        </el-form-item>
        <el-form-item label="系统用户" prop="sysuser">
          <el-input v-model="form.sysuser" placeholder="请输入系统用户" />
        </el-form-item>
        <el-form-item label="说明" prop="explainstr">
          <el-input v-model="form.explainstr" type="textarea" placeholder="请输入说明" />
        </el-form-item>
        <el-form-item label="简述" prop="briefstr">
          <el-input v-model="form.briefstr" type="textarea" placeholder="请输入简述" />
        </el-form-item>
        <el-form-item label="产品价格" prop="prodprice">
          <el-input v-model="form.prodprice" placeholder="请输入产品价格" />
        </el-form-item>
        <el-form-item label="amtagio" prop="amtagio">
          <el-input v-model="form.amtagio" placeholder="请输入amtagio" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="推荐" prop="recommand">
          <el-input v-model="form.recommand" type="textarea" placeholder="请输入推荐" />
        </el-form-item>
        <el-form-item label="获得帐户" prop="getaccount">
          <el-input v-model="form.getaccount" placeholder="请输入获得帐户" />
        </el-form-item>
        <el-form-item label="预处置" prop="yuchuzhi">
          <el-input v-model="form.yuchuzhi" placeholder="请输入预处置" />
        </el-form-item>
        <el-form-item label="实际获得金额" prop="factgetmoney">
          <el-input v-model="form.factgetmoney" placeholder="请输入实际获得金额" />
        </el-form-item>
        <el-form-item label="未获取金额" prop="nogetmoney">
          <el-input v-model="form.nogetmoney" placeholder="请输入未获取金额" />
        </el-form-item>
        <el-form-item label="来源" prop="origin">
          <el-input v-model="form.origin" placeholder="请输入来源" />
        </el-form-item>
        <el-form-item label="销售模式" prop="salemode">
          <el-input v-model="form.salemode" placeholder="请输入销售模式" />
        </el-form-item>
        <el-form-item label="属性 prop="property">
          <el-input v-model="form.property" placeholder="请输入属性" />
        </el-form-item>
        <el-form-item label="数据范围" prop="datascope">
          <el-input v-model="form.datascope" placeholder="请输入数据范围" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createdate">
          <el-date-picker clearable
            v-model="form.createdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="统一" prop="integral">
          <el-input v-model="form.integral" placeholder="请输入统一" />
        </el-form-item>
        <el-form-item label="最终跟踪时间" prop="lasttracetime">
          <el-date-picker clearable
            v-model="form.lasttracetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最终跟踪时间">
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
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer } from "@/api/crm-customer/customer";

export default {
  name: "Customer",
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
      // 客户表格数据
      customerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplyid: null,
        supplyname: null,
        supplyshortname: null,
        enterstype: null,
        calling: null,
        state: null,
        membercard: null,
        chargesection: null,
        postalcode: null,
        phone: null,
        fax: null,
        contactaddress: null,
        email: null,
        netword: null,
        bank: null,
        accountnumber: null,
        startdate: null,
        enddate: null,
        style: null,
        userFlag: null,
        userId: null,
        supplycn: null,
        sysuser: null,
        explainstr: null,
        briefstr: null,
        prodprice: null,
        amtagio: null,
        recommand: null,
        getaccount: null,
        yuchuzhi: null,
        factgetmoney: null,
        nogetmoney: null,
        origin: null,
        salemode: null,
        property: null,
        datascope: null,
        createdate: null,
        integral: null,
        lasttracetime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        supplyname: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ],
        supplyshortname: [
          { required: true, message: "供应商简称不能为空", trigger: "blur" }
        ],
        enterstype: [
          { required: true, message: "输入类型不能为空", trigger: "change" }
        ],
        calling: [
          { required: true, message: "职业不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        membercard: [
          { required: true, message: "会员卡不能为空", trigger: "blur" }
        ],
        chargesection: [
          { required: true, message: "充值不能为空", trigger: "blur" }
        ],
        postalcode: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        fax: [
          { required: true, message: "传真号码不能为空", trigger: "blur" }
        ],
        contactaddress: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "电子邮件不能为空", trigger: "blur" }
        ],
        netword: [
          { required: true, message: "网络用户不能为空", trigger: "blur" }
        ],
        bank: [
          { required: true, message: "银行不能为空", trigger: "blur" }
        ],
        accountnumber: [
          { required: true, message: "帐户号码不能为空", trigger: "blur" }
        ],
        startdate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        enddate: [
          { required: true, message: "结束日期不能为空", trigger: "blur" }
        ],
        style: [
          { required: true, message: "样式不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        supplycn: [
          { required: true, message: "供应商编码不能为空", trigger: "blur" }
        ],
        sysuser: [
          { required: true, message: "系统用户不能为空", trigger: "blur" }
        ],
        explainstr: [
          { required: true, message: "说明不能为空", trigger: "blur" }
        ],
        briefstr: [
          { required: true, message: "简述不能为空", trigger: "blur" }
        ],
        prodprice: [
          { required: true, message: "产品价格不能为空", trigger: "blur" }
        ],
        amtagio: [
          { required: true, message: "amtagio不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        recommand: [
          { required: true, message: "推荐不能为空", trigger: "blur" }
        ],
        getaccount: [
          { required: true, message: "获得帐户不能为空", trigger: "blur" }
        ],
        yuchuzhi: [
          { required: true, message: "预处置不能为空", trigger: "blur" }
        ],
        factgetmoney: [
          { required: true, message: "实际获得金额不能为空", trigger: "blur" }
        ],
        nogetmoney: [
          { required: true, message: "未获得金额不能为空", trigger: "blur" }
        ],
        origin: [
          { required: true, message: "来源不能为空", trigger: "blur" }
        ],
        salemode: [
          { required: true, message: "销售模式不能为空", trigger: "blur" }
        ],
        property: [
          { required: true, message: "属性不能为空", trigger: "blur" }
        ],
        datascope: [
          { required: true, message: "数据范围不能为空", trigger: "blur" }
        ],
        createdate: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        integral: [
          { required: true, message: "统一不能为空", trigger: "blur" }
        ],
        lasttracetime: [
          { required: true, message: "最终跟踪时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询客户列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
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
        supplyid: null,
        supplyname: null,
        supplyshortname: null,
        enterstype: null,
        calling: null,
        state: null,
        membercard: null,
        chargesection: null,
        postalcode: null,
        phone: null,
        fax: null,
        contactaddress: null,
        email: null,
        netword: null,
        bank: null,
        accountnumber: null,
        startdate: null,
        enddate: null,
        style: null,
        userFlag: null,
        userId: null,
        supplycn: null,
        sysuser: null,
        explainstr: null,
        briefstr: null,
        prodprice: null,
        amtagio: null,
        remark: null,
        recommand: null,
        getaccount: null,
        yuchuzhi: null,
        factgetmoney: null,
        nogetmoney: null,
        origin: null,
        salemode: null,
        property: null,
        datascope: null,
        createdate: null,
        integral: null,
        lasttracetime: null
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
      this.title = "添加客户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCustomer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改客户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCustomer(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCustomer(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除客户编号为"' + ids + '"的数据项？').then(function() {
        return delCustomer(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-customer/customer/export', {
        ...this.queryParams
      }, `customer_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
