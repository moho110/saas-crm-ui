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
          v-hasPermi="['crm-store:stockinmain:add']"
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
          v-hasPermi="['crm-store:stockinmain:edit']"
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
          v-hasPermi="['crm-store:stockinmain:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-store:stockinmain:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stockinmainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主题" align="center" prop="zhuti" />
      <el-table-column label="库存ID" align="center" prop="storeid" />
      <el-table-column label="入库日期" align="center" prop="indate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.indate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createman" />
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
            v-hasPermi="['crm-store:stockinmain:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-store:stockinmain:remove']"
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

    <!-- 添加或修改仓库管理入库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="主题" prop="zhuti">
          <el-input v-model="form.zhuti" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="库存ID" prop="storeid">
          <el-input v-model="form.storeid" placeholder="请输入库存ID" />
        </el-form-item>
        <el-form-item label="入库日期" prop="indate">
          <el-date-picker clearable
            v-model="form.indate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createtime">
          <el-date-picker clearable
            v-model="form.createtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="采购清单ID" prop="caigoubillid">
          <el-input v-model="form.caigoubillid" placeholder="请输入采购清单ID" />
        </el-form-item>
        <el-form-item label="退货清单ID" prop="tuihuobillid">
          <el-input v-model="form.tuihuobillid" placeholder="请输入退货清单ID" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="form.state" label="1">特殊</el-radio>
          <el-radio v-model="form.state" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="备用一" prop="beiyong1">
          <el-input v-model="form.beiyong1" placeholder="请输入备用一" />
        </el-form-item>
        <el-form-item label="备用二" prop="beiyong2">
          <el-input v-model="form.beiyong2" placeholder="请输入备用二" />
        </el-form-item>
        <el-form-item label="备用三" prop="beiyong3">
          <el-input v-model="form.beiyong3" placeholder="请输入备用三" />
        </el-form-item>
        <el-form-item label="总数量" prop="totalnum">
          <el-input v-model="form.totalnum" placeholder="请输入总数量" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalmoney">
          <el-input v-model="form.totalmoney" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="入库审核" prop="instoreshenhe">
          <el-radio v-model="form.instoreshenhe" label="1">是</el-radio>
          <el-radio v-model="form.instoreshenhe" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="入库类型" prop="intype">
          <el-radio v-model="form.intype" label="1">特殊</el-radio>
          <el-radio v-model="form.intype" label="0">一般</el-radio>
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
import { listStockinmain, getStockinmain, delStockinmain, addStockinmain, updateStockinmain } from "@/api/crm-store/stockinmain";

export default {
  name: "Stockinmain",
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
      // 仓库管理入库表格数据
      stockinmainList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        zhuti: null,
        storeid: null,
        indate: null,
        createman: null,
        createtime: null,
        caigoubillid: null,
        tuihuobillid: null,
        memo: null,
        state: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null,
        totalnum: null,
        totalmoney: null,
        instoreshenhe: null,
        intype: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        zhuti: [
          { required: true, message: "主题不能为空", trigger: "blur" }
        ],
        storeid: [
          { required: true, message: "库存ID不能为空", trigger: "blur" }
        ],
        indate: [
          { required: true, message: "入库日期不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建日期不能为空", trigger: "blur" }
        ],
        caigoubillid: [
          { required: true, message: "采购清单ID不能为空", trigger: "blur" }
        ],
        tuihuobillid: [
          { required: true, message: "退货清单ID不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        beiyong1: [
          { required: true, message: "备用一不能为空", trigger: "blur" }
        ],
        beiyong2: [
          { required: true, message: "备用二不能为空", trigger: "blur" }
        ],
        beiyong3: [
          { required: true, message: "备用三不能为空", trigger: "blur" }
        ],
        totalnum: [
          { required: true, message: "总数量不能为空", trigger: "blur" }
        ],
        totalmoney: [
          { required: true, message: "总金额不能为空", trigger: "blur" }
        ],
        instoreshenhe: [
          { required: true, message: "入库审核不能为空", trigger: "blur" }
        ],
        intype: [
          { required: true, message: "入库类型不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询仓库管理入库列表 */
    getList() {
      this.loading = true;
      listStockinmain(this.queryParams).then(response => {
        this.stockinmainList = response.rows;
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
        storeid: null,
        indate: null,
        createman: null,
        createtime: null,
        caigoubillid: null,
        tuihuobillid: null,
        memo: null,
        state: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null,
        totalnum: null,
        totalmoney: null,
        instoreshenhe: null,
        intype: null
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
      this.title = "添加仓库管理入库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStockinmain(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改仓库管理入库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStockinmain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStockinmain(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除仓库管理入库编号为"' + ids + '"的数据项？').then(function() {
        return delStockinmain(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-store/stockinmain/export', {
        ...this.queryParams
      }, `stockinmain_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
