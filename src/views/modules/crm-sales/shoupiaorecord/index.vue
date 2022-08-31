<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="票据金额" prop="piaojujine">
        <el-input
          v-model="queryParams.piaojujine"
          placeholder="请输入票据金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发票编号" prop="fapiaono">
        <el-input
          v-model="queryParams.fapiaono"
          placeholder="请输入发票编号"
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
          v-hasPermi="['crm-sales:shoupiaorecord:add']"
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
          v-hasPermi="['crm-sales:shoupiaorecord:edit']"
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
          v-hasPermi="['crm-sales:shoupiaorecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:shoupiaorecord:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="shoupiaorecordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="供应商ID" align="center" prop="supplyid" />
      <el-table-column label="采购清单ID" align="center" prop="caigoubillid" />
      <el-table-column label="开票内容" align="center" prop="kaipiaoneirong" />
      <el-table-column label="票据类型" align="center" prop="piaojutype" />
      <el-table-column label="票据金额" align="center" prop="piaojujine" />
      <el-table-column label="发票编号" align="center" prop="fapiaono" />
      <el-table-column label="开票日期" align="center" prop="kaipiaodate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.kaipiaodate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期次" align="center" prop="qici" />
      <el-table-column label="开票人" align="center" prop="kaipiaoren" />
      <el-table-column label="是否汇款" align="center" prop="ifhuikuan" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-sales:shoupiaorecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:shoupiaorecord:remove']"
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

    <!-- 添加或修改收票记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="供应商ID" prop="supplyid">
          <el-input v-model="form.supplyid" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="采购清单ID" prop="caigoubillid">
          <el-input v-model="form.caigoubillid" placeholder="请输入采购清单ID" />
        </el-form-item>
        <el-form-item label="开票内容" prop="kaipiaoneirong">
          <el-input v-model="form.kaipiaoneirong" placeholder="请输入开票内容" />
        </el-form-item>
        <el-form-item label="票据类型" prop="piaojutype">
          <el-radio v-model="form.piaojutype" label="1">特殊</el-radio>
          <el-radio v-model="form.piaojutype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="票据金额" prop="piaojujine">
          <el-input v-model="form.piaojujine" placeholder="请输入票据金额" />
        </el-form-item>
        <el-form-item label="发票编号" prop="fapiaono">
          <el-input v-model="form.fapiaono" placeholder="请输入发票编号" />
        </el-form-item>
        <el-form-item label="开票日期" prop="kaipiaodate">
          <el-date-picker clearable
            v-model="form.kaipiaodate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期次" prop="qici">
          <el-input v-model="form.qici" placeholder="请输入期次" />
        </el-form-item>
        <el-form-item label="开票人" prop="kaipiaoren">
          <el-input v-model="form.kaipiaoren" placeholder="请输入开票人" />
        </el-form-item>
        <el-form-item label="是否汇款" prop="ifhuikuan">
          <el-radio v-model="form.piaojutype" label="1">是</el-radio>
          <el-radio v-model="form.piaojutype" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="汇款ID" prop="huikuanid">
          <el-input v-model="form.huikuanid" placeholder="请输入汇款ID" />
        </el-form-item>
        <el-form-item label="备注" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
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
import { listShoupiaorecord, getShoupiaorecord, delShoupiaorecord, addShoupiaorecord, updateShoupiaorecord } from "@/api/crm-sales/shoupiaorecord";

export default {
  name: "Shoupiaorecord",
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
      // 收票记录表格数据
      shoupiaorecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplyid: null,
        caigoubillid: null,
        kaipiaoneirong: null,
        piaojutype: null,
        piaojujine: null,
        fapiaono: null,
        kaipiaodate: null,
        qici: null,
        kaipiaoren: null,
        ifhuikuan: null,
        huikuanid: null,
        beizhu: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        supplyid: [
          { required: true, message: "供应商ID不能为空", trigger: "blur" }
        ],
        caigoubillid: [
          { required: true, message: "采购清单ID不能为空", trigger: "blur" }
        ],
        kaipiaoneirong: [
          { required: true, message: "开票内容不能为空", trigger: "blur" }
        ],
        piaojutype: [
          { required: true, message: "票据类型不能为空", trigger: "change" }
        ],
        piaojujine: [
          { required: true, message: "票据金额不能为空", trigger: "blur" }
        ],
        fapiaono: [
          { required: true, message: "发票编号不能为空", trigger: "blur" }
        ],
        kaipiaodate: [
          { required: true, message: "开票日期不能为空", trigger: "blur" }
        ],
        qici: [
          { required: true, message: "期次不能为空", trigger: "blur" }
        ],
        kaipiaoren: [
          { required: true, message: "开票人不能为空", trigger: "blur" }
        ],
        ifhuikuan: [
          { required: true, message: "是否汇款不能为空", trigger: "blur" }
        ],
        huikuanid: [
          { required: true, message: "汇款ID不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "备注不能为空", trigger: "blur" }
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
    /** 查询收票记录列表 */
    getList() {
      this.loading = true;
      listShoupiaorecord(this.queryParams).then(response => {
        this.shoupiaorecordList = response.rows;
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
        supplyid: null,
        caigoubillid: null,
        kaipiaoneirong: null,
        piaojutype: null,
        piaojujine: null,
        fapiaono: null,
        kaipiaodate: null,
        qici: null,
        kaipiaoren: null,
        ifhuikuan: null,
        huikuanid: null,
        beizhu: null,
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
      this.title = "添加收票记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getShoupiaorecord(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收票记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateShoupiaorecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addShoupiaorecord(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除收票记录编号为"' + ids + '"的数据项？').then(function() {
        return delShoupiaorecord(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/shoupiaorecord/export', {
        ...this.queryParams
      }, `shoupiaorecord_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
