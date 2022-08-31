<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="固定资产名称" prop="setname">
        <el-input
          v-model="queryParams.setname"
          placeholder="请输入固定资产名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="固定资产编号" prop="setno">
        <el-input
          v-model="queryParams.setno"
          placeholder="请输入固定资产编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="固定资产编号" prop="setpichi">
        <el-input
          v-model="queryParams.setpichi"
          placeholder="请输入固定资产编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商" prop="supply">
        <el-input
          v-model="queryParams.supply"
          placeholder="请输入供应商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input
          v-model="queryParams.department"
          placeholder="请输入部门"
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
          v-hasPermi="['crm-political:fixedasset:add']"
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
          v-hasPermi="['crm-political:fixedasset:edit']"
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
          v-hasPermi="['crm-political:fixedasset:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:fixedasset:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fixedassetList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="固定资产名称" align="center" prop="setname" />
      <el-table-column label="固定资产编号" align="center" prop="setno" />
      <el-table-column label="固定资产批次" align="center" prop="setpichi" />
      <el-table-column label="固定资产类型" align="center" prop="settype" />
      <el-table-column label="数量" align="center" prop="quantity" />
      <el-table-column label="价格" align="center" prop="price" />
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
            v-hasPermi="['crm-political:fixedasset:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:fixedasset:remove']"
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

    <!-- 添加或修改固定资产对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="固定资产名称" prop="setname">
          <el-input v-model="form.setname" placeholder="请输入固定资产名称" />
        </el-form-item>
        <el-form-item label="固定资产编号" prop="setno">
          <el-input v-model="form.setno" placeholder="请输入固定资产编号" />
        </el-form-item>
        <el-form-item label="固定资产编号" prop="setType">
          <el-radio v-model="form.setno" label="1">特殊</el-radio>
          <el-radio v-model="form.setno" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="固定资产批次" prop="setpichi">
          <el-input v-model="form.setpichi" placeholder="请输入固定资产批次" />
        </el-form-item>
        <el-form-item label="购买ID" prop="purchaseid">
          <el-input v-model="form.purchaseid" placeholder="请输入购买ID" />
        </el-form-item>
        <el-form-item label="供应商" prop="supply">
          <el-input v-model="form.supply" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="人员" prop="person">
          <el-input v-model="form.person" placeholder="请输入人员" />
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-input v-model="form.size" placeholder="请输入尺寸" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="form.status" label="1">特殊</el-radio>
          <el-radio v-model="form.status" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="金额" prop="count">
          <el-input v-model="form.count" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="位置" prop="place">
          <el-input v-model="form.place" placeholder="请输入位置" />
        </el-form-item>
        <el-form-item label="购买日期" prop="purchasedate">
          <el-input v-model="form.purchasedate" placeholder="请输入购买日期" />
        </el-form-item>
        <el-form-item label="清单数量" prop="billnum">
          <el-input v-model="form.billnum" placeholder="请输入清单数量" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idnumber">
          <el-input v-model="form.idnumber" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="使用部门" prop="usedepartment">
          <el-input v-model="form.usedepartment" placeholder="请输入使用部门" />
        </el-form-item>
        <el-form-item label="使用方向" prop="usedirect">
          <el-input v-model="form.usedirect" placeholder="请输入使用方向" />
        </el-form-item>
        <el-form-item label="测试部门" prop="testdepartment">
          <el-input v-model="form.testdepartment" placeholder="请输入测试部门" />
        </el-form-item>
        <el-form-item label="责任人" prop="dutyman">
          <el-input v-model="form.dutyman" placeholder="请输入责任人" />
        </el-form-item>
        <el-form-item label="启用日期" prop="qiyongdate">
          <el-input v-model="form.qiyongdate" placeholder="请输入启用日期" />
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
import { listFixedasset, getFixedasset, delFixedasset, addFixedasset, updateFixedasset } from "@/api/crm-political/fixedasset";

export default {
  name: "Fixedasset",
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
      // 固定资产表格数据
      fixedassetList: [],
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
        setpichi: null,
        settype: null,
        purchaseid: null,
        supply: null,
        department: null,
        person: null,
        size: null,
        status: null,
        quantity: null,
        price: null,
        count: null,
        unit: null,
        place: null,
        purchasedate: null,
        billnum: null,
        idnumber: null,
        memo: null,
        creator: null,
        createtime: null,
        usedepartment: null,
        usedirect: null,
        testdepartment: null,
        dutyman: null,
        qiyongdate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        setname: [
          { required: true, message: "固定资产名称不能为空", trigger: "blur" }
        ],
        setno: [
          { required: true, message: "固定资产编号不能为空", trigger: "blur" }
        ],
        setpichi: [
          { required: true, message: "固定资产批次不能为空", trigger: "blur" }
        ],
        settype: [
          { required: true, message: "固定资产类型不能为空", trigger: "change" }
        ],
        purchaseid: [
          { required: true, message: "购买ID不能为空", trigger: "blur" }
        ],
        supply: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ],
        department: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        person: [
          { required: true, message: "人员不能为空", trigger: "blur" }
        ],
        size: [
          { required: true, message: "尺寸不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
        ],
        count: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        place: [
          { required: true, message: "位置不能为空", trigger: "blur" }
        ],
        purchasedate: [
          { required: true, message: "购买日期不能为空", trigger: "blur" }
        ],
        billnum: [
          { required: true, message: "清单数量不能为空", trigger: "blur" }
        ],
        idnumber: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
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
        usedepartment: [
          { required: true, message: "使用部门不能为空", trigger: "blur" }
        ],
        usedirect: [
          { required: true, message: "使用方向不能为空", trigger: "blur" }
        ],
        testdepartment: [
          { required: true, message: "测试部门不能为空", trigger: "blur" }
        ],
        dutyman: [
          { required: true, message: "责任人不能为空", trigger: "blur" }
        ],
        qiyongdate: [
          { required: true, message: "启用日期不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询固定资产列表 */
    getList() {
      this.loading = true;
      listFixedasset(this.queryParams).then(response => {
        this.fixedassetList = response.rows;
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
        setpichi: null,
        settype: null,
        purchaseid: null,
        supply: null,
        department: null,
        person: null,
        size: null,
        status: "0",
        quantity: null,
        price: null,
        count: null,
        unit: null,
        place: null,
        purchasedate: null,
        billnum: null,
        idnumber: null,
        memo: null,
        creator: null,
        createtime: null,
        usedepartment: null,
        usedirect: null,
        testdepartment: null,
        dutyman: null,
        qiyongdate: null
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
      this.title = "添加固定资产";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFixedasset(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改固定资产";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFixedasset(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFixedasset(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除固定资产编号为"' + ids + '"的数据项？').then(function() {
        return delFixedasset(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/fixedasset/export', {
        ...this.queryParams
      }, `fixedasset_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
