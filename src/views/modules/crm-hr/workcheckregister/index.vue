<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学校名称" prop="schoolname">
        <el-input
          v-model="queryParams.schoolname"
          placeholder="请输入学校名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名称" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入用户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职位" prop="staff">
        <el-input
          v-model="queryParams.staff"
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
          v-hasPermi="['crm-hr:workcheckregister:add']"
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
          v-hasPermi="['crm-hr:workcheckregister:edit']"
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
          v-hasPermi="['crm-hr:workcheckregister:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:workcheckregister:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="workcheckregisterList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="学校名称" align="center" prop="schoolname" />
      <el-table-column label="学年" align="center" prop="studyyear" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="用户名称" align="center" prop="username" />
      <el-table-column label="教室" align="center" prop="classroom" />
      <el-table-column label="职位" align="center" prop="staff" />
      <el-table-column label="工作流" align="center" prop="workflow" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:workcheckregister:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:workcheckregister:remove']"
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

    <!-- 添加或修改行政人员工作考核登记表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="学校名称" prop="schoolname">
          <el-input v-model="form.schoolname" placeholder="请输入学校名称" />
        </el-form-item>
        <el-form-item label="学年" prop="studyyear">
          <el-input v-model="form.studyyear" placeholder="请输入学年" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="教室" prop="classroom">
          <el-input v-model="form.classroom" placeholder="请输入教室" />
        </el-form-item>
        <el-form-item label="职位" prop="staff">
          <el-input v-model="form.staff" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="填写日期" prop="filldate">
          <el-date-picker clearable
            v-model="form.filldate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择填写日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职责年对象" prop="dutyandyearobj">
          <el-input v-model="form.dutyandyearobj" type="textarea" placeholder="请输入职责年对象" />
        </el-form-item>
        <el-form-item label="个人总结" prop="personsummary">
          <el-input v-model="form.personsummary" type="textarea" placeholder="请输入个人总结" />
        </el-form-item>
        <el-form-item label="个人登记" prop="personsysign">
          <el-input v-model="form.personsysign" placeholder="请输入个人登记" />
        </el-form-item>
        <el-form-item label="个人登记日期" prop="personsysigndate">
          <el-date-picker clearable
            v-model="form.personsysigndate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择个人登记日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="近年发布情况" prop="recentyearpunishthings">
          <el-input v-model="form.recentyearpunishthings" type="textarea" placeholder="请输入近年发布情况" />
        </el-form-item>
        <el-form-item label="教室IDEAL" prop="classroomideal">
          <el-input v-model="form.classroomideal" placeholder="请输入教室IDEAL" />
        </el-form-item>
        <el-form-item label="等级" prop="rankandlevel">
          <el-input v-model="form.rankandlevel" placeholder="请输入等级" />
        </el-form-item>
        <el-form-item label="教室登记" prop="classroomsign">
          <el-input v-model="form.classroomsign" placeholder="请输入教室登记" />
        </el-form-item>
        <el-form-item label="教室日期" prop="classroomdate">
          <el-date-picker clearable
            v-model="form.classroomdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择教室日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学校选项" prop="schoolopinion">
          <el-input v-model="form.schoolopinion" placeholder="请输入学校选项" />
        </el-form-item>
        <el-form-item label="审核领导分类登记" prop="exleadergroupsign">
          <el-input v-model="form.exleadergroupsign" placeholder="请输入审核领导分类登记" />
        </el-form-item>
        <el-form-item label="审核领导分类登记日期" prop="exleadergroupsigndate">
          <el-date-picker clearable
            v-model="form.exleadergroupsigndate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核领导分类登记日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="个人选项" prop="personopinion">
          <el-input v-model="form.personopinion" placeholder="请输入个人选项" />
        </el-form-item>
        <el-form-item label="个人登记" prop="personsign">
          <el-input v-model="form.personsign" placeholder="请输入个人登记" />
        </el-form-item>
        <el-form-item label="个人选项日期" prop="personopiniondate">
          <el-date-picker clearable
            v-model="form.personopiniondate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择个人选项日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作流" prop="workflow">
          <el-input v-model="form.workflow" placeholder="请输入工作流" />
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
import { listWorkcheckregister, getWorkcheckregister, delWorkcheckregister, addWorkcheckregister, updateWorkcheckregister } from "@/api/crm-hr/workcheckregister";

