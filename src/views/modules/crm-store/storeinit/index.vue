<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
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
          v-hasPermi="['crm-store:storeinit:add']"
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
          v-hasPermi="['crm-store:storeinit:edit']"
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
          v-hasPermi="['crm-store:storeinit:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-store:storeinit:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="storeinitList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="产品ID" align="center" prop="prodid" />
      <el-table-column label="库存ID" align="center" prop="storeid" />
      <el-table-column label="产品价格" align="center" prop="price" />
      <el-table-column label="产品数量" align="center" prop="num" />
      <el-table-column label="产品金额" align="center" prop="jine" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-store:storeinit:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-store:storeinit:remove']"
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

    <!-- 添加或修改库存初始化对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="产品ID" prop="prodid">
          <el-input v-model="form.prodid" placeholder="请输入产品ID" />
        </el-form-item>
        <el-form-item label="库存ID" prop="storeid">
          <el-input v-model="form.storeid" placeholder="请输入库存ID" />
        </el-form-item>
        <el-form-item label="产品价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入产品价格" />
        </el-form-item>
        <el-form-item label="产品数量" prop="num">
          <el-input v-model="form.num" placeholder="请输入产品数量" />
        </el-form-item>
        <el-form-item label="产品金额" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入产品金额" />
        </el-form-item>
        <el-form-item label="产品备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入产品备注" />
        </el-form-item>
        <el-form-item label="产品标识" prop="flag">
          <el-radio v-model="form.flag" label="1">保留</el-radio>
          <el-radio v-model="form.flag" label="0">删除</el-radio>
        </el-form-item>
        <el-form-item label="产品名称" prop="prodname">
          <el-input v-model="form.prodname" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品规格" prop="guige">
          <el-input v-model="form.guige" placeholder="请输入产品规格" />
        </el-form-item>
        <el-form-item label="产品型号" prop="xinghao">
          <el-input v-model="form.xinghao" placeholder="请输入产品型号" />
        </el-form-item>
        <el-form-item label="产品单位" prop="danwei">
          <el-input v-model="form.danwei" placeholder="请输入产品单位" />
        </el-form-item>
        <el-form-item label="类型名称" prop="typename">
          <el-input v-model="form.typename" placeholder="请输入类型名称" />
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
import { listStoreinit, getStoreinit, delStoreinit, addStoreinit, updateStoreinit } from "@/api/crm-store/storeinit";

export default {
  name: "Storeinit",
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
      // 库存初始化表格数据
      storeinitList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prodid: null,
        storeid: null,
        price: null,
        num: null,
        jine: null,
        memo: null,
        flag: null,
        prodname: null,
        guige: null,
        xinghao: null,
        danwei: null,
        typename: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        prodid: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        storeid: [
          { required: true, message: "库存ID不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "产品价格不能为空", trigger: "blur" }
        ],
        num: [
          { required: true, message: "产品数量不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "产品金额不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "产品备注不能为空", trigger: "blur" }
        ],
        flag: [
          { required: true, message: "产品标识不能为空", trigger: "blur" }
        ],
        prodname: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        guige: [
          { required: true, message: "产品规格不能为空", trigger: "blur" }
        ],
        xinghao: [
          { required: true, message: "产品型号不能为空", trigger: "blur" }
        ],
        danwei: [
          { required: true, message: "产品单位不能为空", trigger: "blur" }
        ],
        typename: [
          { required: true, message: "类型名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询库存初始化列表 */
    getList() {
      this.loading = true;
      listStoreinit(this.queryParams).then(response => {
        this.storeinitList = response.rows;
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
        prodid: null,
        storeid: null,
        price: null,
        num: null,
        jine: null,
        memo: null,
        flag: null,
        prodname: null,
        guige: null,
        xinghao: null,
        danwei: null,
        typename: null
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
      this.title = "添加库存初始化";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStoreinit(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库存初始化";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStoreinit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStoreinit(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除库存初始化编号为"' + ids + '"的数据项？').then(function() {
        return delStoreinit(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-store/storeinit/export', {
        ...this.queryParams
      }, `storeinit_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
