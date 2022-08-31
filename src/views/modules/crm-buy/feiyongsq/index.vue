<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户名称" prop="clientname">
        <el-input
          v-model="queryParams.clientname"
          placeholder="请输入客户名称"
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
          v-hasPermi="['crm-buy:feiyongsq:add']"
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
          v-hasPermi="['crm-buy:feiyongsq:edit']"
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
          v-hasPermi="['crm-buy:feiyongsq:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-buy:feiyongsq:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feiyongsqList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="费用类型" align="center" prop="feetype" />
      <el-table-column label="数量" align="center" prop="count" />
      <el-table-column label="申请日期" align="center" prop="applydate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applydate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center" prop="clientname" />
      <el-table-column label="审核人" align="center" prop="examineman" />
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
            v-hasPermi="['crm-buy:feiyongsq:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-buy:feiyongsq:remove']"
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

    <!-- 添加或修改费用申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="费用类型" prop="feeType">
          <el-input v-model="form.feeType" placeholder="请输入费用类型" />
        </el-form-item>
        <el-form-item label="金额" prop="count">
          <el-input v-model="form.count" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="费用使用" prop="feeuse">
          <el-input v-model="form.feeuse" type="textarea" placeholder="请输入费用使用" />
        </el-form-item>
        <el-form-item label="申请日期" prop="applydate">
          <el-date-picker clearable
            v-model="form.applydate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择申请日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户名称" prop="clientname">
          <el-input v-model="form.clientname" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="偿还人" prop="reimburseman">
          <el-input v-model="form.reimburseman" placeholder="请输入偿还人" />
        </el-form-item>
        <el-form-item label="记录人" prop="recorder">
          <el-input v-model="form.recorder" placeholder="请输入记录人" />
        </el-form-item>
        <el-form-item label="是否审核" prop="isexamine">
          <el-radio v-model="form.isexamine" label="1">是</el-radio>
          <el-radio v-model="form.isexamine" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="审核日期" prop="examinedate">
          <el-input v-model="form.examinedate" placeholder="请输入审核日期" />
        </el-form-item>
        <el-form-item label="出纳人" prop="cashier">
          <el-input v-model="form.cashier" placeholder="请输入出纳人" />
        </el-form-item>
        <el-form-item label="支付时间" prop="paytime">
          <el-date-picker clearable
            v-model="form.paytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="bak">
          <el-input v-model="form.bak" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="审核人" prop="examineman">
          <el-input v-model="form.examineman" placeholder="请输入审核人" />
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
import { listFeiyongsq, getFeiyongsq, delFeiyongsq, addFeiyongsq, updateFeiyongsq } from "@/api/crm-buy/feiyongsq";

export default {
  name: "Feiyongsq",
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
      // 费用申请表格数据
      feiyongsqList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        feetype: null,
        count: null,
        feeuse: null,
        applydate: null,
        clientname: null,
        reimburseman: null,
        recorder: null,
        isexamine: null,
        examinedate: null,
        cashier: null,
        paytime: null,
        bak: null,
        examineman: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        feetype: [
          { required: true, message: "费用类型不能为空", trigger: "change" }
        ],
        count: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        feeuse: [
          { required: true, message: "费用使用不能为空", trigger: "blur" }
        ],
        applydate: [
          { required: true, message: "申请日期不能为空", trigger: "blur" }
        ],
        clientname: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        reimburseman: [
          { required: true, message: "偿还人不能为空", trigger: "blur" }
        ],
        recorder: [
          { required: true, message: "记录者不能为空", trigger: "blur" }
        ],
        isexamine: [
          { required: true, message: "是否审核不能为空", trigger: "blur" }
        ],
        examinedate: [
          { required: true, message: "审核日期不能为空", trigger: "blur" }
        ],
        cashier: [
          { required: true, message: "出纳人不能为空", trigger: "blur" }
        ],
        paytime: [
          { required: true, message: "支付时间不能为空", trigger: "blur" }
        ],
        bak: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        examineman: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询费用申请列表 */
    getList() {
      this.loading = true;
      listFeiyongsq(this.queryParams).then(response => {
        this.feiyongsqList = response.rows;
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
        feetype: null,
        count: null,
        feeuse: null,
        applydate: null,
        clientname: null,
        reimburseman: null,
        recorder: null,
        isexamine: null,
        examinedate: null,
        cashier: null,
        paytime: null,
        bak: null,
        examineman: null,
        createtime: null
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
      this.title = "添加费用申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFeiyongsq(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改费用申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFeiyongsq(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeiyongsq(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除费用申请编号为"' + ids + '"的数据项？').then(function() {
        return delFeiyongsq(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-buy/feiyongsq/export', {
        ...this.queryParams
      }, `feiyongsq_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
