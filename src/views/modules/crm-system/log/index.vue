<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="脚本名称" prop="scriptName">
        <el-date-picker clearable
          v-model="queryParams.scriptName"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择脚本名称">
        </el-date-picker>
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
          v-hasPermi="['crm-system:log:add']"
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
          v-hasPermi="['crm-system:log:edit']"
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
          v-hasPermi="['crm-system:log:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-system:log:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="logList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="登陆活动" align="center" prop="loginaction" />
      <el-table-column label="日期" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="远程地址" align="center" prop="remoteAddr" />
      <el-table-column label="用户代理" align="center" prop="httpUserAgent" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.httpUserAgent, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查询字串" align="center" prop="queryString" />
      <el-table-column label="脚本名称" align="center" prop="scriptName" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.scriptName, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" align="center" prop="userid" />
      <el-table-column label="SQL文本" align="center" prop="sqltext" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-system:log:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-system:log:remove']"
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

    <!-- 添加或修改系统日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="登陆活动" prop="loginaction">
          <el-input v-model="form.loginaction" placeholder="请输入登陆活动" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker clearable
            v-model="form.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="远程地址" prop="remoteAddr">
          <el-input v-model="form.remoteAddr" placeholder="请输入远程地址" />
        </el-form-item>
        <el-form-item label="用户代理" prop="httpUserAgent">
          <el-date-picker clearable
            v-model="form.httpUserAgent"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择用户代理">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="查询字串" prop="queryString">
          <el-input v-model="form.queryString" placeholder="请输入查询字串" />
        </el-form-item>
        <el-form-item label="脚本名称" prop="scriptName">
          <el-date-picker clearable
            v-model="form.scriptName"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择脚本名称">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户ID" prop="userid">
          <el-input v-model="form.userid" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="SQL文本" prop="sqltext">
          <el-input v-model="form.sqltext" type="textarea" placeholder="请输入SQL文本" />
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
import { listLog, getLog, delLog, addLog, updateLog } from "@/api/crm-system/log";

export default {
  name: "Log",
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
      // 系统日志表格数据
      logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        loginaction: null,
        date: null,
        remoteAddr: null,
        httpUserAgent: null,
        queryString: null,
        scriptName: null,
        userid: null,
        sqltext: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        loginaction: [
          { required: true, message: "登陆活动不能为空", trigger: "blur" }
        ],
        date: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        remoteAddr: [
          { required: true, message: "远程地址不能为空", trigger: "blur" }
        ],
        httpUserAgent: [
          { required: true, message: "用户代理不能为空", trigger: "blur" }
        ],
        queryString: [
          { required: true, message: "查询字串不能为空", trigger: "blur" }
        ],
        scriptName: [
          { required: true, message: "脚本名称不能为空", trigger: "blur" }
        ],
        userid: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        sqltext: [
          { required: true, message: "SQL本文不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询系统日志列表 */
    getList() {
      this.loading = true;
      listLog(this.queryParams).then(response => {
        this.logList = response.rows;
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
        loginaction: null,
        date: null,
        remoteAddr: null,
        httpUserAgent: null,
        queryString: null,
        scriptName: null,
        userid: null,
        sqltext: null
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
      this.title = "添加系统日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改系统日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLog(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除系统日志编号为"' + ids + '"的数据项？').then(function() {
        return delLog(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-system/log/export', {
        ...this.queryParams
      }, `log_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
