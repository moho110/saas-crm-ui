<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="SQL语句" prop="sql">
        <el-input
          v-model="queryParams.sql"
          placeholder="请输入SQL语句"
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
          v-hasPermi="['crm-system:logall:add']"
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
          v-hasPermi="['crm-system:logall:edit']"
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
          v-hasPermi="['crm-system:logall:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-system:logall:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="logallList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="当前时间" align="center" prop="currenttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.currenttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行时间" align="center" prop="executetime" />
      <el-table-column label="SQL语句" align="center" prop="sql" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-system:logall:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-system:logall:remove']"
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

    <!-- 添加或修改系统操作日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="当前时间" prop="currenttime">
          <el-date-picker clearable
            v-model="form.currenttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择当前时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行时间" prop="executetime">
          <el-input v-model="form.executetime" placeholder="请输入执行时间" />
        </el-form-item>
        <el-form-item label="SQL语句" prop="sql">
          <el-input v-model="form.sql" placeholder="请输入SQL语句" />
        </el-form-item>
        <el-form-item label="慢运行线程" prop="slowLaunchThreads">
          <el-input v-model="form.slowLaunchThreads" placeholder="请输入慢运行线程" />
        </el-form-item>
        <el-form-item label="线程缓存" prop="threadsCached">
          <el-input v-model="form.threadsCached" placeholder="请输入线程缓存" />
        </el-form-item>
        <el-form-item label="线程连接" prop="threadsConnected">
          <el-input v-model="form.threadsConnected" placeholder="请输入线程连接" />
        </el-form-item>
        <el-form-item label="线程创建" prop="threadsCreated">
          <el-input v-model="form.threadsCreated" placeholder="请输入线程创建" />
        </el-form-item>
        <el-form-item label="线程运行" prop="threadsRunning">
          <el-input v-model="form.threadsRunning" placeholder="请输入线程运行" />
        </el-form-item>
        <el-form-item label="缓存块" prop="qcacheFreeBlocks">
          <el-input v-model="form.qcacheFreeBlocks" placeholder="请输入缓存块" />
        </el-form-item>
        <el-form-item label="缓存空闲内存" prop="qcacheFreeMemory">
          <el-input v-model="form.qcacheFreeMemory" placeholder="请输入缓存空闲内存" />
        </el-form-item>
        <el-form-item label="缓存次数" prop="qcacheHits">
          <el-input v-model="form.qcacheHits" placeholder="请输入缓存次数" />
        </el-form-item>
        <el-form-item label="缓存插入" prop="qcacheInserts">
          <el-input v-model="form.qcacheInserts" placeholder="请输入缓存插入" />
        </el-form-item>
        <el-form-item label="缓存低内存" prop="qcacheLowmemPrunes">
          <el-input v-model="form.qcacheLowmemPrunes" placeholder="请输入缓存低内存" />
        </el-form-item>
        <el-form-item label="非缓存" prop="qcacheNotCached">
          <el-input v-model="form.qcacheNotCached" placeholder="请输入非缓存" />
        </el-form-item>
        <el-form-item label="查询缓存" prop="qcacheQueriesInCache">
          <el-input v-model="form.qcacheQueriesInCache" placeholder="请输入查询缓存" />
        </el-form-item>
        <el-form-item label="总块" prop="qcacheTotalBlocks">
          <el-input v-model="form.qcacheTotalBlocks" placeholder="请输入总块" />
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
import { listLogall, getLogall, delLogall, addLogall, updateLogall } from "@/api/crm-system/logall";

export default {
  name: "Logall",
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
      // 系统操作日志表格数据
      logallList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        currenttime: null,
        executetime: null,
        sql: null,
        slowLaunchThreads: null,
        threadsCached: null,
        threadsConnected: null,
        threadsCreated: null,
        threadsRunning: null,
        qcacheFreeBlocks: null,
        qcacheFreeMemory: null,
        qcacheHits: null,
        qcacheInserts: null,
        qcacheLowmemPrunes: null,
        qcacheNotCached: null,
        qcacheQueriesInCache: null,
        qcacheTotalBlocks: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        currenttime: [
          { required: true, message: "当前时间不能为空", trigger: "blur" }
        ],
        executetime: [
          { required: true, message: "执行时间不能为空", trigger: "blur" }
        ],
        sql: [
          { required: true, message: "SQL语句不能为空", trigger: "blur" }
        ],
        slowLaunchThreads: [
          { required: true, message: "慢运行线程不能为空", trigger: "blur" }
        ],
        threadsCached: [
          { required: true, message: "线程缓存不能为空", trigger: "blur" }
        ],
        threadsConnected: [
          { required: true, message: "线程连接不能为空", trigger: "blur" }
        ],
        threadsCreated: [
          { required: true, message: "线程创建不能为空", trigger: "blur" }
        ],
        threadsRunning: [
          { required: true, message: "线程运行不能为空", trigger: "blur" }
        ],
        qcacheFreeBlocks: [
          { required: true, message: "缓存空闲块不能为空", trigger: "blur" }
        ],
        qcacheFreeMemory: [
          { required: true, message: "空闲内存不能为空", trigger: "blur" }
        ],
        qcacheHits: [
          { required: true, message: "缓存次数不能为空", trigger: "blur" }
        ],
        qcacheInserts: [
          { required: true, message: "缓存插入不能为空", trigger: "blur" }
        ],
        qcacheLowmemPrunes: [
          { required: true, message: "缓存低内存不能为空", trigger: "blur" }
        ],
        qcacheNotCached: [
          { required: true, message: "非缓存不能为空", trigger: "blur" }
        ],
        qcacheQueriesInCache: [
          { required: true, message: "缓存查询不能为空", trigger: "blur" }
        ],
        qcacheTotalBlocks: [
          { required: true, message: "总块不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询系统操作日志列表 */
    getList() {
      this.loading = true;
      listLogall(this.queryParams).then(response => {
        this.logallList = response.rows;
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
        currenttime: null,
        executetime: null,
        sql: null,
        slowLaunchThreads: null,
        threadsCached: null,
        threadsConnected: null,
        threadsCreated: null,
        threadsRunning: null,
        qcacheFreeBlocks: null,
        qcacheFreeMemory: null,
        qcacheHits: null,
        qcacheInserts: null,
        qcacheLowmemPrunes: null,
        qcacheNotCached: null,
        qcacheQueriesInCache: null,
        qcacheTotalBlocks: null
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
      this.title = "添加系统操作日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLogall(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改系统操作日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLogall(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLogall(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除系统操作日志编号为"' + ids + '"的数据项？').then(function() {
        return delLogall(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-system/logall/export', {
        ...this.queryParams
      }, `logall_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
