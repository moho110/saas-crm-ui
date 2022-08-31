<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="教师用户名称" prop="teacherusername">
        <el-input
          v-model="queryParams.teacherusername"
          placeholder="请输入教师名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="教师名称" prop="teachername">
        <el-input
          v-model="queryParams.teachername"
          placeholder="请输入教师名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职位" prop="dutyposition">
        <el-input
          v-model="queryParams.dutyposition"
          placeholder="请输入职位"
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
          v-hasPermi="['crm-hr:teacherkaoqin:add']"
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
          v-hasPermi="['crm-hr:teacherkaoqin:edit']"
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
          v-hasPermi="['crm-hr:teacherkaoqin:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:teacherkaoqin:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="teacherkaoqinList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="教师用户名称" align="center" prop="teacherusername" />
      <el-table-column label="教师名称" align="center" prop="teachername" />
      <el-table-column label="职责日期" align="center" prop="dutydate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dutydate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卡片日期" align="center" prop="cardtime" />
      <el-table-column label="职责ID" align="center" prop="dutyid" />
      <el-table-column label="职位" align="center" prop="dutyposition" />
      <el-table-column label="职责IP" align="center" prop="dutyip" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:teacherkaoqin:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:teacherkaoqin:remove']"
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

    <!-- 添加或修改教师考勤对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="教师用户名称" prop="teacherusername">
          <el-input v-model="form.teacherusername" placeholder="请输入教师用户名称" />
        </el-form-item>
        <el-form-item label="教师名称" prop="teachername">
          <el-input v-model="form.teachername" placeholder="请输入教师名称" />
        </el-form-item>
        <el-form-item label="职责日期" prop="dutydate">
          <el-date-picker clearable
            v-model="form.dutydate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择职责日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="卡片日期" prop="cardtime">
          <el-input v-model="form.cardtime" placeholder="请输入卡片日期" />
        </el-form-item>
        <el-form-item label="职责ID" prop="dutyid">
          <el-input v-model="form.dutyid" placeholder="请输入职责ID" />
        </el-form-item>
        <el-form-item label="职位" prop="dutyposition">
          <el-input v-model="form.dutyposition" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="职责IP地址" prop="dutyip">
          <el-input v-model="form.dutyip" placeholder="请输入职责IP地址" />
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
import { listTeacherkaoqin, getTeacherkaoqin, delTeacherkaoqin, addTeacherkaoqin, updateTeacherkaoqin } from "@/api/crm-hr/teacherkaoqin";

export default {
  name: "Teacherkaoqin",
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
      // 教师考勤表格数据
      teacherkaoqinList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teacherusername: null,
        teachername: null,
        dutydate: null,
        cardtime: null,
        dutyid: null,
        dutyposition: null,
        dutyip: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        teacherusername: [
          { required: true, message: "教师用户名称不能为空", trigger: "blur" }
        ],
        teachername: [
          { required: true, message: "教师名称不能为空", trigger: "blur" }
        ],
        dutydate: [
          { required: true, message: "职责日期不能为空", trigger: "blur" }
        ],
        cardtime: [
          { required: true, message: "卡片时间不能为空", trigger: "blur" }
        ],
        dutyid: [
          { required: true, message: "职责ID不能为空", trigger: "blur" }
        ],
        dutyposition: [
          { required: true, message: "职位不能为空", trigger: "blur" }
        ],
        dutyip: [
          { required: true, message: "职责IP地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询教师考勤列表 */
    getList() {
      this.loading = true;
      listTeacherkaoqin(this.queryParams).then(response => {
        this.teacherkaoqinList = response.rows;
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
        teacherusername: null,
        teachername: null,
        dutydate: null,
        cardtime: null,
        dutyid: null,
        dutyposition: null,
        dutyip: null
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
      this.title = "添加教师考勤";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTeacherkaoqin(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改教师考勤";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTeacherkaoqin(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTeacherkaoqin(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除教师考勤编号为"' + ids + '"的数据项？').then(function() {
        return delTeacherkaoqin(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/teacherkaoqin/export', {
        ...this.queryParams
      }, `teacherkaoqin_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
