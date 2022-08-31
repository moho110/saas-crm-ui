<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="机会主题" prop="chancetheme">
        <el-input
          v-model="queryParams.chancetheme"
          placeholder="请输入机会主题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="clientname">
        <el-input
          v-model="queryParams.clientname"
          placeholder="请输入客户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="linkman">
        <el-input
          v-model="queryParams.linkman"
          placeholder="请输入联系人"
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
          v-hasPermi="['crm-sales:chance:add']"
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
          v-hasPermi="['crm-sales:chance:edit']"
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
          v-hasPermi="['crm-sales:chance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-sales:chance:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="chanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="机会主题" align="center" prop="chancetheme" />
      <el-table-column label="客户名称" align="center" prop="clientname" />
      <el-table-column label="联系人" align="center" prop="linkman" />
      <el-table-column label="发现时间" align="center" prop="findtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.findtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户需求" align="center" prop="clientneed" />
      <el-table-column label="登陆时间" align="center" prop="presigntime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.presigntime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预金额" align="center" prop="precount" />
      <el-table-column label="是否可能" align="center" prop="enable" />
      <el-table-column label="创建人" align="center" prop="creator" />
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
            v-hasPermi="['crm-sales:chance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-sales:chance:remove']"
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

    <!-- 添加或修改销售机会对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="机会主题" prop="chancetheme">
          <el-input v-model="form.chancetheme" placeholder="请输入机会主题" />
        </el-form-item>
        <el-form-item label="客户名称" prop="clientname">
          <el-input v-model="form.clientname" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="发现时间" prop="findtime">
          <el-date-picker clearable
            v-model="form.findtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发现时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户需求" prop="clientneed">
          <el-input v-model="form.clientneed" type="textarea" placeholder="请输入客户需求" />
        </el-form-item>
        <el-form-item label="登陆时间" prop="presigntime">
          <el-date-picker clearable
            v-model="form.presigntime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择登陆时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预金额" prop="precount">
          <el-input v-model="form.precount" placeholder="请输入预金额" />
        </el-form-item>
        <el-form-item label="最近状态" prop="recentStatus">
          <el-radio v-model="form.recentStatus" label="1">特殊</el-radio>
          <el-radio v-model="form.recentStatus" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="form.status" label="1">特殊</el-radio>
          <el-radio v-model="form.status" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="是否可能" prop="enable">
          <el-input v-model="form.enable" placeholder="请输入是否可能" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="备份" prop="bak">
          <el-input v-model="form.bak" type="textarea" placeholder="请输入备份" />
        </el-form-item>
        <el-form-item label="最终合同时间" prop="lastcontacttime">
          <el-date-picker clearable
            v-model="form.lastcontacttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最终合同时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件" prop="attach">
          <el-input v-model="form.attach" placeholder="请输入附件" />
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
import { listChance, getChance, delChance, addChance, updateChance } from "@/api/crm-sales/chance";

export default {
  name: "Chance",
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
      // 销售机会表格数据
      chanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        chancetheme: null,
        clientname: null,
        linkman: null,
        findtime: null,
        clientneed: null,
        presigntime: null,
        precount: null,
        enable: null,
        recentstatus: null,
        status: null,
        creator: null,
        createtime: null,
        bak: null,
        lastcontacttime: null,
        attach: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        chancetheme: [
          { required: true, message: "机会主题不能为空", trigger: "blur" }
        ],
        clientname: [
          { required: true, message: "客户名称不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        findtime: [
          { required: true, message: "发现时间不能为空", trigger: "blur" }
        ],
        clientneed: [
          { required: true, message: "客户需求不能为空", trigger: "blur" }
        ],
        presigntime: [
          { required: true, message: "登陆时间不能为空", trigger: "blur" }
        ],
        precount: [
          { required: true, message: "预金额不能为空", trigger: "blur" }
        ],
        enable: [
          { required: true, message: "是否可能不能为空", trigger: "blur" }
        ],
        recentstatus: [
          { required: true, message: "最终状态不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        bak: [
          { required: true, message: "备份不能为空", trigger: "blur" }
        ],
        lastcontacttime: [
          { required: true, message: "最终合同时间不能为空", trigger: "blur" }
        ],
        attach: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询销售机会列表 */
    getList() {
      this.loading = true;
      listChance(this.queryParams).then(response => {
        this.chanceList = response.rows;
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
        chancetheme: null,
        clientname: null,
        linkman: null,
        findtime: null,
        clientneed: null,
        presigntime: null,
        precount: null,
        enable: null,
        recentstatus: "0",
        status: "0",
        creator: null,
        createtime: null,
        bak: null,
        lastcontacttime: null,
        attach: null
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
      this.title = "添加销售机会";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChance(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改销售机会";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChance(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChance(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除销售机会编号为"' + ids + '"的数据项？').then(function() {
        return delChance(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-sales/chance/export', {
        ...this.queryParams
      }, `chance_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