export default {
  name: "Workcheckregister",
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
      // 行政人员工作考核登记表表格数据
      workcheckregisterList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        schoolname: null,
        studyyear: null,
        name: null,
        username: null,
        classroom: null,
        staff: null,
        filldate: null,
        dutyandyearobj: null,
        personsummary: null,
        personsysign: null,
        personsysigndate: null,
        recentyearpunishthings: null,
        classroomideal: null,
        rankandlevel: null,
        classroomsign: null,
        classroomdate: null,
        schoolopinion: null,
        exleadergroupsign: null,
        exleadergroupsigndate: null,
        personopinion: null,
        personsign: null,
        personopiniondate: null,
        workflow: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        schoolname: [
          { required: true, message: "学校名称不能为空", trigger: "blur" }
        ],
        studyyear: [
          { required: true, message: "学年不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        classroom: [
          { required: true, message: "教室不能为空", trigger: "blur" }
        ],
        staff: [
          { required: true, message: "职位不能为空", trigger: "blur" }
        ],
        filldate: [
          { required: true, message: "填写日期不能为空", trigger: "blur" }
        ],
        dutyandyearobj: [
          { required: true, message: "职责年对象不能为空", trigger: "blur" }
        ],
        personsummary: [
          { required: true, message: "个人总结不能为空", trigger: "blur" }
        ],
        personsysign: [
          { required: true, message: "个人登记不能为空", trigger: "blur" }
        ],
        personsysigndate: [
          { required: true, message: "个人登记日期不能为空", trigger: "blur" }
        ],
        recentyearpunishthings: [
          { required: true, message: "近年公布情况不能为空", trigger: "blur" }
        ],
        classroomideal: [
          { required: true, message: "教室ideal不能为空", trigger: "blur" }
        ],
        rankandlevel: [
          { required: true, message: "等级不能为空", trigger: "blur" }
        ],
        classroomsign: [
          { required: true, message: "教室登记不能为空", trigger: "blur" }
        ],
        classroomdate: [
          { required: true, message: "教室日期不能为空", trigger: "blur" }
        ],
        schoolopinion: [
          { required: true, message: "学校选项不能为空", trigger: "blur" }
        ],
        exleadergroupsign: [
          { required: true, message: "审核领导分类登记不能为空", trigger: "blur" }
        ],
        exleadergroupsigndate: [
          { required: true, message: "审核领导分类登记日期不能为空", trigger: "blur" }
        ],
        personopinion: [
          { required: true, message: "个人选项不能为空", trigger: "blur" }
        ],
        personsign: [
          { required: true, message: "个人登记不能为空", trigger: "blur" }
        ],
        personopiniondate: [
          { required: true, message: "个人选项日期不能为空", trigger: "blur" }
        ],
        workflow: [
          { required: true, message: "工作流不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政人员工作考核登记表列表 */
    getList() {
      this.loading = true;
      listWorkcheckregister(this.queryParams).then(response => {
        this.workcheckregisterList = response.rows;
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
        schoolname: null,
        studyyear: null,
        name: null,
        username: null,
        classroom: null,
        staff: null,
        filldate: null,
        dutyandyearobj: null,
        personsummary: null,
        personsysign: null,
        personsysigndate: null,
        recentyearpunishthings: null,
        classroomideal: null,
        rankandlevel: null,
        classroomsign: null,
        classroomdate: null,
        schoolopinion: null,
        exleadergroupsign: null,
        exleadergroupsigndate: null,
        personopinion: null,
        personsign: null,
        personopiniondate: null,
        workflow: null
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
      this.title = "添加行政人员工作考核登记表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWorkcheckregister(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政人员工作考核登记表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWorkcheckregister(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWorkcheckregister(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政人员工作考核登记表编号为"' + ids + '"的数据项？').then(function() {
        return delWorkcheckregister(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/workcheckregister/export', {
        ...this.queryParams
      }, `workcheckregister_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
