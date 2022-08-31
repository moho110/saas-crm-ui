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
          v-hasPermi="['crm-sales:jiaofu:add']"
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
          v-hasPermi="['crm-sales:jiaofu:edit']"
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
          v-hasPermi="['crm-sales:jiaofu:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:jiaofu:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="jiaofuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="客户ID" align="center" prop="customerid" />
      <el-table-column label="合同ID" align="center" prop="hetongid" />
      <el-table-column label="产品ID" align="center" prop="productid" />
      <el-table-column label="计划ID" align="center" prop="planid" />
      <el-table-column label="数量" align="center" prop="num" />
      <el-table-column label="价格" align="center" prop="price" />
      <el-table-column label="接收人" align="center" prop="jieshouren" />
      <el-table-column label="交付日期" align="center" prop="jiaofudate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.jiaofudate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-sales:jiaofu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:jiaofu:remove']"
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

    <!-- 添加或修改销售合同交付管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="合同ID" prop="hetongid">
          <el-input v-model="form.hetongid" placeholder="请输入合同ID" />
        </el-form-item>
        <el-form-item label="产品ID" prop="productid">
          <el-input v-model="form.productid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="计划ID" prop="planid">
          <el-input v-model="form.planid" placeholder="请输入计划ID" />
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input v-model="form.num" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="接收人" prop="jieshouren">
          <el-input v-model="form.jieshouren" placeholder="请输入接收人" />
        </el-form-item>
        <el-form-item label="交付日期" prop="jiaofudate">
          <el-date-picker clearable
            v-model="form.jiaofudate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择交付日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
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
        <el-form-item label="金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入金额" />
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
import { listJiaofu, getJiaofu, delJiaofu, addJiaofu, updateJiaofu } from "@/api/crm-sales/jiaofu";

export default {
  name: "Jiaofu",
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
      // 销售合同交付管理表格数据
      jiaofuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerid: null,
        hetongid: null,
        productid: null,
        planid: null,
        num: null,
        price: null,
        jieshouren: null,
        jiaofudate: null,
        beizhu: null,
        createman: null,
        createtime: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null,
        jine: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        hetongid: [
          { required: true, message: "合同ID不能为空", trigger: "blur" }
        ],
        productid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        planid: [
          { required: true, message: "计划ID不能为空", trigger: "blur" }
        ],
        num: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
        ],
        jieshouren: [
          { required: true, message: "接收人不能为空", trigger: "blur" }
        ],
        jiaofudate: [
          { required: true, message: "交付日期不能为空", trigger: "blur" }
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
        beiyong1: [
          { required: true, message: "备用1不能为空", trigger: "blur" }
        ],
        beiyong2: [
          { required: true, message: "备用2不能为空", trigger: "blur" }
        ],
        beiyong3: [
          { required: true, message: "备用3不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询销售合同交付管理列表 */
    getList() {
      this.loading = true;
      listJiaofu(this.queryParams).then(response => {
        this.jiaofuList = response.rows;
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
        hetongid: null,
        productid: null,
        planid: null,
        num: null,
        price: null,
        jieshouren: null,
        jiaofudate: null,
        beizhu: null,
        createman: null,
        createtime: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null,
        jine: null
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
      this.title = "添加销售合同交付管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJiaofu(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改销售合同交付管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJiaofu(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJiaofu(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除销售合同交付管理编号为"' + ids + '"的数据项？').then(function() {
        return delJiaofu(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/jiaofu/export', {
        ...this.queryParams
      }, `jiaofu_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
