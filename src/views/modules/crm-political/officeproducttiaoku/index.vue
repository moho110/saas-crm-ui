<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="办公用品名称" prop="officename">
        <el-input
          v-model="queryParams.officename"
          placeholder="请输入办公用品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="办公用品编号" prop="officeno">
        <el-input
          v-model="queryParams.officeno"
          placeholder="请输入办公用品编号"
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
          v-hasPermi="['crm-political:officeproducttiaoku:add']"
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
          v-hasPermi="['crm-political:officeproducttiaoku:edit']"
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
          v-hasPermi="['crm-political:officeproducttiaoku:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:officeproducttiaoku:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="officeproducttiaokuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="办公用品名称" align="center" prop="officename" />
      <el-table-column label="办公用品编号" align="center" prop="officeno" />
      <el-table-column label="转移出库库仓" align="center" prop="transferoutwarehouse" />
      <el-table-column label="转移入库库仓" align="center" prop="transferinwarehouse" />
      <el-table-column label="转移数量" align="center" prop="transferquantity" />
      <el-table-column label="职员" align="center" prop="staffman" />
      <el-table-column label="批准" align="center" prop="approvalman" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="创建时间" align="center" prop="creattime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creattime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center" prop="price" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="金额" align="center" prop="count" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-political:officeproducttiaoku:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:officeproducttiaoku:remove']"
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

    <!-- 添加或修改办公用品调库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="办公用品名称" prop="officename">
          <el-input v-model="form.officename" placeholder="请输入办公用品名称" />
        </el-form-item>
        <el-form-item label="办公用品编号" prop="officeno">
          <el-input v-model="form.officeno" placeholder="请输入办公用品编号" />
        </el-form-item>
        <el-form-item label="转移出库仓库" prop="transferoutwarehouse">
          <el-input v-model="form.transferoutwarehouse" placeholder="请输入转移出库仓库" />
        </el-form-item>
        <el-form-item label="转移入库仓库" prop="transferinwarehouse">
          <el-input v-model="form.transferinwarehouse" placeholder="请输入转移入库仓库" />
        </el-form-item>
        <el-form-item label="转移数量" prop="transferquantity">
          <el-input v-model="form.transferquantity" placeholder="请输入转移数量" />
        </el-form-item>
        <el-form-item label="职员" prop="staffman">
          <el-input v-model="form.staffman" placeholder="请输入职员" />
        </el-form-item>
        <el-form-item label="批准人" prop="approvalman">
          <el-input v-model="form.approvalman" placeholder="请输入批准人" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="creattime">
          <el-date-picker clearable
            v-model="form.creattime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="金额" prop="count">
          <el-input v-model="form.count" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="是否审核" prop="isexamine">
          <el-radio v-model="form.isexamine" label="1">是</el-radio>
          <el-radio v-model="form.isexamine" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="审核时间" prop="extime">
          <el-date-picker clearable
            v-model="form.extime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
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
import { listOfficeproducttiaoku, getOfficeproducttiaoku, delOfficeproducttiaoku, addOfficeproducttiaoku, updateOfficeproducttiaoku } from "@/api/crm-political/officeproducttiaoku";

export default {
  name: "Officeproducttiaoku",
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
      // 办公用品调库表格数据
      officeproducttiaokuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        officename: null,
        officeno: null,
        transferoutwarehouse: null,
        transferinwarehouse: null,
        transferquantity: null,
        staffman: null,
        approvalman: null,
        memo: null,
        creator: null,
        creattime: null,
        price: null,
        quantity: null,
        count: null,
        isexamine: null,
        extime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        officename: [
          { required: true, message: "办公用品名称不能为空", trigger: "blur" }
        ],
        officeno: [
          { required: true, message: "办公用品编号不能为空", trigger: "blur" }
        ],
        transferoutwarehouse: [
          { required: true, message: "转移出库仓库不能为空", trigger: "blur" }
        ],
        transferinwarehouse: [
          { required: true, message: "转移入库仓库不能为空", trigger: "blur" }
        ],
        transferquantity: [
          { required: true, message: "转移数量不能为空", trigger: "blur" }
        ],
        staffman: [
          { required: true, message: "职员不能为空", trigger: "blur" }
        ],
        approvalman: [
          { required: true, message: "批准人不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        creattime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
        count: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        isexamine: [
          { required: true, message: "是否审核不能为空", trigger: "blur" }
        ],
        extime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询办公用品调库列表 */
    getList() {
      this.loading = true;
      listOfficeproducttiaoku(this.queryParams).then(response => {
        this.officeproducttiaokuList = response.rows;
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
        officename: null,
        officeno: null,
        transferoutwarehouse: null,
        transferinwarehouse: null,
        transferquantity: null,
        staffman: null,
        approvalman: null,
        memo: null,
        creator: null,
        creattime: null,
        price: null,
        quantity: null,
        count: null,
        isexamine: null,
        extime: null
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
      this.title = "添加办公用品调库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOfficeproducttiaoku(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改办公用品调库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOfficeproducttiaoku(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOfficeproducttiaoku(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除办公用品调库编号为"' + ids + '"的数据项？').then(function() {
        return delOfficeproducttiaoku(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/officeproducttiaoku/export', {
        ...this.queryParams
      }, `officeproducttiaoku_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
