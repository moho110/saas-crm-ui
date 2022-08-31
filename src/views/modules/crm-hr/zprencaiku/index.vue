<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input
          v-model="queryParams.contact"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号码" prop="idno">
        <el-input
          v-model="queryParams.idno"
          placeholder="请输入身份证号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="政治面貌" prop="political">
        <el-input
          v-model="queryParams.political"
          placeholder="请输入政治面貌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业" prop="professional">
        <el-input
          v-model="queryParams.professional"
          placeholder="请输入专业"
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
          v-hasPermi="['crm-hr:zprencaiku:add']"
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
          v-hasPermi="['crm-hr:zprencaiku:edit']"
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
          v-hasPermi="['crm-hr:zprencaiku:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:zprencaiku:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zprencaikuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="联系方式" align="center" prop="contact" />
      <el-table-column label="出生年月日" align="center" prop="birthday" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="政治面貌" align="center" prop="political" />
      <el-table-column label="籍贯" align="center" prop="jiguan" />
      <el-table-column label="院校" align="center" prop="college" />
      <el-table-column label="专业" align="center" prop="professional" />
      <el-table-column label="电子邮件" align="center" prop="email" />
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
            v-hasPermi="['crm-hr:zprencaiku:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:zprencaiku:remove']"
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

    <!-- 添加或修改招聘人才库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idno">
          <el-input v-model="form.idno" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="国籍" prop="national">
          <el-input v-model="form.national" placeholder="请输入国籍" />
        </el-form-item>
        <el-form-item label="出生年月日" prop="birthday">
          <el-date-picker clearable
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出生年月日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-input v-model="form.political" placeholder="请输入政治面貌" />
        </el-form-item>
        <el-form-item label="籍贯" prop="jiguan">
          <el-input v-model="form.jiguan" placeholder="请输入籍贯" />
        </el-form-item>
        <el-form-item label="户口所在地" prop="hukouinpos">
          <el-input v-model="form.hukouinpos" placeholder="请输入户口所在地" />
        </el-form-item>
        <el-form-item label="学习经历" prop="studyexp">
          <el-input v-model="form.studyexp" placeholder="请输入学习经历" />
        </el-form-item>
        <el-form-item label="职员名称" prop="staffname">
          <el-input v-model="form.staffname" placeholder="请输入职员名称" />
        </el-form-item>
        <el-form-item label="院校" prop="college">
          <el-input v-model="form.college" placeholder="请输入院校" />
        </el-form-item>
        <el-form-item label="专业" prop="professional">
          <el-input v-model="form.professional" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item label="第二专业" prop="secpro">
          <el-input v-model="form.secpro" placeholder="请输入第二专业" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="家庭电话" prop="familytelephone">
          <el-input v-model="form.familytelephone" placeholder="请输入家庭电话" />
        </el-form-item>
        <el-form-item label="家庭住址" prop="familyaddr">
          <el-input v-model="form.familyaddr" placeholder="请输入家庭住址" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalcode">
          <el-input v-model="form.postalcode" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="教育程度" prop="edution">
          <el-input v-model="form.edution" type="textarea" placeholder="请输入教育程度" />
        </el-form-item>
        <el-form-item label="工作经验" prop="workexp">
          <el-input v-model="form.workexp" type="textarea" placeholder="请输入工作经验" />
        </el-form-item>
        <el-form-item label="自我评估" prop="selfeval">
          <el-input v-model="form.selfeval" type="textarea" placeholder="请输入自我评估" />
        </el-form-item>
        <el-form-item label="英语能力" prop="englishabillity">
          <el-input v-model="form.englishabillity" placeholder="请输入英语能力" />
        </el-form-item>
        <el-form-item label="培训经历" prop="traingexp">
          <el-input v-model="form.traingexp" type="textarea" placeholder="请输入培训经历" />
        </el-form-item>
        <el-form-item label="照片" prop="photo">
          <el-input v-model="form.photo" placeholder="请输入照片" />
        </el-form-item>
        <el-form-item label="附件" prop="attach">
          <el-input v-model="form.attach" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="项目经历" prop="projectexp">
          <el-input v-model="form.projectexp" type="textarea" placeholder="请输入项目经历" />
        </el-form-item>
        <el-form-item label="求职信" prop="resumeletter">
          <el-input v-model="form.resumeletter" placeholder="请输入求职信" />
        </el-form-item>
        <el-form-item label="专业对象" prop="proobject">
          <el-input v-model="form.proobject" type="textarea" placeholder="请输入专业对象" />
        </el-form-item>
        <el-form-item label="录用状态" prop="proobject">
          <el-radio v-model="form.proobject" label="1">已录用</el-radio>
          <el-radio v-model="form.proobject" label="0">未录用</el-radio>
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
import { listZprencaiku, getZprencaiku, delZprencaiku, addZprencaiku, updateZprencaiku } from "@/api/crm-hr/zprencaiku";

