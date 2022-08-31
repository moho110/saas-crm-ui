<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主题" prop="zhuti">
        <el-input
          v-model="queryParams.zhuti"
          placeholder="请输入主题"
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
          v-hasPermi="['crm-store:stockchangemain:add']"
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
          v-hasPermi="['crm-store:stockchangemain:edit']"
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
          v-hasPermi="['crm-store:stockchangemain:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-store:stockchangemain:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stockchangemainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主题" align="center" prop="zhuti" />
      <el-table-column label="创建人" align="center" prop="createman" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库ID" align="center" prop="outstoreid" />
      <el-table-column label="入库ID" align="center" prop="instoreid" />
      <el-table-column label="状态" align="center" prop="state" />
      <el-table-column label="出库审核" align="center" prop="outstoreshenhe" />
      <el-table-column label="入库审核" align="center" prop="instoreshenhe" />
      <el-table-column label="出库审核时间" align="center" prop="outshenhetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outshenhetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库审核时间" align="center" prop="inshenhetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inshenhetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-store:stockchangemain:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-store:stockchangemain:remove']"
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

    <!-- 添加或修改仓库管理调拔对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="主题" prop="zhuti">
          <el-input v-model="form.zhuti" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="出库ID" prop="outstoreid">
          <el-input v-model="form.outstoreid" placeholder="请输入出库ID" />
        </el-form-item>
        <el-form-item label="入库ID" prop="instoreid">
          <el-input v-model="form.instoreid" placeholder="请输入入库ID" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="form.state" label="1">特殊</el-radio>
          <el-radio v-model="form.state" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="出库审核" prop="outstoreshenhe">
          <el-radio v-model="form.outstoreshenhe" label="1">是</el-radio>
          <el-radio v-model="form.outstoreshenhe" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="入库审核" prop="instoreshenhe">
          <el-radio v-model="form.instoreshenhe" label="1">是</el-radio>
          <el-radio v-model="form.instoreshenhe" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="出库审核时间" prop="outshenhetime">
          <el-date-picker clearable
            v-model="form.outshenhetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出库审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入库审核时间" prop="inshenhetime">
          <el-date-picker clearable
            v-model="form.inshenhetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入库审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalmoney">
          <el-input v-model="form.totalmoney" placeholder="请输入总金额" />
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
import { listStockchangemain, getStockchangemain, delStockchangemain, addStockchangemain, updateStockchangemain } from "@/api/crm-store/stockchangemain";

export default {
  name: "Stockchangemain",
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
      // 仓库管理调拔表格数据
      stockchangemainList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zhuti: null,
        createman: null,
        createtime: null,
        outstoreid: null,
        instoreid: null,
        state: null,
        outstoreshenhe: null,
        instoreshenhe: null,
        outshenhetime: null,
        inshenhetime: null,
        memo: null,
        totalmoney: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        zhuti: [
          { required: true, message: "主题不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        outstoreid: [
          { required: true, message: "出库ID不能为空", trigger: "blur" }
        ],
        instoreid: [
          { required: true, message: "入库ID不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        outstoreshenhe: [
          { required: true, message: "出库审核不能为空", trigger: "blur" }
        ],
        instoreshenhe: [
          { required: true, message: "入库审核不能为空", trigger: "blur" }
        ],
        outshenhetime: [
          { required: true, message: "出库审核时间不能为空", trigger: "blur" }
        ],
        inshenhetime: [
          { required: true, message: "入库审核时间不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        totalmoney: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询仓库管理调拔列表 */
    getList() {
      this.loading = true;
      listStockchangemain(this.queryParams).then(response => {
        this.stockchangemainList = response.rows;
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
        zhuti: null,
        createman: null,
        createtime: null,
        outstoreid: null,
        instoreid: null,
        state: null,
        outstoreshenhe: null,
        instoreshenhe: null,
        outshenhetime: null,
        inshenhetime: null,
        memo: null,
        totalmoney: null
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
      this.title = "添加仓库管理调拔";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStockchangemain(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改仓库管理调拔";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStockchangemain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStockchangemain(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除仓库管理调拔编号为"' + ids + '"的数据项？').then(function() {
        return delStockchangemain(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-store/stockchangemain/export', {
        ...this.queryParams
      }, `stockchangemain_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
