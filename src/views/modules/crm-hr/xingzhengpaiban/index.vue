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
      <el-form-item label="班级名称" prop="classname">
        <el-input
          v-model="queryParams.classname"
          placeholder="请输入班级名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="queryParams.creator"
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
          v-hasPermi="['crm-hr:xingzhengpaiban:add']"
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
          v-hasPermi="['crm-hr:xingzhengpaiban:edit']"
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
          v-hasPermi="['crm-hr:xingzhengpaiban:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:xingzhengpaiban:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="xingzhengpaibanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款名称" align="center" prop="termname" />
      <el-table-column label="周" align="center" prop="week" />
      <el-table-column label="日" align="center" prop="day" />
      <el-table-column label="考勤日期" align="center" prop="kaoqindate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.kaoqindate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级名称" align="center" prop="classname" />
      <el-table-column label="排班人" align="center" prop="paipanperson" />
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
            v-hasPermi="['crm-hr:xingzhengpaiban:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:xingzhengpaiban:remove']"
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

    <!-- 添加或修改行政排班对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款名称" prop="termname">
          <el-input v-model="form.termname" placeholder="请输入条款名称" />
        </el-form-item>
        <el-form-item label="周" prop="week">
          <el-input v-model="form.week" placeholder="请输入周" />
        </el-form-item>
        <el-form-item label="日" prop="day">
          <el-input v-model="form.day" placeholder="请输入日" />
        </el-form-item>
        <el-form-item label="考勤日期" prop="kaoqindate">
          <el-date-picker clearable
            v-model="form.kaoqindate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择考勤日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="form.classname" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="排班人" prop="paipanperson">
          <el-input v-model="form.paipanperson" type="textarea" placeholder="请输入排班人" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker clearable
            v-model="form.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
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
import { listXingzhengpaiban, getXingzhengpaiban, delXingzhengpaiban, addXingzhengpaiban, updateXingzhengpaiban } from "@/api/crm-hr/xingzhengpaiban";

export default {
  name: "Xingzhengpaiban",
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
      // 行政排班表格数据
      xingzhengpaibanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        termname: null,
        week: null,
        day: null,
        kaoqindate: null,
        classname: null,
        paipanperson: null,
        memo: null,
        creator: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        termname: [
          { required: true, message: "条款名称不能为空", trigger: "blur" }
        ],
        week: [
          { required: true, message: "周不能为空", trigger: "blur" }
        ],
        day: [
          { required: true, message: "日不能为空", trigger: "blur" }
        ],
        kaoqindate: [
          { required: true, message: "考勤不能为空", trigger: "blur" }
        ],
        classname: [
          { required: true, message: "班级名称不能为空", trigger: "blur" }
        ],
        paipanperson: [
          { required: true, message: "排班人不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政排班列表 */
    getList() {
      this.loading = true;
      listXingzhengpaiban(this.queryParams).then(response => {
        this.xingzhengpaibanList = response.rows;
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
        week: null,
        day: null,
        kaoqindate: null,
        classname: null,
        paipanperson: null,
        memo: null,
        creator: null,
        createtime: null
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
      this.title = "添加行政排班";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getXingzhengpaiban(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政排班";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXingzhengpaiban(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXingzhengpaiban(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政排班编号为"' + ids + '"的数据项？').then(function() {
        return delXingzhengpaiban(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/xingzhengpaiban/export', {
        ...this.queryParams
      }, `xingzhengpaiban_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
