<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="部门" prop="department">
        <el-input
          v-model="queryParams.department"
          placeholder="请输入部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调休审核人" prop="tiaoxiuexman">
        <el-input
          v-model="queryParams.tiaoxiuexman"
          placeholder="请输入调休审核人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补班审核人" prop="bubanexman">
        <el-input
          v-model="queryParams.bubanexman"
          placeholder="请输入补班审核人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员名称" prop="personname">
        <el-input
          v-model="queryParams.personname"
          placeholder="请输入人员名称"
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
          v-hasPermi="['crm-hr:tiaoxiububan:add']"
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
          v-hasPermi="['crm-hr:tiaoxiububan:edit']"
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
          v-hasPermi="['crm-hr:tiaoxiububan:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:tiaoxiububan:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tiaoxiububanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款" align="center" prop="term" />
      <el-table-column label="部门" align="center" prop="department" />
      <el-table-column label="工作人员" align="center" prop="person" />
      <el-table-column label="调休时间" align="center" prop="tiaoxiutime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.tiaoxiutime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调休开始" align="center" prop="tiaoxiustart" />
      <el-table-column label="补班时间" align="center" prop="bubantime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bubantime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补班开始" align="center" prop="bubanstart" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:tiaoxiububan:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:tiaoxiububan:remove']"
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

    <!-- 添加或修改行政调休补班对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款" prop="term">
          <el-input v-model="form.term" placeholder="请输入条款" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="工作人员" prop="person">
          <el-input v-model="form.person" placeholder="请输入工作人员" />
        </el-form-item>
        <el-form-item label="补休时间" prop="tiaoxiutime">
          <el-date-picker clearable
            v-model="form.tiaoxiutime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择补休时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调休开始" prop="tiaoxiustart">
          <el-input v-model="form.tiaoxiustart" placeholder="请输入调休开始" />
        </el-form-item>
        <el-form-item label="补班时间" prop="bubantime">
          <el-date-picker clearable
            v-model="form.bubantime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择补班时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="补班开始" prop="bubanstart">
          <el-input v-model="form.bubanstart" placeholder="请输入补班开始" />
        </el-form-item>
        <el-form-item label="调休工作流ID" prop="tiaoxiuworkflowid">
          <el-input v-model="form.tiaoxiuworkflowid" placeholder="请输入调休工作流ID" />
        </el-form-item>
        <el-form-item label="调休审核人" prop="tiaoxiuexman">
          <el-input v-model="form.tiaoxiuexman" placeholder="请输入调休审核人" />
        </el-form-item>
        <el-form-item label="调休审核时间" prop="tiaoxiuextime">
          <el-input v-model="form.tiaoxiuextime" placeholder="请输入调休审核时间" />
        </el-form-item>
        <el-form-item label="调休审核状态" prop="tiaoxiuExStatus">
          <el-radio v-model="form.tiaoxiuExStatus" label="1">通过</el-radio>
          <el-radio v-model="form.tiaoxiuExStatus" label="0">未通过</el-radio>
        </el-form-item>
        <el-form-item label="补班审核状态" prop="bubanExStatus">
          <el-radio v-model="form.bubanExStatus" label="1">通过</el-radio>
          <el-radio v-model="form.bubanExStatus" label="0">未通过</el-radio>
        </el-form-item>
        <el-form-item label="补班工作流ID" prop="bubanworkflowid">
          <el-input v-model="form.bubanworkflowid" placeholder="请输入补班工作流ID" />
        </el-form-item>
        <el-form-item label="补班审核人" prop="bubanexman">
          <el-input v-model="form.bubanexman" placeholder="请输入补班审核人" />
        </el-form-item>
        <el-form-item label="补班审核时间" prop="bubanextime">
          <el-date-picker clearable
            v-model="form.bubanextime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择补班审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作人员" prop="personname">
          <el-input v-model="form.personname" placeholder="请输入工作人员" />
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
import { listTiaoxiububan, getTiaoxiububan, delTiaoxiububan, addTiaoxiububan, updateTiaoxiububan } from "@/api/crm-hr/tiaoxiububan";

export default {
  name: "Tiaoxiububan",
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
      // 行政调休补班表格数据
      tiaoxiububanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        term: null,
        department: null,
        person: null,
        tiaoxiutime: null,
        tiaoxiustart: null,
        bubantime: null,
        bubanstart: null,
        tiaoxiuexstatus: null,
        tiaoxiuworkflowid: null,
        tiaoxiuexman: null,
        tiaoxiuextime: null,
        bubanexstatus: null,
        bubanworkflowid: null,
        bubanexman: null,
        bubanextime: null,
        personname: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        term: [
          { required: true, message: "条款不能为空", trigger: "blur" }
        ],
        department: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        person: [
          { required: true, message: "工作人员不能为空", trigger: "blur" }
        ],
        tiaoxiutime: [
          { required: true, message: "调休时间不能为空", trigger: "blur" }
        ],
        tiaoxiustart: [
          { required: true, message: "调休开始不能为空", trigger: "blur" }
        ],
        bubantime: [
          { required: true, message: "补班时间不能为空", trigger: "blur" }
        ],
        bubanstart: [
          { required: true, message: "补班开始不能为空", trigger: "blur" }
        ],
        tiaoxiuexstatus: [
          { required: true, message: "调休审核状态不能为空", trigger: "blur" }
        ],
        tiaoxiuworkflowid: [
          { required: true, message: "调休工作流ID不能为空", trigger: "blur" }
        ],
        tiaoxiuexman: [
          { required: true, message: "调休审核人不能为空", trigger: "blur" }
        ],
        tiaoxiuextime: [
          { required: true, message: "调休审核时间不能为空", trigger: "blur" }
        ],
        bubanexstatus: [
          { required: true, message: "补班审核状态不能为空", trigger: "blur" }
        ],
        bubanworkflowid: [
          { required: true, message: "补班工作流ID不能为空", trigger: "blur" }
        ],
        bubanexman: [
          { required: true, message: "补班审核人不能为空", trigger: "blur" }
        ],
        bubanextime: [
          { required: true, message: "补班审核时间不能为空", trigger: "blur" }
        ],
        personname: [
          { required: true, message: "工作人员不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政调休补班列表 */
    getList() {
      this.loading = true;
      listTiaoxiububan(this.queryParams).then(response => {
        this.tiaoxiububanList = response.rows;
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
        term: null,
        department: null,
        person: null,
        tiaoxiutime: null,
        tiaoxiustart: null,
        bubantime: null,
        bubanstart: null,
        tiaoxiuexstatus: 0,
        tiaoxiuworkflowid: null,
        tiaoxiuexman: null,
        tiaoxiuextime: null,
        bubanexstatus: 0,
        bubanworkflowid: null,
        bubanexman: null,
        bubanextime: null,
        personname: null
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
      this.title = "添加行政调休补班";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTiaoxiububan(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政调休补班";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTiaoxiububan(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTiaoxiububan(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政调休补班编号为"' + ids + '"的数据项？').then(function() {
        return delTiaoxiububan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/tiaoxiububan/export', {
        ...this.queryParams
      }, `tiaoxiububan_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
