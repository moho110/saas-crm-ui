<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="条款" prop="term">
        <el-input
          v-model="queryParams.term"
          placeholder="请输入条款"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名称" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入用户名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
          v-hasPermi="['crm-hr:yearcheck:add']"
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
          v-hasPermi="['crm-hr:yearcheck:edit']"
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
          v-hasPermi="['crm-hr:yearcheck:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:yearcheck:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="yearcheckList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="条款" align="center" prop="term" />
      <el-table-column label="用户名称" align="center" prop="username" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="教室" align="center" prop="classroom" />
      <el-table-column label="刻章" align="center" prop="kezhang" />
      <el-table-column label="品德态度能力分数" align="center" prop="pindetaiduabillityscore" />
      <el-table-column label="出勤分数" align="center" prop="chuqinscore" />
      <el-table-column label="工作质量分数" align="center" prop="workquantityscore" />
      <el-table-column label="工作流" align="center" prop="workflow" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:yearcheck:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:yearcheck:remove']"
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

    <!-- 添加或修改行政人员年度考核量化表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="条款" prop="term">
          <el-input v-model="form.term" placeholder="请输入条款" />
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="教室" prop="classroom">
          <el-input v-model="form.classroom" placeholder="请输入教室" />
        </el-form-item>
        <el-form-item label="刻章" prop="kezhang">
          <el-input v-model="form.kezhang" placeholder="请输入刻章" />
        </el-form-item>
        <el-form-item label="品德态度能力分数" prop="pindetaiduabillityscore">
          <el-input v-model="form.pindetaiduabillityscore" placeholder="请输入品德态度能力分数" />
        </el-form-item>
        <el-form-item label="出勤分数" prop="chuqinscore">
          <el-input v-model="form.chuqinscore" placeholder="请输入出勤分数" />
        </el-form-item>
        <el-form-item label="工作数量分数" prop="workquantityscore">
          <el-input v-model="form.workquantityscore" placeholder="请输入工作数量分数" />
        </el-form-item>
        <el-form-item label="工作纪律分数" prop="workjilvscore">
          <el-input v-model="form.workjilvscore" placeholder="请输入工作纪律分数" />
        </el-form-item>
        <el-form-item label="工作特征分数" prop="workspecscore">
          <el-input v-model="form.workspecscore" placeholder="请输入工作特征分数" />
        </el-form-item>
        <el-form-item label="工作效果分数" prop="workxiaoguoscore">
          <el-input v-model="form.workxiaoguoscore" placeholder="请输入工作效果分数" />
        </el-form-item>
        <el-form-item label="班主任分数" prop="banzhurenscore">
          <el-input v-model="form.banzhurenscore" placeholder="请输入班主任分数" />
        </el-form-item>
        <el-form-item label="临时工作分数" prop="tempworkscore">
          <el-input v-model="form.tempworkscore" placeholder="请输入临时工作分数" />
        </el-form-item>
        <el-form-item label="论文分数" prop="thesisscore">
          <el-input v-model="form.thesisscore" placeholder="请输入论文分数" />
        </el-form-item>
        <el-form-item label="教学分数" prop="teachingscore">
          <el-input v-model="form.teachingscore" placeholder="请输入教学分数" />
        </el-form-item>
        <el-form-item label="总计分数" prop="sumscore">
          <el-input v-model="form.sumscore" placeholder="请输入总计分数" />
        </el-form-item>
        <el-form-item label="审核时间" prop="extime">
          <el-date-picker clearable
            v-model="form.extime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品德能力分数" prop="pindeabillityscore">
          <el-input v-model="form.pindeabillityscore" placeholder="请输入品德能力分数" />
        </el-form-item>
        <el-form-item label="出勤表现分数" prop="chuqinbiaoxianscore">
          <el-input v-model="form.chuqinbiaoxianscore" placeholder="请输入出勤表现分数" />
        </el-form-item>
        <el-form-item label="工作审核分数" prop="workexscore">
          <el-input v-model="form.workexscore" placeholder="请输入工作审核分数" />
        </el-form-item>
        <el-form-item label="工作纪律审核分数" prop="workjilvexscore">
          <el-input v-model="form.workjilvexscore" placeholder="请输入工作纪律审核分数" />
        </el-form-item>
        <el-form-item label="工作特征审核分数" prop="workspecexscore">
          <el-input v-model="form.workspecexscore" placeholder="请输入工作特征审核分数" />
        </el-form-item>
        <el-form-item label="工作效果审核分数" prop="workxiaoguoexscore">
          <el-input v-model="form.workxiaoguoexscore" placeholder="请输入工作效果审核分数" />
        </el-form-item>
        <el-form-item label="班主任工作审核分数" prop="banzhurenworkexscore">
          <el-input v-model="form.banzhurenworkexscore" placeholder="请输入班主任工作审核分数" />
        </el-form-item>
        <el-form-item label="临时工作审核分数" prop="tempworkexscore">
          <el-input v-model="form.tempworkexscore" placeholder="请输入临时工作审核分数" />
        </el-form-item>
        <el-form-item label="论文审核分数" prop="thesisexscore">
          <el-input v-model="form.thesisexscore" placeholder="请输入论文审核分数" />
        </el-form-item>
        <el-form-item label="教学审核分数" prop="techingexscore">
          <el-input v-model="form.techingexscore" placeholder="请输入教学审核分数" />
        </el-form-item>
        <el-form-item label="总计审核分数" prop="sumexscore">
          <el-input v-model="form.sumexscore" placeholder="请输入总计审核分数" />
        </el-form-item>
        <el-form-item label="科室评分人" prop="keshiscoreman">
          <el-input v-model="form.keshiscoreman" placeholder="请输入科室评分人" />
        </el-form-item>
        <el-form-item label="教室评分时间" prop="classroomscoretime">
          <el-date-picker clearable
            v-model="form.classroomscoretime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择教室评分时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作流" prop="workflow">
          <el-input v-model="form.workflow" placeholder="请输入工作流" />
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
import { listYearcheck, getYearcheck, delYearcheck, addYearcheck, updateYearcheck } from "@/api/crm-hr/yearcheck";

