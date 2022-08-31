<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="资产名称" prop="setname">
        <el-input
          v-model="queryParams.setname"
          placeholder="请输入资产名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产编号" prop="setno">
        <el-input
          v-model="queryParams.setno"
          placeholder="请输入资产编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门" prop="indepartment">
        <el-input
          v-model="queryParams.indepartment"
          placeholder="请输入部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借领条件" prop="jielingcondition">
        <el-input
          v-model="queryParams.jielingcondition"
          placeholder="请输入借领条件"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="借领人" prop="jielingman">
        <el-input
          v-model="queryParams.jielingman"
          placeholder="请输入借领人"
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
          v-hasPermi="['crm-political:fixedassetout:add']"
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
          v-hasPermi="['crm-political:fixedassetout:edit']"
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
          v-hasPermi="['crm-political:fixedassetout:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:fixedassetout:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fixedassetoutList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="资产名称" align="center" prop="setname" />
      <el-table-column label="资产编号" align="center" prop="setno" />
      <el-table-column label="部门" align="center" prop="indepartment" />
      <el-table-column label="借领条件" align="center" prop="jielingcondition" />
      <el-table-column label="借领人" align="center" prop="jielingman" />
      <el-table-column label="批准人" align="center" prop="approvalman" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
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
            v-hasPermi="['crm-political:fixedassetout:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:fixedassetout:remove']"
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

    <!-- 添加或修改固定资产出库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="资产名称" prop="setname">
          <el-input v-model="form.setname" placeholder="请输入资产名称" />
        </el-form-item>
        <el-form-item label="资产编号" prop="setno">
          <el-input v-model="form.setno" placeholder="请输入资产编号" />
        </el-form-item>
        <el-form-item label="部门" prop="indepartment">
          <el-input v-model="form.indepartment" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="借领条件" prop="jielingcondition">
          <el-input v-model="form.jielingcondition" placeholder="请输入借领条件" />
        </el-form-item>
        <el-form-item label="借领人" prop="jielingman">
          <el-input v-model="form.jielingman" placeholder="请输入借领人" />
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
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="金额" prop="count">
          <el-input v-model="form.count" placeholder="请输入金额" />
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
import { listFixedassetout, getFixedassetout, delFixedassetout, addFixedassetout, updateFixedassetout } from "@/api/crm-political/fixedassetout";

export default {
  name: "Fixedassetout",
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
      // 固定资产出库表格数据
      fixedassetoutList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        setname: null,
        setno: null,
        indepartment: null,
        jielingcondition: null,
        jielingman: null,
        approvalman: null,
        memo: null,
        creator: null,
        createtime: null,
        price: null,
        quantity: null,
        count: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        setname: [
          { required: true, message: "资产名称不能为空", trigger: "blur" }
        ],
        setno: [
          { required: true, message: "资产编号不能为空", trigger: "blur" }
        ],
        indepartment: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        jielingcondition: [
          { required: true, message: "借领条件不能为空", trigger: "blur" }
        ],
        jielingman: [
          { required: true, message: "借领人不能为空", trigger: "blur" }
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
        createtime: [
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
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询固定资产出库列表 */
    getList() {
      this.loading = true;
      listFixedassetout(this.queryParams).then(response => {
        this.fixedassetoutList = response.rows;
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
        setname: null,
        setno: null,
        indepartment: null,
        jielingcondition: null,
        jielingman: null,
        approvalman: null,
        memo: null,
        creator: null,
        createtime: null,
        price: null,
        quantity: null,
        count: null
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
      this.title = "添加固定资产出库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFixedassetout(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改固定资产出库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFixedassetout(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFixedassetout(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除固定资产出库编号为"' + ids + '"的数据项？').then(function() {
        return delFixedassetout(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/fixedassetout/export', {
        ...this.queryParams
      }, `fixedassetout_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
