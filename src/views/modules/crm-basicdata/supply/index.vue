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
      <el-form-item label="联系人" prop="linkman">
        <el-input
          v-model="queryParams.linkman"
          placeholder="请输入联系人"
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
          v-hasPermi="['crm-basicdata:supply:add']"
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
          v-hasPermi="['crm-basicdata:supply:edit']"
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
          v-hasPermi="['crm-basicdata:supply:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:supply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="supplyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="供应商ID" align="center" prop="supplyid" />
      <el-table-column label="供应商名称" align="center" prop="supplyname" />
      <el-table-column label="供应商简称" align="center" prop="supplyshortname" />
      <el-table-column label="联系人" align="center" prop="linkman" />
      <el-table-column label="邮政编码" align="center" prop="postalcode" />
      <el-table-column label="电话号码" align="center" prop="phone" />
      <el-table-column label="传真号码" align="center" prop="fax" />
      <el-table-column label="电子邮件" align="center" prop="email" />
      <el-table-column label="网络用语" align="center" prop="netword" />
      <el-table-column label="预付款" align="center" prop="yufukuan" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:supply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:supply:remove']"
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

    <!-- 添加或修改供应商对话框 -->
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
        <el-form-item label="职业" prop="calling">
          <el-input v-model="form.calling" placeholder="请输入职业" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="法人" prop="artificialperson">
          <el-input v-model="form.artificialperson" placeholder="请输入法人" />
        </el-form-item>
        <el-form-item label="充电" prop="chargesection">
          <el-input v-model="form.chargesection" placeholder="请输入充电" />
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
        <el-form-item label="开始时间" prop="startdate">
          <el-input v-model="form.startdate" placeholder="请输入开始时间" />
        </el-form-item>
        <el-form-item label="结束时间" prop="enddate">
          <el-input v-model="form.enddate" placeholder="请输入结束时间" />
        </el-form-item>
        <el-form-item label="类型" prop="style">
          <el-input v-model="form.style" placeholder="请输入类型" />
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
        <el-form-item label="amtagio" prop="amtagio">
          <el-input v-model="form.amtagio" placeholder="请输入amtagio" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="推荐" prop="recommand">
          <el-input v-model="form.recommand" placeholder="请输入推荐" />
        </el-form-item>
        <el-form-item label="支付帐户" prop="payaccount">
          <el-input v-model="form.payaccount" placeholder="请输入支付帐户" />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymoney">
          <el-input v-model="form.paymoney" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="实际支付金额" prop="factpaymoney">
          <el-input v-model="form.factpaymoney" placeholder="请输入实际支付金额" />
        </el-form-item>
        <el-form-item label="未支付金额" prop="nopaymoney">
          <el-input v-model="form.nopaymoney" placeholder="请输入未支付金额" />
        </el-form-item>
        <el-form-item label="数据范围" prop="datascope">
          <el-input v-model="form.datascope" placeholder="请输入数据范围" />
        </el-form-item>
        <el-form-item label="预付款" prop="yufukuan">
          <el-input v-model="form.yufukuan" placeholder="请输入预付款" />
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
import { listSupply, getSupply, delSupply, addSupply, updateSupply } from "@/api/crm-basicdata/supply";

export default {
  name: "Supply",
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
      // 供应商表格数据
      supplyList: [],
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
        linkman: null,
        artificialperson: null,
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
        prodtype: null,
        amtagio: null,
        remark: null,
        recommand: null,
        payaccount: null,
        paymoney: null,
        factpaymoney: null,
        nopaymoney: null,
        datascope: null,
        yufukuan: null
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
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        calling: [
          { required: true, message: "calling不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        artificialperson: [
          { required: true, message: "法人不能为空", trigger: "blur" }
        ],
        chargesection: [
          { required: true, message: "充电不能为空", trigger: "blur" }
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
          { required: true, message: "网络用语不能为空", trigger: "blur" }
        ],
        bank: [
          { required: true, message: "银行不能为空", trigger: "blur" }
        ],
        accountnumber: [
          { required: true, message: "帐户号码不能为空", trigger: "blur" }
        ],
        startdate: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        enddate: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        style: [
          { required: true, message: "类型不能为空", trigger: "blur" }
        ],
        userFlag: [
          { required: true, message: "用户标识不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        supplycn: [
          { required: true, message: "供应商编号不能为空", trigger: "blur" }
        ],
        sysuser: [
          { required: true, message: "系统用户不能为空", trigger: "blur" }
        ],
        prodtype: [
          { required: true, message: "产品类型不能为空", trigger: "change" }
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
        payaccount: [
          { required: true, message: "支付帐户不能为空", trigger: "blur" }
        ],
        paymoney: [
          { required: true, message: "支付金额不能为空", trigger: "blur" }
        ],
        factpaymoney: [
          { required: true, message: "实际支付金额不能为空", trigger: "blur" }
        ],
        nopaymoney: [
          { required: true, message: "未支付金额不能为空", trigger: "blur" }
        ],
        datascope: [
          { required: true, message: "数据范围不能为空", trigger: "blur" }
        ],
        yufukuan: [
          { required: true, message: "预付款不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询供应商列表 */
    getList() {
      this.loading = true;
      listSupply(this.queryParams).then(response => {
        this.supplyList = response.rows;
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
        linkman: null,
        artificialperson: null,
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
        prodtype: null,
        amtagio: null,
        remark: null,
        recommand: null,
        payaccount: null,
        paymoney: null,
        factpaymoney: null,
        nopaymoney: null,
        datascope: null,
        yufukuan: null
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
      this.title = "添加供应商";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSupply(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改供应商";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSupply(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSupply(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除供应商编号为"' + ids + '"的数据项？').then(function() {
        return delSupply(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/supply/export', {
        ...this.queryParams
      }, `supply_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
