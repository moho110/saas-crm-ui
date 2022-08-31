<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="银行代码" prop="bankcode">
        <el-input
          v-model="queryParams.bankcode"
          placeholder="请输入银行代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankname">
        <el-input
          v-model="queryParams.bankname"
          placeholder="请输入银行名称"
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
          v-hasPermi="['crm-basicdata:bank:add']"
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
          v-hasPermi="['crm-basicdata:bank:edit']"
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
          v-hasPermi="['crm-basicdata:bank:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:bank:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bankList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="银行ID" align="center" prop="bankid" />
      <el-table-column label="银行代码" align="center" prop="bankcode" />
      <el-table-column label="银行名称" align="center" prop="bankname" />
      <el-table-column label="系统锁定" align="center" prop="syslock" />
      <el-table-column label="金额" align="center" prop="jine" />
      <el-table-column label="归属" align="center" prop="belong" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:bank:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:bank:remove']"
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

    <!-- 添加或修改银行帐户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="银行ID" prop="bankid">
          <el-input v-model="form.bankid" placeholder="请输入银行ID" />
        </el-form-item>
        <el-form-item label="银行代码" prop="bankcode">
          <el-input v-model="form.bankcode" placeholder="请输入银行代码" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankname">
          <el-input v-model="form.bankname" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="是否系统锁定" prop="syslock">
          <el-radio v-model="form.syslock" label="1">是</el-radio>
          <el-radio v-model="form.syslock" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="归属" prop="belong">
          <el-input v-model="form.belong" placeholder="请输入归属" />
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
import { listBank, getBank, delBank, addBank, updateBank } from "@/api/crm-basicdata/bank";

export default {
  name: "Bank",
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
      // 银行帐户表格数据
      bankList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bankid: null,
        bankcode: null,
        bankname: null,
        syslock: null,
        jine: null,
        belong: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        bankid: [
          { required: true, message: "银行ID不能为空", trigger: "blur" }
        ],
        bankcode: [
          { required: true, message: "银行代码不能为空", trigger: "blur" }
        ],
        bankname: [
          { required: true, message: "银行名称不能为空", trigger: "blur" }
        ],
        syslock: [
          { required: true, message: "系统锁定不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        belong: [
          { required: true, message: "归属不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询银行帐户列表 */
    getList() {
      this.loading = true;
      listBank(this.queryParams).then(response => {
        this.bankList = response.rows;
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
        bankid: null,
        bankcode: null,
        bankname: null,
        syslock: null,
        jine: null,
        belong: null
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
      this.title = "添加银行帐户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBank(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改银行帐户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBank(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBank(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除银行帐户编号为"' + ids + '"的数据项？').then(function() {
        return delBank(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/bank/export', {
        ...this.queryParams
      }, `bank_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
