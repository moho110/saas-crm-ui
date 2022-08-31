<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="奖惩名称" prop="punishmentname">
        <el-input
          v-model="queryParams.punishmentname"
          placeholder="请输入奖惩名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批准人" prop="approvalman">
        <el-input
          v-model="queryParams.approvalman"
          placeholder="请输入批准人"
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
          v-hasPermi="['crm-hr:punishment:add']"
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
          v-hasPermi="['crm-hr:punishment:edit']"
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
          v-hasPermi="['crm-hr:punishment:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:punishment:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="punishmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="工作ID" align="center" prop="workid" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="部门" align="center" prop="indepartment" />
      <el-table-column label="奖惩名称" align="center" prop="punishmentname" />
      <el-table-column label="批准人" align="center" prop="approvalman" />
      <el-table-column label="批准时间" align="center" prop="approvaltime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.approvaltime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
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
            v-hasPermi="['crm-hr:punishment:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:punishment:remove']"
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

    <!-- 添加或修改人员奖惩对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="类型" prop="type">
          <el-radio v-model="form.type" label="1">特殊</el-radio>
          <el-radio v-model="form.type" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="form.status" label="1">特殊</el-radio>
          <el-radio v-model="form.status" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="工作ID" prop="workid">
          <el-input v-model="form.workid" placeholder="请输入工作ID" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="部门" prop="indepartment">
          <el-input v-model="form.indepartment" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="奖惩名称" prop="punishmentname">
          <el-input v-model="form.punishmentname" placeholder="请输入奖惩名称" />
        </el-form-item>
        <el-form-item label="奖惩理由" prop="punishmentreason">
          <el-input v-model="form.punishmentreason" placeholder="请输入奖惩理由" />
        </el-form-item>
        <el-form-item label="奖惩内容">
          <editor v-model="form.punishmentcontent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="批准部门" prop="approvaldep">
          <el-input v-model="form.approvaldep" placeholder="请输入批准部门" />
        </el-form-item>
        <el-form-item label="批准人" prop="approvalman">
          <el-input v-model="form.approvalman" placeholder="请输入批准人" />
        </el-form-item>
        <el-form-item label="批准时间" prop="approvaltime">
          <el-date-picker clearable
            v-model="form.approvaltime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择批准时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生效日期" prop="shengxiaobydate">
          <el-date-picker clearable
            v-model="form.shengxiaobydate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择生效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="取消时间" prop="canceltime">
          <el-input v-model="form.canceltime" placeholder="请输入取消时间" />
        </el-form-item>
        <el-form-item label="取消理由" prop="cancelreason">
          <el-input v-model="form.cancelreason" placeholder="请输入取消理由" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
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
import { listPunishment, getPunishment, delPunishment, addPunishment, updatePunishment } from "@/api/crm-hr/punishment";

export default {
  name: "Punishment",
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
      // 人员奖惩表格数据
      punishmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        status: null,
        workid: null,
        name: null,
        indepartment: null,
        punishmentname: null,
        punishmentreason: null,
        punishmentcontent: null,
        approvaldep: null,
        approvalman: null,
        approvaltime: null,
        shengxiaobydate: null,
        memo: null,
        canceltime: null,
        cancelreason: null,
        creator: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        workid: [
          { required: true, message: "工作ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        indepartment: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        punishmentname: [
          { required: true, message: "奖惩名称不能为空", trigger: "blur" }
        ],
        punishmentreason: [
          { required: true, message: "奖惩理由不能为空", trigger: "blur" }
        ],
        punishmentcontent: [
          { required: true, message: "奖惩内容不能为空", trigger: "blur" }
        ],
        approvaldep: [
          { required: true, message: "批准部门不能为空", trigger: "blur" }
        ],
        approvalman: [
          { required: true, message: "批准人不能为空", trigger: "blur" }
        ],
        approvaltime: [
          { required: true, message: "批准时间不能为空", trigger: "blur" }
        ],
        shengxiaobydate: [
          { required: true, message: "生效日期不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        canceltime: [
          { required: true, message: "取消时间不能为空", trigger: "blur" }
        ],
        cancelreason: [
          { required: true, message: "取消理由不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
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
    /** 查询人员奖惩列表 */
    getList() {
      this.loading = true;
      listPunishment(this.queryParams).then(response => {
        this.punishmentList = response.rows;
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
        type: null,
        status: "0",
        workid: null,
        name: null,
        indepartment: null,
        punishmentname: null,
        punishmentreason: null,
        punishmentcontent: null,
        approvaldep: null,
        approvalman: null,
        approvaltime: null,
        shengxiaobydate: null,
        memo: null,
        canceltime: null,
        cancelreason: null,
        creator: null,
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
      this.title = "添加人员奖惩";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPunishment(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改人员奖惩";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePunishment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPunishment(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除人员奖惩编号为"' + ids + '"的数据项？').then(function() {
        return delPunishment(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/punishment/export', {
        ...this.queryParams
      }, `punishment_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
