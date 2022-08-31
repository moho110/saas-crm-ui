<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="部门" prop="department">
        <el-input
          v-model="queryParams.department"
          placeholder="请输入部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员" prop="person">
        <el-input
          v-model="queryParams.person"
          placeholder="请输入人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员名称" prop="personname">
        <el-input
          v-model="queryParams.personname"
          placeholder="请输入人员名称"
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
          v-hasPermi="['crm-hr:kaoqinmingxi:add']"
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
          v-hasPermi="['crm-hr:kaoqinmingxi:edit']"
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
          v-hasPermi="['crm-hr:kaoqinmingxi:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:kaoqinmingxi:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="kaoqinmingxiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款" align="center" prop="term" />
      <el-table-column label="部门" align="center" prop="department" />
      <el-table-column label="人员" align="center" prop="person" />
      <el-table-column label="日期" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="周" align="center" prop="week" />
      <el-table-column label="日" align="center" prop="day" />
      <el-table-column label="分类" align="center" prop="class" />
      <el-table-column label="开始真实卡片" align="center" prop="startrealitycard" />
      <el-table-column label="开始考勤状态" align="center" prop="startkaoqinstatus" />
      <el-table-column label="结束真实卡片" align="center" prop="endrealitycard" />
      <el-table-column label="结束考勤状态" align="center" prop="endkaoqinstatus" />
      <el-table-column label="开始卡片" align="center" prop="startcardbgn" />
      <el-table-column label="结束卡片" align="center" prop="startcardend" />
      <el-table-column label="人员名称" align="center" prop="personname" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:kaoqinmingxi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:kaoqinmingxi:remove']"
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

    <!-- 添加或修改考勤明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款" prop="term">
          <el-input v-model="form.term" placeholder="请输入条款" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="人员" prop="person">
          <el-input v-model="form.person" placeholder="请输入人员" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker clearable
            v-model="form.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周" prop="week">
          <el-input v-model="form.week" placeholder="请输入周" />
        </el-form-item>
        <el-form-item label="日" prop="day">
          <el-input v-model="form.day" placeholder="请输入日" />
        </el-form-item>
        <el-form-item label="分类" prop="class">
          <el-input v-model="form.class" placeholder="请输入分类" />
        </el-form-item>
        <el-form-item label="开始真实卡片" prop="startrealitycard">
          <el-input v-model="form.startrealitycard" placeholder="请输入开始真实卡片" />
        </el-form-item>
        <el-form-item label="开始考勤状态" prop="startKaoqinStatus">
          <el-radio v-model="form.startKaoqinStatus" label="1">特殊</el-radio>
          <el-radio v-model="form.startKaoqinStatus" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="结束真实卡片" prop="endrealitycard">
          <el-input v-model="form.endrealitycard" placeholder="请输入结束真实卡片" />
        </el-form-item>
        <el-form-item label="结束考勤状态" prop="endKaoqinStatus">
          <el-radio v-model="form.endKaoqinStatus" label="1">特殊</el-radio>
          <el-radio v-model="form.endKaoqinStatus" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="开始卡片BGN" prop="startcardbgn">
          <el-input v-model="form.startcardbgn" placeholder="请输入开始卡片BGN" />
        </el-form-item>
        <el-form-item label="开始卡片END" prop="startcardend">
          <el-input v-model="form.startcardend" placeholder="请输入开始卡片END" />
        </el-form-item>
        <el-form-item label="结束卡片BGN" prop="endcartbgn">
          <el-input v-model="form.endcartbgn" placeholder="请输入结束卡片BGN" />
        </el-form-item>
        <el-form-item label="结束卡片END" prop="endcardend">
          <el-input v-model="form.endcardend" placeholder="请输入结束卡片END" />
        </el-form-item>
        <el-form-item label="开始延迟时间" prop="startdelaytime">
          <el-input v-model="form.startdelaytime" placeholder="请输入开始延迟时间" />
        </el-form-item>
        <el-form-item label="延迟分钟数" prop="delayminutesnum">
          <el-input v-model="form.delayminutesnum" placeholder="请输入延迟分钟数" />
        </el-form-item>
        <el-form-item label="延迟退出时间" prop="delayquittime">
          <el-input v-model="form.delayquittime" placeholder="请输入延迟退出时间" />
        </el-form-item>
        <el-form-item label="早退分钟数" prop="earlyquitminutesnum">
          <el-input v-model="form.earlyquitminutesnum" placeholder="请输入早退分钟数" />
        </el-form-item>
        <el-form-item label="人员名称" prop="personname">
          <el-input v-model="form.personname" placeholder="请输入人员名称" />
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
import { listKaoqinmingxi, getKaoqinmingxi, delKaoqinmingxi, addKaoqinmingxi, updateKaoqinmingxi } from "@/api/crm-hr/kaoqinmingxi";

