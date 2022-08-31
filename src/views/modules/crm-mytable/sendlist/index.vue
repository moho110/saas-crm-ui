<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="结果" prop="result">
        <el-input
          v-model="queryParams.result"
          placeholder="请输入结果"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="错误消息" prop="errmsg">
        <el-input
          v-model="queryParams.errmsg"
          placeholder="请输入错误消息"
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
          v-hasPermi="['crm-mytable:sendlist:add']"
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
          v-hasPermi="['crm-mytable:sendlist:edit']"
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
          v-hasPermi="['crm-mytable:sendlist:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:sendlist:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sendlistList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="消息" align="center" prop="msg" />
      <el-table-column label="当前时间" align="center" prop="nowtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.nowtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果" align="center" prop="result" />
      <el-table-column label="错误消息" align="center" prop="errmsg" />
      <el-table-column label="尝试次数" align="center" prop="trytimes" />
      <el-table-column label="用户ID" align="center" prop="userid" />
      <el-table-column label="批次ID" align="center" prop="batchid" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:sendlist:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:sendlist:remove']"
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

    <!-- 添加或修改短信发送清单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="消息" prop="msg">
          <el-input v-model="form.msg" placeholder="请输入消息" />
        </el-form-item>
        <el-form-item label="当前时间" prop="nowtime">
          <el-date-picker clearable
            v-model="form.nowtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择当前时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="顺时时间" prop="attime">
          <el-input v-model="form.attime" placeholder="请输入顺时时间" />
        </el-form-item>
        <el-form-item label="目标数量" prop="destcount">
          <el-input v-model="form.destcount" placeholder="请输入目标数量" />
        </el-form-item>
        <el-form-item label="结果" prop="result">
          <el-input v-model="form.result" placeholder="请输入结果" />
        </el-form-item>
        <el-form-item label="错误消息" prop="errmsg">
          <el-input v-model="form.errmsg" placeholder="请输入错误消息" />
        </el-form-item>
        <el-form-item label="尝试次数" prop="trytimes">
          <el-input v-model="form.trytimes" placeholder="请输入尝试次数" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userid">
          <el-input v-model="form.userid" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="批次ID" prop="batchid">
          <el-input v-model="form.batchid" placeholder="请输入批次ID" />
        </el-form-item>
        <el-form-item label="目标ID" prop="destid">
          <el-input v-model="form.destid" type="textarea" placeholder="请输入目标ID" />
        </el-form-item>
        <el-form-item label="数量" prop="leftcount">
          <el-input v-model="form.leftcount" placeholder="请输入数量" />
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
import { listSendlist, getSendlist, delSendlist, addSendlist, updateSendlist } from "@/api/crm-mytable/sendlist";

export default {
  name: "Sendlist",
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
      // 短信发送清单表格数据
      sendlistList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        msg: null,
        nowtime: null,
        attime: null,
        destcount: null,
        result: null,
        errmsg: null,
        trytimes: null,
        userid: null,
        batchid: null,
        destid: null,
        leftcount: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        msg: [
          { required: true, message: "消息不能为空", trigger: "blur" }
        ],
        nowtime: [
          { required: true, message: "当前时间不能为空", trigger: "blur" }
        ],
        attime: [
          { required: true, message: "顺时时间不能为空", trigger: "blur" }
        ],
        destcount: [
          { required: true, message: "目标数量不能为空", trigger: "blur" }
        ],
        result: [
          { required: true, message: "结果不能为空", trigger: "blur" }
        ],
        errmsg: [
          { required: true, message: "错误消息不能为空", trigger: "blur" }
        ],
        trytimes: [
          { required: true, message: "尝试次数不能为空", trigger: "blur" }
        ],
        userid: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        batchid: [
          { required: true, message: "批次ID不能为空", trigger: "blur" }
        ],
        destid: [
          { required: true, message: "目标ID不能为空", trigger: "blur" }
        ],
        leftcount: [
          { required: true, message: "数量不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询短信发送清单列表 */
    getList() {
      this.loading = true;
      listSendlist(this.queryParams).then(response => {
        this.sendlistList = response.rows;
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
        msg: null,
        nowtime: null,
        attime: null,
        destcount: null,
        result: null,
        errmsg: null,
        trytimes: null,
        userid: null,
        batchid: null,
        destid: null,
        leftcount: null
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
      this.title = "添加短信发送清单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSendlist(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改短信发送清单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSendlist(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSendlist(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除短信发送清单编号为"' + ids + '"的数据项？').then(function() {
        return delSendlist(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/sendlist/export', {
        ...this.queryParams
      }, `sendlist_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
