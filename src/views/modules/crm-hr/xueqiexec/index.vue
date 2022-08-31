<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="条款名称" prop="termname">
        <el-input
          v-model="queryParams.termname"
          placeholder="请输入条款名称"
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
          v-hasPermi="['crm-hr:xueqiexec:add']"
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
          v-hasPermi="['crm-hr:xueqiexec:edit']"
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
          v-hasPermi="['crm-hr:xueqiexec:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:xueqiexec:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="xueqiexecList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款名称" align="center" prop="termname" />
      <el-table-column label="最近条款" align="center" prop="recentterm" />
      <el-table-column label="是否早上有课" align="center" prop="ismorninghaveclass" />
      <el-table-column label="是否晚上有课" align="center" prop="iseveninghaveclass" />
      <el-table-column label="学年" align="center" prop="studyyear" />
      <el-table-column label="是否星期六上课" align="center" prop="issatclass" />
      <el-table-column label="是否星期日上课" align="center" prop="issunclass" />
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:xueqiexec:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:xueqiexec:remove']"
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

    <!-- 添加或修改学期执行对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款名称" prop="termname">
          <el-input v-model="form.termname" placeholder="请输入条款名称" />
        </el-form-item>
        <el-form-item label="最近条款" prop="recentterm">
          <el-input v-model="form.recentterm" placeholder="请输入最近条款" />
        </el-form-item>
        <el-form-item label="是否早上有课" prop="ismorninghaveclass">
          <el-radio v-model="form.ismorninghaveclass" label="1">是</el-radio>
          <el-radio v-model="form.ismorninghaveclass" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否晚上有课" prop="iseveninghaveclass">
          <el-radio v-model="form.iseveninghaveclass" label="1">是</el-radio>
          <el-radio v-model="form.iseveninghaveclass" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="学年" prop="studyyear">
          <el-input v-model="form.studyyear" placeholder="请输入学年" />
        </el-form-item>
        <el-form-item label="是否星期六上课" prop="issatclass">
          <el-radio v-model="form.issatclass" label="1">是</el-radio>
          <el-radio v-model="form.issatclass" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否星期日上课" prop="issunclass">
          <el-radio v-model="form.issunclass" label="1">是</el-radio>
          <el-radio v-model="form.issunclass" label="0">否</el-radio>
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
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
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
import { listXueqiexec, getXueqiexec, delXueqiexec, addXueqiexec, updateXueqiexec } from "@/api/crm-hr/xueqiexec";

export default {
  name: "Xueqiexec",
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
      // 学期执行表格数据
      xueqiexecList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        termname: null,
        recentterm: null,
        ismorninghaveclass: null,
        iseveninghaveclass: null,
        studyyear: null,
        issatclass: null,
        issunclass: null,
        starttime: null,
        endtime: null,
        memo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        termname: [
          { required: true, message: "条款名称不能为空", trigger: "blur" }
        ],
        recentterm: [
          { required: true, message: "最近条款不能为空", trigger: "blur" }
        ],
        ismorninghaveclass: [
          { required: true, message: "是否早上有课不能为空", trigger: "blur" }
        ],
        iseveninghaveclass: [
          { required: true, message: "是否晚上有课不能为空", trigger: "blur" }
        ],
        studyyear: [
          { required: true, message: "学年不能为空", trigger: "blur" }
        ],
        issatclass: [
          { required: true, message: "是否星期六有课不能为空", trigger: "blur" }
        ],
        issunclass: [
          { required: true, message: "是否星期日有课不能为空", trigger: "blur" }
        ],
        starttime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endtime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询学期执行列表 */
    getList() {
      this.loading = true;
      listXueqiexec(this.queryParams).then(response => {
        this.xueqiexecList = response.rows;
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
        termname: null,
        recentterm: null,
        ismorninghaveclass: null,
        iseveninghaveclass: null,
        studyyear: null,
        issatclass: null,
        issunclass: null,
        starttime: null,
        endtime: null,
        memo: null
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
      this.title = "添加学期执行";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getXueqiexec(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改学期执行";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXueqiexec(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXueqiexec(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除学期执行编号为"' + ids + '"的数据项？').then(function() {
        return delXueqiexec(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/xueqiexec/export', {
        ...this.queryParams
      }, `xueqiexec_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