export default {
  name: "Kaoqinmingxi",
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
      // 考勤明细表格数据
      kaoqinmingxiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        term: null,
        department: null,
        person: null,
        date: null,
        week: null,
        day: null,
        class: null,
        startrealitycard: null,
        startkaoqinstatus: null,
        endrealitycard: null,
        endkaoqinstatus: null,
        startcardbgn: null,
        startcardend: null,
        endcartbgn: null,
        endcardend: null,
        startdelaytime: null,
        delayminutesnum: null,
        delayquittime: null,
        earlyquitminutesnum: null,
        createtime: null,
        personname: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        term: [
          { required: true, message: "条款不能为空", trigger: "blur" }
        ],
        department: [
          { required: true, message: "部门不能为空", trigger: "blur" }
        ],
        person: [
          { required: true, message: "人员不能为空", trigger: "blur" }
        ],
        date: [
          { required: true, message: "日期不能为空", trigger: "blur" }
        ],
        week: [
          { required: true, message: "周不能为空", trigger: "blur" }
        ],
        day: [
          { required: true, message: "日不能为空", trigger: "blur" }
        ],
        class: [
          { required: true, message: "分类不能为空", trigger: "blur" }
        ],
        startrealitycard: [
          { required: true, message: "开始真实卡片不能为空", trigger: "blur" }
        ],
        startkaoqinstatus: [
          { required: true, message: "开始考勤状态不能为空", trigger: "blur" }
        ],
        endrealitycard: [
          { required: true, message: "结束真实卡片不能为空", trigger: "blur" }
        ],
        endkaoqinstatus: [
          { required: true, message: "结束考勤状态不能为空", trigger: "blur" }
        ],
        startcardbgn: [
          { required: true, message: "开始卡片BGN不能为空", trigger: "blur" }
        ],
        startcardend: [
          { required: true, message: "开始卡片END不能为空", trigger: "blur" }
        ],
        endcartbgn: [
          { required: true, message: "结束卡片BGN不能为空", trigger: "blur" }
        ],
        endcardend: [
          { required: true, message: "结束卡片END不能为空", trigger: "blur" }
        ],
        startdelaytime: [
          { required: true, message: "开始延迟时间不能为空", trigger: "blur" }
        ],
        delayminutesnum: [
          { required: true, message: "延迟分钟数不能为空", trigger: "blur" }
        ],
        delayquittime: [
          { required: true, message: "延迟退出时间不能为空", trigger: "blur" }
        ],
        earlyquitminutesnum: [
          { required: true, message: "退出分钟数不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        personname: [
          { required: true, message: "人员名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询考勤明细列表 */
    getList() {
      this.loading = true;
      listKaoqinmingxi(this.queryParams).then(response => {
        this.kaoqinmingxiList = response.rows;
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
        term: null,
        department: null,
        person: null,
        date: null,
        week: null,
        day: null,
        class: null,
        startrealitycard: null,
        startkaoqinstatus: "0",
        endrealitycard: null,
        endkaoqinstatus: "0",
        startcardbgn: null,
        startcardend: null,
        endcartbgn: null,
        endcardend: null,
        startdelaytime: null,
        delayminutesnum: null,
        delayquittime: null,
        earlyquitminutesnum: null,
        createtime: null,
        personname: null
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
      this.title = "添加考勤明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getKaoqinmingxi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改考勤明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateKaoqinmingxi(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addKaoqinmingxi(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除考勤明细编号为"' + ids + '"的数据项？').then(function() {
        return delKaoqinmingxi(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/kaoqinmingxi/export', {
        ...this.queryParams
      }, `kaoqinmingxi_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
