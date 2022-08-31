<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日历时间" prop="calTime">
        <el-date-picker clearable
          v-model="queryParams.calTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择日历时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束时间">
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
          v-hasPermi="['crm-mytable:calendar:add']"
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
          v-hasPermi="['crm-mytable:calendar:edit']"
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
          v-hasPermi="['crm-mytable:calendar:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-mytable:calendar:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="calendarList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="日历时间" align="center" prop="calTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.calTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日历类型" align="center" prop="calType" />
      <el-table-column label="日历等级" align="center" prop="calLevel" />
      <el-table-column label="管理ID" align="center" prop="managerId" />
      <el-table-column label="提醒时间" align="center" prop="tixingtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.tixingtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="URL地址" align="center" prop="url" />
      <el-table-column label="关联ID" align="center" prop="guanlianid" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-mytable:calendar:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-mytable:calendar:remove']"
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

    <!-- 添加或修改日程安排对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="日历时间" prop="calTime">
          <el-date-picker clearable
            v-model="form.calTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择日历时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="日程类型" prop="CAL_TYPE">
          <el-radio v-model="form.CAL_TYPE" label="1">特殊</el-radio>
          <el-radio v-model="form.CAL_TYPE" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="日历等级" prop="calLevel">
          <el-input v-model="form.calLevel" placeholder="请输入日历等级" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="管理ID" prop="managerId">
          <el-input v-model="form.managerId" placeholder="请输入管理ID" />
        </el-form-item>
        <el-form-item label="是否发送短信" prop="ifsms">
          <el-radio v-model="form.ifsms" label="1">是</el-radio>
          <el-radio v-model="form.ifsms" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="提醒时间" prop="tixingtime">
          <el-date-picker clearable
            v-model="form.tixingtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择提醒时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="URL地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入URL地址" />
        </el-form-item>
        <el-form-item label="关联ID" prop="guanlianid">
          <el-input v-model="form.guanlianid" placeholder="请输入关联ID" />
        </el-form-item>
        <el-form-item label="状态" prop="OVER_STATUS">
          <el-radio v-model="form.OVER_STATUS" label="1">特殊</el-radio>
          <el-radio v-model="form.OVER_STATUS" label="0">一般</el-radio>
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
import { listCalendar, getCalendar, delCalendar, addCalendar, updateCalendar } from "@/api/crm-mytable/calendar";

export default {
  name: "Calendar",
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
      // 日程安排表格数据
      calendarList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        calTime: null,
        endTime: null,
        calType: null,
        calLevel: null,
        content: null,
        managerId: null,
        overStatus: null,
        ifsms: null,
        tixingtime: null,
        url: null,
        guanlianid: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        calTime: [
          { required: true, message: "日历时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        calType: [
          { required: true, message: "日程类型不能为空", trigger: "change" }
        ],
        calLevel: [
          { required: true, message: "日程等级不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        managerId: [
          { required: true, message: "管理ID不能为空", trigger: "blur" }
        ],
        overStatus: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询日程安排列表 */
    getList() {
      this.loading = true;
      listCalendar(this.queryParams).then(response => {
        this.calendarList = response.rows;
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
        userId: null,
        calTime: null,
        endTime: null,
        calType: null,
        calLevel: null,
        content: null,
        managerId: null,
        overStatus: "0",
        ifsms: null,
        tixingtime: null,
        url: null,
        guanlianid: null
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
      this.title = "添加日程安排";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCalendar(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改日程安排";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCalendar(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCalendar(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除日程安排编号为"' + ids + '"的数据项？').then(function() {
        return delCalendar(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-mytable/calendar/export', {
        ...this.queryParams
      }, `calendar_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
