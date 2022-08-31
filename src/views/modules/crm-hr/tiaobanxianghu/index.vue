<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="原部门" prop="oridepartment">
        <el-input
          v-model="queryParams.oridepartment"
          placeholder="请输入原部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原工作人员" prop="oriperson">
        <el-input
          v-model="queryParams.oriperson"
          placeholder="请输入原工作人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新部门" prop="newdepartment">
        <el-input
          v-model="queryParams.newdepartment"
          placeholder="请输入新部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人" prop="exman">
        <el-input
          v-model="queryParams.exman"
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
          v-hasPermi="['crm-hr:tiaobanxianghu:add']"
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
          v-hasPermi="['crm-hr:tiaobanxianghu:edit']"
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
          v-hasPermi="['crm-hr:tiaobanxianghu:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:tiaobanxianghu:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tiaobanxianghuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款" align="center" prop="term" />
      <el-table-column label="原部门" align="center" prop="oridepartment" />
      <el-table-column label="原工作人员" align="center" prop="oriperson" />
      <el-table-column label="原开始时间" align="center" prop="oristarttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.oristarttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原开始" align="center" prop="oristart" />
      <el-table-column label="新部门" align="center" prop="newdepartment" />
      <el-table-column label="新开始时间" align="center" prop="newstarttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.newstarttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="exstatus" />
      <el-table-column label="工作ID" align="center" prop="workflowid" />
      <el-table-column label="审核人" align="center" prop="exman" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:tiaobanxianghu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:tiaobanxianghu:remove']"
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

    <!-- 添加或修改行政调班项目对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款" prop="term">
          <el-input v-model="form.term" placeholder="请输入条款" />
        </el-form-item>
        <el-form-item label="原部门" prop="oridepartment">
          <el-input v-model="form.oridepartment" placeholder="请输入原部门" />
        </el-form-item>
        <el-form-item label="原工作人员" prop="oriperson">
          <el-input v-model="form.oriperson" placeholder="请输入原工作人员" />
        </el-form-item>
        <el-form-item label="原开始时间" prop="oristarttime">
          <el-date-picker clearable
            v-model="form.oristarttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择原开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="原开始" prop="oristart">
          <el-input v-model="form.oristart" placeholder="请输入原开始" />
        </el-form-item>
        <el-form-item label="新部门" prop="newdepartment">
          <el-input v-model="form.newdepartment" placeholder="请输入新部门" />
        </el-form-item>
        <el-form-item label="新员工" prop="newcruit">
          <el-input v-model="form.newcruit" placeholder="请输入新员工" />
        </el-form-item>
        <el-form-item label="新开始时间" prop="newstarttime">
          <el-date-picker clearable
            v-model="form.newstarttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择新开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="新开始" prop="newstart">
          <el-input v-model="form.newstart" placeholder="请输入新开始" />
        </el-form-item>
        <el-form-item label="审核状态" prop="exStatus">
          <el-radio v-model="form.exStatus" label="1">通过</el-radio>
          <el-radio v-model="form.exStatus" label="0">未通过</el-radio>
        </el-form-item>
        <el-form-item label="工作ID" prop="workflowid">
          <el-input v-model="form.workflowid" placeholder="请输入工作ID" />
        </el-form-item>
        <el-form-item label="审核人" prop="exman">
          <el-input v-model="form.exman" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="extime">
          <el-input v-model="form.extime" placeholder="请输入审核时间" />
        </el-form-item>
        <el-form-item label="原工作人员名称 " prop="oripersonname">
          <el-input v-model="form.oripersonname" placeholder="请输入原工作人员名称 " />
        </el-form-item>
        <el-form-item label="新工作人员名称" prop="newpersonname">
          <el-input v-model="form.newpersonname" placeholder="请输入新工作人员名称" />
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
import { listTiaobanxianghu, getTiaobanxianghu, delTiaobanxianghu, addTiaobanxianghu, updateTiaobanxianghu } from "@/api/crm-hr/tiaobanxianghu";

export default {
  name: "Tiaobanxianghu",
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
      // 行政调班项目表格数据
      tiaobanxianghuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        term: null,
        oridepartment: null,
        oriperson: null,
        oristarttime: null,
        oristart: null,
        newdepartment: null,
        newcruit: null,
        newstarttime: null,
        newstart: null,
        exstatus: null,
        workflowid: null,
        exman: null,
        extime: null,
        oripersonname: null,
        newpersonname: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        term: [
          { required: true, message: "条款不能为空", trigger: "blur" }
        ],
        oridepartment: [
          { required: true, message: "原部门不能为空", trigger: "blur" }
        ],
        oriperson: [
          { required: true, message: "原工作人员不能为空", trigger: "blur" }
        ],
        oristarttime: [
          { required: true, message: "原开始时间不能为空", trigger: "blur" }
        ],
        oristart: [
          { required: true, message: "原开始不能为空", trigger: "blur" }
        ],
        newdepartment: [
          { required: true, message: "新部门不能为空", trigger: "blur" }
        ],
        newcruit: [
          { required: true, message: "新员工不能为空", trigger: "blur" }
        ],
        newstarttime: [
          { required: true, message: "新开始时间不能为空", trigger: "blur" }
        ],
        newstart: [
          { required: true, message: "新开始不能为空", trigger: "blur" }
        ],
        exstatus: [
          { required: true, message: "审核状态不能为空", trigger: "blur" }
        ],
        workflowid: [
          { required: true, message: "工作流ID不能为空", trigger: "blur" }
        ],
        exman: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        extime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        oripersonname: [
          { required: true, message: "原工作人员名称不能为空", trigger: "blur" }
        ],
        newpersonname: [
          { required: true, message: "新工作人员名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政调班项目列表 */
    getList() {
      this.loading = true;
      listTiaobanxianghu(this.queryParams).then(response => {
        this.tiaobanxianghuList = response.rows;
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
        oridepartment: null,
        oriperson: null,
        oristarttime: null,
        oristart: null,
        newdepartment: null,
        newcruit: null,
        newstarttime: null,
        newstart: null,
        exstatus: 0,
        workflowid: null,
        exman: null,
        extime: null,
        oripersonname: null,
        newpersonname: null
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
      this.title = "添加行政调班项目";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTiaobanxianghu(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政调班项目";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTiaobanxianghu(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTiaobanxianghu(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政调班项目编号为"' + ids + '"的数据项？').then(function() {
        return delTiaobanxianghu(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/tiaobanxianghu/export', {
        ...this.queryParams
      }, `tiaobanxianghu_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
