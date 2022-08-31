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
      <el-form-item label="需求" prop="need">
        <el-input
          v-model="queryParams.need"
          placeholder="请输入需求"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员数字" prop="personnumber">
        <el-input
          v-model="queryParams.personnumber"
          placeholder="请输入人员数字"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请人" prop="applyman">
        <el-input
          v-model="queryParams.applyman"
          placeholder="请输入申请人"
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
          v-hasPermi="['crm-hr:zpjihua:add']"
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
          v-hasPermi="['crm-hr:zpjihua:edit']"
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
          v-hasPermi="['crm-hr:zpjihua:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:zpjihua:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zpjihuaList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="需求" align="center" prop="need" />
      <el-table-column label="个人数字" align="center" prop="personnumber" />
      <el-table-column label="开始时间" align="center" prop="starttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.starttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="applyman" />
      <el-table-column label="申请时间" align="center" prop="applytime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applytime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:zpjihua:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:zpjihua:remove']"
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

    <!-- 添加或修改招聘计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="需求" prop="need">
          <el-input v-model="form.need" placeholder="请输入需求" />
        </el-form-item>
        <el-form-item label="个人数字" prop="personnumber">
          <el-input v-model="form.personnumber" placeholder="请输入个人数字" />
        </el-form-item>
        <el-form-item label="开始时间" prop="starttime">
          <el-date-picker clearable
            v-model="form.starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endtime">
          <el-date-picker clearable
            v-model="form.endtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人" prop="applyman">
          <el-input v-model="form.applyman" placeholder="请输入申请人" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applytime">
          <el-date-picker clearable
            v-model="form.applytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择申请时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核人" prop="exman">
          <el-input v-model="form.exman" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="extime">
          <el-input v-model="form.extime" placeholder="请输入审核时间" />
        </el-form-item>
        <el-form-item label="审核状态" prop="exStatus">
          <el-radio v-model="form.exStatus" label="1">已审核</el-radio>
          <el-radio v-model="form.exStatus" label="0">未审核</el-radio>
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
import { listZpjihua, getZpjihua, delZpjihua, addZpjihua, updateZpjihua } from "@/api/crm-hr/zpjihua";

export default {
  name: "Zpjihua",
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
      // 招聘计划表格数据
      zpjihuaList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        sex: null,
        need: null,
        personnumber: null,
        starttime: null,
        endtime: null,
        applyman: null,
        applytime: null,
        exman: null,
        extime: null,
        exstatus: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        need: [
          { required: true, message: "需求不能为空", trigger: "blur" }
        ],
        personnumber: [
          { required: true, message: "个人数字不能为空", trigger: "blur" }
        ],
        starttime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endtime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        applyman: [
          { required: true, message: "申请人不能为空", trigger: "blur" }
        ],
        applytime: [
          { required: true, message: "申请时间不能为空", trigger: "blur" }
        ],
        exman: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        extime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        exstatus: [
          { required: true, message: "审核状态不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询招聘计划列表 */
    getList() {
      this.loading = true;
      listZpjihua(this.queryParams).then(response => {
        this.zpjihuaList = response.rows;
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
        name: null,
        sex: null,
        need: null,
        personnumber: null,
        starttime: null,
        endtime: null,
        applyman: null,
        applytime: null,
        exman: null,
        extime: null,
        exstatus: "0"
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
      this.title = "添加招聘计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getZpjihua(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改招聘计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateZpjihua(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZpjihua(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除招聘计划编号为"' + ids + '"的数据项？').then(function() {
        return delZpjihua(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/zpjihua/export', {
        ...this.queryParams
      }, `zpjihua_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
