<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="发货单" prop="fahuodan">
        <el-input
          v-model="queryParams.fahuodan"
          placeholder="请输入发货单"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发货人" prop="fahuoren">
        <el-input
          v-model="queryParams.fahuoren"
          placeholder="请输入发货人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货人" prop="shouhuoren">
        <el-input
          v-model="queryParams.shouhuoren"
          placeholder="请输入收货人"
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
          v-hasPermi="['crm-sales:fahuodan:add']"
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
          v-hasPermi="['crm-sales:fahuodan:edit']"
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
          v-hasPermi="['crm-sales:fahuodan:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:fahuodan:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fahuodanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="客户ID" align="center" prop="customerid" />
      <el-table-column label="订单清单ID" align="center" prop="dingdanbillid" />
      <el-table-column label="发货单" align="center" prop="fahuodan" />
      <el-table-column label="发货人" align="center" prop="fahuoren" />
      <el-table-column label="发货日期" align="center" prop="fahuodate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fahuodate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货人" align="center" prop="shouhuoren" />
      <el-table-column label="电话号码" align="center" prop="tel" />
      <el-table-column label="邮件代码" align="center" prop="mailcode" />
      <el-table-column label="发货类型" align="center" prop="fahuotype" />
      <el-table-column label="运费" align="center" prop="yunfei" />
      <el-table-column label="总金额" align="center" prop="totalmoney" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-sales:fahuodan:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:fahuodan:remove']"
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

    <!-- 添加或修改发货单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="订单清单ID" prop="dingdanbillid">
          <el-input v-model="form.dingdanbillid" placeholder="请输入订单清单ID" />
        </el-form-item>
        <el-form-item label="发货单" prop="fahuodan">
          <el-input v-model="form.fahuodan" placeholder="请输入发货单" />
        </el-form-item>
        <el-form-item label="发货人" prop="fahuoren">
          <el-input v-model="form.fahuoren" placeholder="请输入发货人" />
        </el-form-item>
        <el-form-item label="发货日期" prop="fahuodate">
          <el-date-picker clearable
            v-model="form.fahuodate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发货日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货人" prop="shouhuoren">
          <el-input v-model="form.shouhuoren" placeholder="请输入收货人" />
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="邮件代码" prop="mailcode">
          <el-input v-model="form.mailcode" placeholder="请输入邮件代码" />
        </el-form-item>
        <el-form-item label="发货类型" prop="fahuotype">
          <el-radio v-model="form.fahuotype" label="1">特殊</el-radio>
          <el-radio v-model="form.fahuotype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="form.state" label="1">特殊</el-radio>
          <el-radio v-model="form.state" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="结算类型" prop="jiesuantype">
          <el-radio v-model="form.jiesuantype" label="1">特殊</el-radio>
          <el-radio v-model="form.jiesuantype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="包装" prop="package">
          <el-input v-model="form.package" placeholder="请输入包装" />
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量" />
        </el-form-item>
        <el-form-item label="运费" prop="yunfei">
          <el-input v-model="form.yunfei" placeholder="请输入运费" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="总数量" prop="totalnum">
          <el-input v-model="form.totalnum" placeholder="请输入总数量" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalmoney">
          <el-input v-model="form.totalmoney" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="出库类型" prop="outtype">
          <el-radio v-model="form.outtype" label="1">特殊</el-radio>
          <el-radio v-model="form.outtype" label="0">一般</el-radio>
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
import { listFahuodan, getFahuodan, delFahuodan, addFahuodan, updateFahuodan } from "@/api/crm-sales/fahuodan";

export default {
  name: "Fahuodan",
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
      // 发货单表格数据
      fahuodanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerid: null,
        dingdanbillid: null,
        fahuodan: null,
        fahuoren: null,
        fahuodate: null,
        shouhuoren: null,
        tel: null,
        address: null,
        mailcode: null,
        fahuotype: null,
        state: null,
        package: null,
        weight: null,
        yunfei: null,
        jiesuantype: null,
        beizhu: null,
        totalnum: null,
        totalmoney: null,
        outtype: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        dingdanbillid: [
          { required: true, message: "订单清单ID不能为空", trigger: "blur" }
        ],
        fahuodan: [
          { required: true, message: "发货单不能为空", trigger: "blur" }
        ],
        fahuoren: [
          { required: true, message: "发货人不能为空", trigger: "blur" }
        ],
        fahuodate: [
          { required: true, message: "发货日期不能为空", trigger: "blur" }
        ],
        shouhuoren: [
          { required: true, message: "收货人不能为空", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        mailcode: [
          { required: true, message: "邮件代码不能为空", trigger: "blur" }
        ],
        fahuotype: [
          { required: true, message: "发货类型不能为空", trigger: "change" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        package: [
          { required: true, message: "包装不能为空", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "重量不能为空", trigger: "blur" }
        ],
        yunfei: [
          { required: true, message: "运费不能为空", trigger: "blur" }
        ],
        jiesuantype: [
          { required: true, message: "结算类型不能为空", trigger: "change" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        totalnum: [
          { required: true, message: "总数量不能为空", trigger: "blur" }
        ],
        totalmoney: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        outtype: [
          { required: true, message: "出库类型不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询发货单列表 */
    getList() {
      this.loading = true;
      listFahuodan(this.queryParams).then(response => {
        this.fahuodanList = response.rows;
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
        customerid: null,
        dingdanbillid: null,
        fahuodan: null,
        fahuoren: null,
        fahuodate: null,
        shouhuoren: null,
        tel: null,
        address: null,
        mailcode: null,
        fahuotype: null,
        state: null,
        package: null,
        weight: null,
        yunfei: null,
        jiesuantype: null,
        beizhu: null,
        totalnum: null,
        totalmoney: null,
        outtype: null
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
      this.title = "添加发货单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFahuodan(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改发货单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFahuodan(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFahuodan(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除发货单编号为"' + ids + '"的数据项？').then(function() {
        return delFahuodan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/fahuodan/export', {
        ...this.queryParams
      }, `fahuodan_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
