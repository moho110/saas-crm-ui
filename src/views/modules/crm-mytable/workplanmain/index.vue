<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建人" prop="createman">
        <el-input
          v-model="queryParams.createman"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主题" prop="zhuti">
        <el-input
          v-model="queryParams.zhuti"
          placeholder="请输入主题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行人" prop="zhixingren">
        <el-input
          v-model="queryParams.zhixingren"
          placeholder="请输入执行人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人" prop="shenheren">
        <el-input
          v-model="queryParams.shenheren"
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
          v-hasPermi="['crm-mytable:workplanmain:add']"
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
          v-hasPermi="['crm-mytable:workplanmain:edit']"
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
          v-hasPermi="['crm-mytable:workplanmain:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:workplanmain:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="workplanmainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createman" />
      <el-table-column label="主题" align="center" prop="zhuti" />
      <el-table-column label="种类" align="center" prop="kind" />
      <el-table-column label="开始时间" align="center" prop="begintime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.begintime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行人" align="center" prop="zhixingren" />
      <el-table-column label="完成时间" align="center" prop="finishtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.finishtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" align="center" prop="shenheren" />
      <el-table-column label="审核时间" align="center" prop="shenhetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.shenhetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核批次" align="center" prop="shenhepishi" />
      <el-table-column label="附件" align="center" prop="fujian" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:workplanmain:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:workplanmain:remove']"
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

    <!-- 添加或修改工作计划对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="form.state" label="1">特殊</el-radio>
          <el-radio v-model="form.state" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="主题" prop="zhuti">
          <el-input v-model="form.zhuti" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="种类" prop="kind">
          <el-input v-model="form.kind" placeholder="请输入种类" />
        </el-form-item>
        <el-form-item label="开始时间" prop="begintime">
          <el-date-picker clearable
            v-model="form.begintime"
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
        <el-form-item label="执行人" prop="zhixingren">
          <el-input v-model="form.zhixingren" placeholder="请输入执行人" />
        </el-form-item>
        <el-form-item label="完成时间" prop="finishtime">
          <el-date-picker clearable
            v-model="form.finishtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核人" prop="shenheren">
          <el-input v-model="form.shenheren" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审查状态" prop="shenchastate">
          <el-radio v-model="form.shenchastate" label="1">已审查</el-radio>
          <el-radio v-model="form.shenchastate" label="0">未审查</el-radio>
        </el-form-item>
        <el-form-item label="审核时间" prop="shenhetime">
          <el-date-picker clearable
            v-model="form.shenhetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核批示" prop="shenhepishi">
          <el-input v-model="form.shenhepishi" placeholder="请输入审核批示" />
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="是否发送短信" prop="ifsms">
          <el-radio v-model="form.ifsms" label="1">是</el-radio>
          <el-radio v-model="form.ifsms" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否发送短信邮件" prop="ifemail">
          <el-radio v-model="form.ifemail" label="1">是</el-radio>
          <el-radio v-model="form.ifemail" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="关联事务" prop="guanlianshiwu">
          <el-input v-model="form.guanlianshiwu" placeholder="请输入关联事务" />
        </el-form-item>
        <el-form-item label="关联URL地址" prop="guanlianurl">
          <el-input v-model="form.guanlianurl" placeholder="请输入关联URL地址" />
        </el-form-item>
        <el-form-item label="关联ID" prop="guanlianid">
          <el-input v-model="form.guanlianid" placeholder="请输入关联ID" />
        </el-form-item>
        <el-form-item label="最终执行时间" prop="lastzhixingtime">
          <el-date-picker clearable
            v-model="form.lastzhixingtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最终执行时间">
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
import { listWorkplanmain, getWorkplanmain, delWorkplanmain, addWorkplanmain, updateWorkplanmain } from "@/api/crm-mytable/workplanmain";

export default {
  name: "Workplanmain",
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
      // 工作计划表格数据
      workplanmainList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createtime: null,
        createman: null,
        state: null,
        zhuti: null,
        content: null,
        kind: null,
        begintime: null,
        endtime: null,
        zhixingren: null,
        finishtime: null,
        shenheren: null,
        shenchastate: null,
        shenhetime: null,
        shenhepishi: null,
        fujian: null,
        ifsms: null,
        ifemail: null,
        guanlianshiwu: null,
        guanlianurl: null,
        guanlianid: null,
        lastzhixingtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        zhuti: [
          { required: true, message: "主题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        kind: [
          { required: true, message: "种类不能为空", trigger: "blur" }
        ],
        begintime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endtime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        zhixingren: [
          { required: true, message: "执行人不能为空", trigger: "blur" }
        ],
        finishtime: [
          { required: true, message: "完成时间不能为空", trigger: "blur" }
        ],
        shenheren: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        shenchastate: [
          { required: true, message: "审查状态不能为空", trigger: "blur" }
        ],
        shenhetime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        shenhepishi: [
          { required: true, message: "审核批示不能为空", trigger: "blur" }
        ],
        fujian: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ],
        ifsms: [
          { required: true, message: "是否发送短信不能为空", trigger: "blur" }
        ],
        ifemail: [
          { required: true, message: "是否发送邮件不能为空", trigger: "blur" }
        ],
        guanlianshiwu: [
          { required: true, message: "关联事务不能为空", trigger: "blur" }
        ],
        guanlianurl: [
          { required: true, message: "关联URL地址不能为空", trigger: "blur" }
        ],
        guanlianid: [
          { required: true, message: "关联ID不能为空", trigger: "blur" }
        ],
        lastzhixingtime: [
          { required: true, message: "最终执行时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询工作计划列表 */
    getList() {
      this.loading = true;
      listWorkplanmain(this.queryParams).then(response => {
        this.workplanmainList = response.rows;
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
        createtime: null,
        createman: null,
        state: null,
        zhuti: null,
        content: null,
        kind: null,
        begintime: null,
        endtime: null,
        zhixingren: null,
        finishtime: null,
        shenheren: null,
        shenchastate: null,
        shenhetime: null,
        shenhepishi: null,
        fujian: null,
        ifsms: null,
        ifemail: null,
        guanlianshiwu: null,
        guanlianurl: null,
        guanlianid: null,
        lastzhixingtime: null
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
      this.title = "添加工作计划";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWorkplanmain(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工作计划";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWorkplanmain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWorkplanmain(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除工作计划编号为"' + ids + '"的数据项？').then(function() {
        return delWorkplanmain(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/workplanmain/export', {
        ...this.queryParams
      }, `workplanmain_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
