<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="电话号码" prop="tel">
        <el-input
          v-model="queryParams.tel"
          placeholder="请输入电话号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户" prop="customer">
        <el-input
          v-model="queryParams.customer"
          placeholder="请输入客户"
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
      <el-form-item label="创建人" prop="createman">
        <el-input
          v-model="queryParams.createman"
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
          v-hasPermi="['crm-mytable:callchuli:add']"
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
          v-hasPermi="['crm-mytable:callchuli:edit']"
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
          v-hasPermi="['crm-mytable:callchuli:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:callchuli:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="callchuliList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="电话号码" align="center" prop="tel" />
      <el-table-column label="客户" align="center" prop="customer" />
      <el-table-column label="联系人" align="center" prop="linkman" />
      <el-table-column label="创建人" align="center" prop="createman" />
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
            v-hasPermi="['crm-mytable:callchuli:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:callchuli:remove']"
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

    <!-- 添加或修改来电处理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="客户" prop="customer">
          <el-input v-model="form.customer" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="是否处理" prop="ifchuli">
          <el-radio v-model="form.ifchuli" label="1">是</el-radio>
          <el-radio v-model="form.ifchuli" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="处理时间" prop="chulitime">
          <el-date-picker clearable
            v-model="form.chulitime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择处理时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="呼叫类型" prop="calltype">
          <el-radio v-model="form.calltype" label="1">特殊</el-radio>
          <el-radio v-model="form.calltype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="呼叫者类型" prop="callertype">
          <el-radio v-model="form.callertype" label="1">特殊</el-radio>
          <el-radio v-model="form.callertype" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="处理内容">
          <editor v-model="form.chulicontent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="联系人ID" prop="linkmanid">
          <el-input v-model="form.linkmanid" placeholder="请输入联系人ID" />
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
import { listCallchuli, getCallchuli, delCallchuli, addCallchuli, updateCallchuli } from "@/api/crm-mytable/callchuli";

export default {
  name: "Callchuli",
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
      // 来电处理表格数据
      callchuliList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        tel: null,
        customer: null,
        linkman: null,
        content: null,
        createman: null,
        createtime: null,
        ifchuli: null,
        chulitime: null,
        calltype: null,
        callertype: null,
        customerid: null,
        chulicontent: null,
        linkmanid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        tel: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        customer: [
          { required: true, message: "客户不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        ifchuli: [
          { required: true, message: "是否处理不能为空", trigger: "blur" }
        ],
        chulitime: [
          { required: true, message: "处理时间不能为空", trigger: "blur" }
        ],
        calltype: [
          { required: true, message: "呼叫类型不能为空", trigger: "change" }
        ],
        callertype: [
          { required: true, message: "呼叫者类型不能为空", trigger: "change" }
        ],
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        chulicontent: [
          { required: true, message: "处理内容不能为空", trigger: "blur" }
        ],
        linkmanid: [
          { required: true, message: "联系人ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询来电处理列表 */
    getList() {
      this.loading = true;
      listCallchuli(this.queryParams).then(response => {
        this.callchuliList = response.rows;
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
        tel: null,
        customer: null,
        linkman: null,
        content: null,
        createman: null,
        createtime: null,
        ifchuli: null,
        chulitime: null,
        calltype: null,
        callertype: null,
        customerid: null,
        chulicontent: null,
        linkmanid: null
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
      this.title = "添加来电处理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCallchuli(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改来电处理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCallchuli(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCallchuli(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除来电处理编号为"' + ids + '"的数据项？').then(function() {
        return delCallchuli(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/callchuli/export', {
        ...this.queryParams
      }, `callchuli_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
