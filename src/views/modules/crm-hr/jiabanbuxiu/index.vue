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
      <el-form-item label="补休人" prop="buxiuexman">
        <el-input
          v-model="queryParams.buxiuexman"
          placeholder="请输入补休人"
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
          v-hasPermi="['crm-hr:jiabanbuxiu:add']"
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
          v-hasPermi="['crm-hr:jiabanbuxiu:edit']"
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
          v-hasPermi="['crm-hr:jiabanbuxiu:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:jiabanbuxiu:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="jiabanbuxiuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款" align="center" prop="term" />
      <el-table-column label="部门" align="center" prop="department" />
      <el-table-column label="人员" align="center" prop="person" />
      <el-table-column label="延迟工作时间" align="center" prop="delayworktime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.delayworktime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="延迟工作数量" align="center" prop="delayworknum" />
      <el-table-column label="补休时间" align="center" prop="buxiutime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.buxiutime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补休人" align="center" prop="buxiuexman" />
      <el-table-column label="人员名称" align="center" prop="personname" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:jiabanbuxiu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:jiabanbuxiu:remove']"
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

    <!-- 添加或修改行政加班补休对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款" prop="term">
          <el-input v-model="form.term" placeholder="请输入条款" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="人员" prop="person">
          <el-input v-model="form.person" placeholder="请输入人员" />
        </el-form-item>
        <el-form-item label="延迟工作时间" prop="delayworktime">
          <el-date-picker clearable
            v-model="form.delayworktime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择延迟工作时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="延迟工作数量" prop="delayworknum">
          <el-input v-model="form.delayworknum" placeholder="请输入延迟工作数量" />
        </el-form-item>
        <el-form-item label="补休时间" prop="buxiutime">
          <el-date-picker clearable
            v-model="form.buxiutime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择补休时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="补休分类" prop="buxiuclass">
          <el-input v-model="form.buxiuclass" placeholder="请输入补休分类" />
        </el-form-item>
        <el-form-item label="延迟工作ID" prop="delayworkid">
          <el-input v-model="form.delayworkid" placeholder="请输入延迟工作ID" />
        </el-form-item>
        <el-form-item label="延迟工作人员" prop="delayworkman">
          <el-input v-model="form.delayworkman" placeholder="请输入延迟工作人员" />
        </el-form-item>
        <el-form-item label="延迟工作时间" prop="delayworkextime">
          <el-input v-model="form.delayworkextime" placeholder="请输入延迟工作时间" />
        </el-form-item>
        <el-form-item label="补休状态" prop="buxiuStatus">
          <el-radio v-model="form.buxiuStatus" label="1">特殊</el-radio>
          <el-radio v-model="form.buxiuStatus" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="补休工作流ID" prop="buxiuflowid">
          <el-input v-model="form.buxiuflowid" placeholder="请输入补休工作流ID" />
        </el-form-item>
        <el-form-item label="补休人员" prop="buxiuexman">
          <el-input v-model="form.buxiuexman" placeholder="请输入补休人员" />
        </el-form-item>
        <el-form-item label="补休时间" prop="buxiuextime">
          <el-input v-model="form.buxiuextime" placeholder="请输入补休时间" />
        </el-form-item>
        <el-form-item label="人员名称" prop="personname">
          <el-input v-model="form.personname" placeholder="请输入人员名称" />
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
import { listJiabanbuxiu, getJiabanbuxiu, delJiabanbuxiu, addJiabanbuxiu, updateJiabanbuxiu } from "@/api/crm-hr/jiabanbuxiu";

export default {
  name: "Jiabanbuxiu",
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
      // 行政加班补休表格数据
      jiabanbuxiuList: [],
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
        delayworktime: null,
        delayworknum: null,
        buxiutime: null,
        buxiuclass: null,
        delayworkstatus: null,
        delayworkid: null,
        delayworkman: null,
        delayworkextime: null,
        buxiustatus: null,
        buxiuflowid: null,
        buxiuexman: null,
        buxiuextime: null,
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
          { required: true, message: "人员不能为空", trigger: "blur" }
        ],
        delayworktime: [
          { required: true, message: "延迟工作时间不能为空", trigger: "blur" }
        ],
        delayworknum: [
          { required: true, message: "延迟工作数量不能为空", trigger: "blur" }
        ],
        buxiutime: [
          { required: true, message: "补休时间不能为空", trigger: "blur" }
        ],
        buxiuclass: [
          { required: true, message: "补休分类不能为空", trigger: "blur" }
        ],
        delayworkstatus: [
          { required: true, message: "延迟工作状态不能为空", trigger: "blur" }
        ],
        delayworkid: [
          { required: true, message: "延迟工作ID不能为空", trigger: "blur" }
        ],
        delayworkman: [
          { required: true, message: "延迟工作人员不能为空", trigger: "blur" }
        ],
        delayworkextime: [
          { required: true, message: "延迟工作时间不能为空", trigger: "blur" }
        ],
        buxiustatus: [
          { required: true, message: "补休状态不能为空", trigger: "blur" }
        ],
        buxiuflowid: [
          { required: true, message: "补休工作流ID不能为空", trigger: "blur" }
        ],
        buxiuexman: [
          { required: true, message: "补休人员不能为空", trigger: "blur" }
        ],
        buxiuextime: [
          { required: true, message: "补休时间不能为空", trigger: "blur" }
        ],
        personname: [
          { required: true, message: "人员名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政加班补休列表 */
    getList() {
      this.loading = true;
      listJiabanbuxiu(this.queryParams).then(response => {
        this.jiabanbuxiuList = response.rows;
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
        delayworktime: null,
        delayworknum: null,
        buxiutime: null,
        buxiuclass: null,
        delayworkstatus: 0,
        delayworkid: null,
        delayworkman: null,
        delayworkextime: null,
        buxiustatus: 0,
        buxiuflowid: null,
        buxiuexman: null,
        buxiuextime: null,
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
      this.title = "添加行政加班补休";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJiabanbuxiu(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政加班补休";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJiabanbuxiu(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJiabanbuxiu(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政加班补休编号为"' + ids + '"的数据项？').then(function() {
        return delJiabanbuxiu(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/jiabanbuxiu/export', {
        ...this.queryParams
      }, `jiabanbuxiu_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
