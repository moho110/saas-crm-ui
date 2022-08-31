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
      <el-form-item label="职员" prop="staffman">
        <el-input
          v-model="queryParams.staffman"
          placeholder="请输入职员"
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
          v-hasPermi="['crm-hr:hrtransfer:add']"
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
          v-hasPermi="['crm-hr:hrtransfer:edit']"
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
          v-hasPermi="['crm-hr:hrtransfer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:hrtransfer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="hrtransferList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="工作ID" align="center" prop="workid" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="转职日期" align="center" prop="transferdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.transferdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center" prop="indepartment" />
      <el-table-column label="转职后部门" align="center" prop="afterdep" />
      <el-table-column label="转职前职位" align="center" prop="beforestaff" />
      <el-table-column label="转职后职位" align="center" prop="afterstaff" />
      <el-table-column label="转职前岗位" align="center" prop="beforegangwei" />
      <el-table-column label="转职后岗位" align="center" prop="aftergangwei" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:hrtransfer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:hrtransfer:remove']"
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

    <!-- 添加或修改转职明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="工作ID" prop="workid">
          <el-input v-model="form.workid" placeholder="请输入工作ID" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="转职日期" prop="transferdate">
          <el-date-picker clearable
            v-model="form.transferdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择转职日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门" prop="indepartment">
          <el-input v-model="form.indepartment" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="转职后部门" prop="afterdep">
          <el-input v-model="form.afterdep" placeholder="请输入转职后部门" />
        </el-form-item>
        <el-form-item label="转职前职位" prop="beforestaff">
          <el-input v-model="form.beforestaff" placeholder="请输入转职前职位" />
        </el-form-item>
        <el-form-item label="转职后职位" prop="afterstaff">
          <el-input v-model="form.afterstaff" placeholder="请输入转职后职位" />
        </el-form-item>
        <el-form-item label="转职前岗位" prop="beforegangwei">
          <el-input v-model="form.beforegangwei" placeholder="请输入转职前岗位" />
        </el-form-item>
        <el-form-item label="转职后岗位" prop="aftergangwei">
          <el-input v-model="form.aftergangwei" placeholder="请输入转职后岗位" />
        </el-form-item>
        <el-form-item label="转职理由" prop="transferreason">
          <el-input v-model="form.transferreason" placeholder="请输入转职理由" />
        </el-form-item>
        <el-form-item label="职员" prop="staffman">
          <el-input v-model="form.staffman" placeholder="请输入职员" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="转职类型" prop="transferType">
          <el-radio v-model="form.transferType" label="1">特殊</el-radio>
          <el-radio v-model="form.transferType" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="工作场合" prop="jobssituation">
          <el-input v-model="form.jobssituation" placeholder="请输入工作场合" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="creattime">
          <el-date-picker clearable
            v-model="form.creattime"
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
import { listHrtransfer, getHrtransfer, delHrtransfer, addHrtransfer, updateHrtransfer } from "@/api/crm-hr/hrtransfer";

export default {
  name: "Hrtransfer",
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
      // 转职明细表格数据
      hrtransferList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        workid: null,
        name: null,
        transferdate: null,
        indepartment: null,
        afterdep: null,
        beforestaff: null,
        afterstaff: null,
        beforegangwei: null,
        aftergangwei: null,
        transferreason: null,
        staffman: null,
        memo: null,
        jobssituation: null,
        transfertype: null,
        creator: null,
        creattime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        workid: [
          { required: true, message: "工作ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        transferdate: [
          { required: true, message: "转职日期不能为空", trigger: "blur" }
        ],
        indepartment: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        afterdep: [
          { required: true, message: "转职后部门不能为空", trigger: "blur" }
        ],
        beforestaff: [
          { required: true, message: "转职前职位不能为空", trigger: "blur" }
        ],
        afterstaff: [
          { required: true, message: "转职后职位不能为空", trigger: "blur" }
        ],
        beforegangwei: [
          { required: true, message: "转职前岗位不能为空", trigger: "blur" }
        ],
        aftergangwei: [
          { required: true, message: "转职后岗位不能为空", trigger: "blur" }
        ],
        transferreason: [
          { required: true, message: "转职前理由不能为空", trigger: "blur" }
        ],
        staffman: [
          { required: true, message: "职员不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        jobssituation: [
          { required: true, message: "职位场合不能为空", trigger: "blur" }
        ],
        transfertype: [
          { required: true, message: "转职类型不能为空", trigger: "change" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        creattime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询转职明细列表 */
    getList() {
      this.loading = true;
      listHrtransfer(this.queryParams).then(response => {
        this.hrtransferList = response.rows;
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
        workid: null,
        name: null,
        transferdate: null,
        indepartment: null,
        afterdep: null,
        beforestaff: null,
        afterstaff: null,
        beforegangwei: null,
        aftergangwei: null,
        transferreason: null,
        staffman: null,
        memo: null,
        jobssituation: null,
        transfertype: null,
        creator: null,
        creattime: null
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
      this.title = "添加转职明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHrtransfer(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改转职明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHrtransfer(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHrtransfer(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除转职明细编号为"' + ids + '"的数据项？').then(function() {
        return delHrtransfer(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/hrtransfer/export', {
        ...this.queryParams
      }, `hrtransfer_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
