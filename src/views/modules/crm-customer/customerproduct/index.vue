<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="报价人" prop="priceman">
        <el-input
          v-model="queryParams.priceman"
          placeholder="请输入报价人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户" prop="clients">
        <el-input
          v-model="queryParams.clients"
          placeholder="请输入客户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报价人" prop="reiceiver">
        <el-input
          v-model="queryParams.reiceiver"
          placeholder="请输入报价人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="queryParams.creator"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人" prop="examineman">
        <el-input
          v-model="queryParams.examineman"
          placeholder="请输入审核人"
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
          v-hasPermi="['crm-customer:customerproduct:add']"
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
          v-hasPermi="['crm-customer:customerproduct:edit']"
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
          v-hasPermi="['crm-customer:customerproduct:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-customer:customerproduct:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerproductList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主题" align="center" prop="theme" />
      <el-table-column label="报价人" align="center" prop="priceman" />
      <el-table-column label="客户" align="center" prop="clients" />
      <el-table-column label="接收人" align="center" prop="reiceiver" />
      <el-table-column label="报价时间" align="center" prop="pricetime" />
      <el-table-column label="创建人" align="center" prop="creator" />
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
            v-hasPermi="['crm-customer:customerproduct:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-customer:customerproduct:remove']"
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

    <!-- 添加或修改产品列表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="主题" prop="theme">
          <el-input v-model="form.theme" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="报价人" prop="priceman">
          <el-input v-model="form.priceman" placeholder="请输入报价人" />
        </el-form-item>
        <el-form-item label="客户" prop="clients">
          <el-input v-model="form.clients" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="接收人" prop="reiceiver">
          <el-input v-model="form.reiceiver" placeholder="请输入"接收人" />
        </el-form-item>
        <el-form-item label="报价时间" prop="pricetime">
          <el-input v-model="form.pricetime" placeholder="请输入报价时间" />
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="form.count" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="销售机会" prop="salechance">
          <el-input v-model="form.salechance" placeholder="请输入销售机会" />
        </el-form-item>
        <el-form-item label="交付介绍" prop="jiaofuintro">
          <el-input v-model="form.jiaofuintro" type="textarea" placeholder="请输入交付介绍" />
        </el-form-item>
        <el-form-item label="支付介绍" prop="topayintro">
          <el-input v-model="form.topayintro" type="textarea" placeholder="请输入支付介绍" />
        </el-form-item>
        <el-form-item label="包装说明介绍" prop="packageexpintro">
          <el-input v-model="form.packageexpintro" type="textarea" placeholder="请输入包装说明介绍" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="附件" prop="attach">
          <el-input v-model="form.attach" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="是否审核" prop="isexamine">
          <el-radio v-model="form.isexamine" label="1">是</el-radio>
          <el-radio v-model="form.isexamine" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="审核人" prop="examineman">
          <el-input v-model="form.examineman" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="examinetime">
          <el-date-picker clearable
            v-model="form.examinetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单位ID" prop="unitid">
          <el-input v-model="form.unitid" placeholder="请输入单位ID" />
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
import { listCustomerproduct, getCustomerproduct, delCustomerproduct, addCustomerproduct, updateCustomerproduct } from "@/api/crm-customer/customerproduct";

export default {
  name: "Customerproduct",
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
      // 产品列表表格数据
      customerproductList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        theme: null,
        priceman: null,
        clients: null,
        reiceiver: null,
        pricetime: null,
        count: null,
        salechance: null,
        jiaofuintro: null,
        topayintro: null,
        packageexpintro: null,
        memo: null,
        attach: null,
        isexamine: null,
        creator: null,
        createtime: null,
        examineman: null,
        examinetime: null,
        unitid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        theme: [
          { required: true, message: "主题不能为空", trigger: "blur" }
        ],
        priceman: [
          { required: true, message: "报价人不能为空", trigger: "blur" }
        ],
        clients: [
          { required: true, message: "客户不能为空", trigger: "blur" }
        ],
        reiceiver: [
          { required: true, message: "接收人不能为空", trigger: "blur" }
        ],
        pricetime: [
          { required: true, message: "报价时间不能为空", trigger: "blur" }
        ],
        count: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
        salechance: [
          { required: true, message: "销售机会不能为空", trigger: "blur" }
        ],
        jiaofuintro: [
          { required: true, message: "交付介绍不能为空", trigger: "blur" }
        ],
        topayintro: [
          { required: true, message: "支付介绍不能为空", trigger: "blur" }
        ],
        packageexpintro: [
          { required: true, message: "包装说明介绍不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        attach: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ],
        isexamine: [
          { required: true, message: "是否审核不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        examineman: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        examinetime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        unitid: [
          { required: true, message: "单位ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询产品列表列表 */
    getList() {
      this.loading = true;
      listCustomerproduct(this.queryParams).then(response => {
        this.customerproductList = response.rows;
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
        theme: null,
        priceman: null,
        clients: null,
        reiceiver: null,
        pricetime: null,
        count: null,
        salechance: null,
        jiaofuintro: null,
        topayintro: null,
        packageexpintro: null,
        memo: null,
        attach: null,
        isexamine: null,
        creator: null,
        createtime: null,
        examineman: null,
        examinetime: null,
        unitid: null
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
      this.title = "添加产品列表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCustomerproduct(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品列表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCustomerproduct(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCustomerproduct(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除产品列表编号为"' + ids + '"的数据项？').then(function() {
        return delCustomerproduct(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-customer/customerproduct/export', {
        ...this.queryParams
      }, `customerproduct_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