export default {
  name: "Zprencaiku",
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
      // 招聘人才库表格数据
      zprencaikuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        sex: null,
        contact: null,
        idno: null,
        national: null,
        birthday: null,
        political: null,
        jiguan: null,
        hukouinpos: null,
        studyexp: null,
        staffname: null,
        college: null,
        professional: null,
        secpro: null,
        email: null,
        familytelephone: null,
        familyaddr: null,
        postalcode: null,
        edution: null,
        workexp: null,
        selfeval: null,
        englishabillity: null,
        traingexp: null,
        photo: null,
        attach: null,
        projectexp: null,
        resumeletter: null,
        proobject: null,
        luyongstatus: null,
        creator: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        contact: [
          { required: true, message: "联系方式不能为空", trigger: "blur" }
        ],
        idno: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
        ],
        national: [
          { required: true, message: "国籍不能为空", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "出生年月日不能为空", trigger: "blur" }
        ],
        political: [
          { required: true, message: "政治面貌不能为空", trigger: "blur" }
        ],
        jiguan: [
          { required: true, message: "籍贯不能为空", trigger: "blur" }
        ],
        hukouinpos: [
          { required: true, message: "户口所在地不能为空", trigger: "blur" }
        ],
        studyexp: [
          { required: true, message: "学习经历不能为空", trigger: "blur" }
        ],
        staffname: [
          { required: true, message: "职员名称不能为空", trigger: "blur" }
        ],
        college: [
          { required: true, message: "院校不能为空", trigger: "blur" }
        ],
        professional: [
          { required: true, message: "专业不能为空", trigger: "blur" }
        ],
        secpro: [
          { required: true, message: "第二专业不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "电子邮件不能为空", trigger: "blur" }
        ],
        familytelephone: [
          { required: true, message: "家庭电话不能为空", trigger: "blur" }
        ],
        familyaddr: [
          { required: true, message: "家庭地址不能为空", trigger: "blur" }
        ],
        postalcode: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
        ],
        edution: [
          { required: true, message: "教育程度不能为空", trigger: "blur" }
        ],
        workexp: [
          { required: true, message: "工作经历不能为空", trigger: "blur" }
        ],
        selfeval: [
          { required: true, message: "自我评估不能为空", trigger: "blur" }
        ],
        englishabillity: [
          { required: true, message: "英语能力不能为空", trigger: "blur" }
        ],
        traingexp: [
          { required: true, message: "培训经历不能为空", trigger: "blur" }
        ],
        photo: [
          { required: true, message: "照片不能为空", trigger: "blur" }
        ],
        attach: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ],
        projectexp: [
          { required: true, message: "项目经历不能为空", trigger: "blur" }
        ],
        resumeletter: [
          { required: true, message: "求职信不能为空", trigger: "blur" }
        ],
        proobject: [
          { required: true, message: "专业对象不能为空", trigger: "blur" }
        ],
        luyongstatus: [
          { required: true, message: "录用状态不能为空", trigger: "blur" }
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
    /** 查询招聘人才库列表 */
    getList() {
      this.loading = true;
      listZprencaiku(this.queryParams).then(response => {
        this.zprencaikuList = response.rows;
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
        name: null,
        sex: null,
        contact: null,
        idno: null,
        national: null,
        birthday: null,
        political: null,
        jiguan: null,
        hukouinpos: null,
        studyexp: null,
        staffname: null,
        college: null,
        professional: null,
        secpro: null,
        email: null,
        familytelephone: null,
        familyaddr: null,
        postalcode: null,
        edution: null,
        workexp: null,
        selfeval: null,
        englishabillity: null,
        traingexp: null,
        photo: null,
        attach: null,
        projectexp: null,
        resumeletter: null,
        proobject: null,
        luyongstatus: "0",
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
      this.title = "添加招聘人才库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getZprencaiku(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改招聘人才库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateZprencaiku(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZprencaiku(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除招聘人才库编号为"' + ids + '"的数据项？').then(function() {
        return delZprencaiku(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/zprencaiku/export', {
        ...this.queryParams
      }, `zprencaiku_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