export default {
  name: "Yearcheck",
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
      // 行政人员年度考核量化表表格数据
      yearcheckList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        term: null,
        username: null,
        name: null,
        classroom: null,
        kezhang: null,
        pindetaiduabillityscore: null,
        chuqinscore: null,
        workquantityscore: null,
        workjilvscore: null,
        workspecscore: null,
        workxiaoguoscore: null,
        banzhurenscore: null,
        tempworkscore: null,
        thesisscore: null,
        teachingscore: null,
        sumscore: null,
        extime: null,
        pindeabillityscore: null,
        chuqinbiaoxianscore: null,
        workexscore: null,
        workjilvexscore: null,
        workspecexscore: null,
        workxiaoguoexscore: null,
        banzhurenworkexscore: null,
        tempworkexscore: null,
        thesisexscore: null,
        techingexscore: null,
        sumexscore: null,
        keshiscoreman: null,
        classroomscoretime: null,
        workflow: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        term: [
          { required: true, message: "条款不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        classroom: [
          { required: true, message: "教室不能为空", trigger: "blur" }
        ],
        kezhang: [
          { required: true, message: "刻章不能为空", trigger: "blur" }
        ],
        pindetaiduabillityscore: [
          { required: true, message: "品德态度能力分数不能为空", trigger: "blur" }
        ],
        chuqinscore: [
          { required: true, message: "出勤分数不能为空", trigger: "blur" }
        ],
        workquantityscore: [
          { required: true, message: "工作数量分数不能为空", trigger: "blur" }
        ],
        workjilvscore: [
          { required: true, message: "工作纪律分数不能为空", trigger: "blur" }
        ],
        workspecscore: [
          { required: true, message: "工作特征分数不能为空", trigger: "blur" }
        ],
        workxiaoguoscore: [
          { required: true, message: "工作效果分数不能为空", trigger: "blur" }
        ],
        banzhurenscore: [
          { required: true, message: "班主任分数不能为空", trigger: "blur" }
        ],
        tempworkscore: [
          { required: true, message: "临时工作分数不能为空", trigger: "blur" }
        ],
        thesisscore: [
          { required: true, message: "论文分数不能为空", trigger: "blur" }
        ],
        teachingscore: [
          { required: true, message: "教学分数不能为空", trigger: "blur" }
        ],
        sumscore: [
          { required: true, message: "总计分数不能为空", trigger: "blur" }
        ],
        extime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        pindeabillityscore: [
          { required: true, message: "品德能力分数不能为空", trigger: "blur" }
        ],
        chuqinbiaoxianscore: [
          { required: true, message: "出勤表现分数不能为空", trigger: "blur" }
        ],
        workexscore: [
          { required: true, message: "工作审核分数不能为空", trigger: "blur" }
        ],
        workjilvexscore: [
          { required: true, message: "工作纪律审核分数不能为空", trigger: "blur" }
        ],
        workspecexscore: [
          { required: true, message: "工作特征审核分数不能为空", trigger: "blur" }
        ],
        workxiaoguoexscore: [
          { required: true, message: "工作效果审核分数不能为空", trigger: "blur" }
        ],
        banzhurenworkexscore: [
          { required: true, message: "班主任工作审核分数不能为空", trigger: "blur" }
        ],
        tempworkexscore: [
          { required: true, message: "临时工作审核分数不能为空", trigger: "blur" }
        ],
        thesisexscore: [
          { required: true, message: "论文审核分数不能为空", trigger: "blur" }
        ],
        techingexscore: [
          { required: true, message: "教学审核分数不能为空", trigger: "blur" }
        ],
        sumexscore: [
          { required: true, message: "总计审核分数不能为空", trigger: "blur" }
        ],
        keshiscoreman: [
          { required: true, message: "科室评分人不能为空", trigger: "blur" }
        ],
        classroomscoretime: [
          { required: true, message: "教室评分时间不能为空", trigger: "blur" }
        ],
        workflow: [
          { required: true, message: "工作流不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询行政人员年度考核量化表列表 */
    getList() {
      this.loading = true;
      listYearcheck(this.queryParams).then(response => {
        this.yearcheckList = response.rows;
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
        username: null,
        name: null,
        classroom: null,
        kezhang: null,
        pindetaiduabillityscore: null,
        chuqinscore: null,
        workquantityscore: null,
        workjilvscore: null,
        workspecscore: null,
        workxiaoguoscore: null,
        banzhurenscore: null,
        tempworkscore: null,
        thesisscore: null,
        teachingscore: null,
        sumscore: null,
        extime: null,
        pindeabillityscore: null,
        chuqinbiaoxianscore: null,
        workexscore: null,
        workjilvexscore: null,
        workspecexscore: null,
        workxiaoguoexscore: null,
        banzhurenworkexscore: null,
        tempworkexscore: null,
        thesisexscore: null,
        techingexscore: null,
        sumexscore: null,
        keshiscoreman: null,
        classroomscoretime: null,
        workflow: null
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
      this.title = "添加行政人员年度考核量化表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getYearcheck(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政人员年度考核量化表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateYearcheck(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addYearcheck(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政人员年度考核量化表编号为"' + ids + '"的数据项？').then(function() {
        return delYearcheck(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/yearcheck/export', {
        ...this.queryParams
      }, `yearcheck_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
