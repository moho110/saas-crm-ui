<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="单位名称" prop="unitName">
        <el-input
          v-model="queryParams.unitName"
          placeholder="请输入单位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入银行名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行编号" prop="bankNo">
        <el-input
          v-model="queryParams.bankNo"
          placeholder="请输入银行编号"
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
          v-hasPermi="['crm-basicdata:unit:add']"
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
          v-hasPermi="['crm-basicdata:unit:edit']"
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
          v-hasPermi="['crm-basicdata:unit:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:unit:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="unitList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="单位名称" align="center" prop="unitName" />
      <el-table-column label="电话号码" align="center" prop="telNo" />
      <el-table-column label="传真号码" align="center" prop="faxNo" />
      <el-table-column label="邮政编码" align="center" prop="postNo" />
      <el-table-column label="url地址" align="center" prop="url" />
      <el-table-column label="电子邮件" align="center" prop="email" />
      <el-table-column label="银行名称" align="center" prop="bankName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:unit:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:unit:remove']"
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

    <!-- 添加或修改单位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="form.unitName" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item label="电话号码" prop="telNo">
          <el-input v-model="form.telNo" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="传真号码" prop="faxNo">
          <el-input v-model="form.faxNo" placeholder="请输入传真号码" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="postNo">
          <el-input v-model="form.postNo" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="url地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入url地址" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="银行编号" prop="bankNo">
          <el-input v-model="form.bankNo" placeholder="请输入银行编号" />
        </el-form-item>
        <el-form-item label="numzero" prop="numzero">
          <el-input v-model="form.numzero" placeholder="请输入numzero" />
        </el-form-item>
        <el-form-item label="采购清单ID" prop="buybillid">
          <el-input v-model="form.buybillid" placeholder="请输入采购清单ID" />
        </el-form-item>
        <el-form-item label="销售清单ID" prop="sellbillid">
          <el-input v-model="form.sellbillid" placeholder="请输入销售清单ID" />
        </el-form-item>
        <el-form-item label="入库清单ID" prop="stockinbillid">
          <el-input v-model="form.stockinbillid" placeholder="请输入入库清单ID" />
        </el-form-item>
        <el-form-item label="出库清单ID" prop="stockoutbillid">
          <el-input v-model="form.stockoutbillid" placeholder="请输入出库清单ID" />
        </el-form-item>
        <el-form-item label="库存盘点清单ID" prop="storecheckbillid">
          <el-input v-model="form.storecheckbillid" placeholder="请输入库存盘点清单ID" />
        </el-form-item>
        <el-form-item label="库存调拨清单ID" prop="stockchangebillid">
          <el-input v-model="form.stockchangebillid" placeholder="请输入库存调拨清单ID" />
        </el-form-item>
        <el-form-item label="组装清单ID" prop="zuzhuangbillid">
          <el-input v-model="form.zuzhuangbillid" placeholder="请输入组装清单ID" />
        </el-form-item>
        <el-form-item label="费用清单ID" prop="feiyongbillid">
          <el-input v-model="form.feiyongbillid" placeholder="请输入费用清单ID" />
        </el-form-item>
        <el-form-item label="预支付清单ID" prop="prepaybillid">
          <el-input v-model="form.prepaybillid" placeholder="请输入预支付清单ID" />
        </el-form-item>
        <el-form-item label="预收款清单ID" prop="preshoubillid">
          <el-input v-model="form.preshoubillid" placeholder="请输入预收款清单ID" />
        </el-form-item>
        <el-form-item label="定价公式" prop="dingjiagongshi">
          <el-input v-model="form.dingjiagongshi" placeholder="请输入定价公式" />
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
import { listUnit, getUnit, delUnit, addUnit, updateUnit } from "@/api/crm-basicdata/unit";

export default {
  name: "Unit",
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
      // 单位表格数据
      unitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        unitName: null,
        telNo: null,
        faxNo: null,
        postNo: null,
        address: null,
        url: null,
        email: null,
        bankName: null,
        bankNo: null,
        numzero: null,
        buybillid: null,
        sellbillid: null,
        stockinbillid: null,
        stockoutbillid: null,
        storecheckbillid: null,
        stockchangebillid: null,
        zuzhuangbillid: null,
        feiyongbillid: null,
        prepaybillid: null,
        preshoubillid: null,
        dingjiagongshi: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        unitName: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        telNo: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        faxNo: [
          { required: true, message: "传真号码不能为空", trigger: "blur" }
        ],
        postNo: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        url: [
          { required: true, message: "url地址不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "电子邮件不能为空", trigger: "blur" }
        ],
        bankName: [
          { required: true, message: "银行名称不能为空", trigger: "blur" }
        ],
        bankNo: [
          { required: true, message: "银行编号不能为空", trigger: "blur" }
        ],
        numzero: [
          { required: true, message: "numzero不能为空", trigger: "blur" }
        ],
        buybillid: [
          { required: true, message: "采购清单ID不能为空", trigger: "blur" }
        ],
        sellbillid: [
          { required: true, message: "销售清单ID不能为空", trigger: "blur" }
        ],
        stockinbillid: [
          { required: true, message: "入库清单ID不能为空", trigger: "blur" }
        ],
        stockoutbillid: [
          { required: true, message: "出库清单ID不能为空", trigger: "blur" }
        ],
        storecheckbillid: [
          { required: true, message: "库存盘点清单ID不能为空", trigger: "blur" }
        ],
        stockchangebillid: [
          { required: true, message: "库存调拨清单ID不能为空", trigger: "blur" }
        ],
        zuzhuangbillid: [
          { required: true, message: "组装清单ID不能为空", trigger: "blur" }
        ],
        feiyongbillid: [
          { required: true, message: "费用清单ID不能为空", trigger: "blur" }
        ],
        prepaybillid: [
          { required: true, message: "预支付清单ID不能为空", trigger: "blur" }
        ],
        preshoubillid: [
          { required: true, message: "预收款清单ID不能为空", trigger: "blur" }
        ],
        dingjiagongshi: [
          { required: true, message: "定价公式不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询单位列表 */
    getList() {
      this.loading = true;
      listUnit(this.queryParams).then(response => {
        this.unitList = response.rows;
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
        unitName: null,
        telNo: null,
        faxNo: null,
        postNo: null,
        address: null,
        url: null,
        email: null,
        bankName: null,
        bankNo: null,
        numzero: null,
        buybillid: null,
        sellbillid: null,
        stockinbillid: null,
        stockoutbillid: null,
        storecheckbillid: null,
        stockchangebillid: null,
        zuzhuangbillid: null,
        feiyongbillid: null,
        prepaybillid: null,
        preshoubillid: null,
        dingjiagongshi: null
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
      this.title = "添加单位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUnit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单位";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUnit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUnit(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除单位编号为"' + ids + '"的数据项？').then(function() {
        return delUnit(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/unit/export', {
        ...this.queryParams
      }, `unit_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
