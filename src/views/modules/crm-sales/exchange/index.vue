<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="型号" prop="xinghao">
        <el-input
          v-model="queryParams.xinghao"
          placeholder="请输入型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格" prop="guige">
        <el-input
          v-model="queryParams.guige"
          placeholder="请输入规格"
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
      <el-form-item label="产品名称" prop="prodname">
        <el-input
          v-model="queryParams.prodname"
          placeholder="请输入产品名称"
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
          v-hasPermi="['crm-sales:exchange:add']"
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
          v-hasPermi="['crm-sales:exchange:edit']"
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
          v-hasPermi="['crm-sales:exchange:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:exchange:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="exchangeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="客户ID" align="center" prop="customid" />
      <el-table-column label="产品ID" align="center" prop="prodid" />
      <el-table-column label="型号" align="center" prop="xinghao" />
      <el-table-column label="规格" align="center" prop="guige" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createman" />
      <el-table-column label="产品名称" align="center" prop="prodname" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-sales:exchange:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:exchange:remove']"
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

    <!-- 添加或修改积分兑换对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="客户ID" prop="customid">
          <el-input v-model="form.customid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="产品ID" prop="prodid">
          <el-input v-model="form.prodid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="型号" prop="xinghao">
          <el-input v-model="form.xinghao" placeholder="请输入型号" />
        </el-form-item>
        <el-form-item label="规格" prop="guige">
          <el-input v-model="form.guige" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="Integral" prop="integral">
          <el-input v-model="form.integral" placeholder="请输入Integral" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="产品名称" prop="prodname">
          <el-input v-model="form.prodname" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="积分数量" prop="exchangenum">
          <el-input v-model="form.exchangenum" placeholder="请输入积分数量" />
        </el-form-item>
        <el-form-item label="库存ID" prop="stockid">
          <el-input v-model="form.stockid" placeholder="请输入库存ID" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" type="textarea" placeholder="请输入备注" />
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
import { listExchange, getExchange, delExchange, addExchange, updateExchange } from "@/api/crm-sales/exchange";

export default {
  name: "Exchange",
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
      // 积分兑换表格数据
      exchangeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customid: null,
        prodid: null,
        xinghao: null,
        guige: null,
        integral: null,
        createtime: null,
        createman: null,
        prodname: null,
        exchangenum: null,
        stockid: null,
        beizhu: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        prodid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        xinghao: [
          { required: true, message: "型号不能为空", trigger: "blur" }
        ],
        guige: [
          { required: true, message: "规格不能为空", trigger: "blur" }
        ],
        integral: [
          { required: true, message: "Integral不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        prodname: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        exchangenum: [
          { required: true, message: "积分数量不能为空", trigger: "blur" }
        ],
        stockid: [
          { required: true, message: "库存ID不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询积分兑换列表 */
    getList() {
      this.loading = true;
      listExchange(this.queryParams).then(response => {
        this.exchangeList = response.rows;
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
        customid: null,
        prodid: null,
        xinghao: null,
        guige: null,
        integral: null,
        createtime: null,
        createman: null,
        prodname: null,
        exchangenum: null,
        stockid: null,
        beizhu: null
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
      this.title = "添加积分兑换";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getExchange(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改积分兑换";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExchange(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addExchange(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除积分兑换编号为"' + ids + '"的数据项？').then(function() {
        return delExchange(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/exchange/export', {
        ...this.queryParams
      }, `exchange_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
