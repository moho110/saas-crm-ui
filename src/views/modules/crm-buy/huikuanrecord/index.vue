<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
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
          v-hasPermi="['crm-buy:huikuanrecord:add']"
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
          v-hasPermi="['crm-buy:huikuanrecord:edit']"
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
          v-hasPermi="['crm-buy:huikuanrecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-buy:huikuanrecord:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="huikuanrecordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="客户ID" align="center" prop="customerid" />
      <el-table-column label="订单清单ID" align="center" prop="dingdanbillid" />
      <el-table-column label="期次" align="center" prop="qici" />
      <el-table-column label="支付日期" align="center" prop="paydate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paydate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="jine" />
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
            v-hasPermi="['crm-buy:huikuanrecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-buy:huikuanrecord:remove']"
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

    <!-- 添加或修改汇款记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="订单清单ID" prop="dingdanbillid">
          <el-input v-model="form.dingdanbillid" placeholder="请输入订单清单ID" />
        </el-form-item>
        <el-form-item label="期次" prop="qici">
          <el-input v-model="form.qici" placeholder="请输入期次" />
        </el-form-item>
        <el-form-item label="支付日期" prop="paydate">
          <el-date-picker clearable
            v-model="form.paydate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择支付日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="是否开票" prop="ifkaipiao">
          <el-radio v-model="form.ifkaipiao" label="1">是</el-radio>
          <el-radio v-model="form.ifkaipiao" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="帐号ID" prop="accountid">
          <el-input v-model="form.accountid" placeholder="请输入帐号ID" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="关联计划ID" prop="guanlianplanid">
          <el-input v-model="form.guanlianplanid" placeholder="请输入关联计划ID" />
        </el-form-item>
        <el-form-item label="业务" prop="oddment">
          <el-input v-model="form.oddment" placeholder="请输入业务" />
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
import { listHuikuanrecord, getHuikuanrecord, delHuikuanrecord, addHuikuanrecord, updateHuikuanrecord } from "@/api/crm-buy/huikuanrecord";

export default {
  name: "Huikuanrecord",
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
      // 汇款记录表格数据
      huikuanrecordList: [],
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
        qici: null,
        paydate: null,
        jine: null,
        ifkaipiao: null,
        accountid: null,
        beizhu: null,
        createman: null,
        createtime: null,
        guanlianplanid: null,
        oddment: null
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
        qici: [
          { required: true, message: "期次不能为空", trigger: "blur" }
        ],
        paydate: [
          { required: true, message: "支付日期不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        ifkaipiao: [
          { required: true, message: "是否开票不能为空", trigger: "blur" }
        ],
        accountid: [
          { required: true, message: "帐户ID不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        guanlianplanid: [
          { required: true, message: "关联计划ID不能为空", trigger: "blur" }
        ],
        oddment: [
          { required: true, message: "业务不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询汇款记录列表 */
    getList() {
      this.loading = true;
      listHuikuanrecord(this.queryParams).then(response => {
        this.huikuanrecordList = response.rows;
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
        qici: null,
        paydate: null,
        jine: null,
        ifkaipiao: null,
        accountid: null,
        beizhu: null,
        createman: null,
        createtime: null,
        guanlianplanid: null,
        oddment: null
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
      this.title = "添加汇款记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHuikuanrecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改汇款记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHuikuanrecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHuikuanrecord(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除汇款记录编号为"' + ids + '"的数据项？').then(function() {
        return delHuikuanrecord(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-buy/huikuanrecord/export', {
        ...this.queryParams
      }, `huikuanrecord_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
