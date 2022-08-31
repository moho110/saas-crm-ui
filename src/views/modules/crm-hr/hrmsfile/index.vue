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
      <el-form-item label="部门" prop="indepartment">
        <el-input
          v-model="queryParams.indepartment"
          placeholder="请输入部门"
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
          v-hasPermi="['crm-hr:hrmsfile:add']"
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
          v-hasPermi="['crm-hr:hrmsfile:edit']"
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
          v-hasPermi="['crm-hr:hrmsfile:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:hrmsfile:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="hrmsfileList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="工作ID" align="center" prop="workid" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="部门" align="center" prop="indepartment" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:hrmsfile:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:hrmsfile:remove']"
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

    <!-- 添加或修改人事档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="工作ID" prop="workid">
          <el-input v-model="form.workid" placeholder="请输入工作ID" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="部门" prop="indepartment">
          <el-input v-model="form.indepartment" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="婚否" prop="marriage">
          <el-radio v-model="form.marriage" label="1">是</el-radio>
          <el-radio v-model="form.marriage" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker clearable
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="国籍" prop="national">
          <el-input v-model="form.national" placeholder="请输入国籍" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-input v-model="form.political" placeholder="请输入政治面貌" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idno">
          <el-input v-model="form.idno" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="户口" prop="hukou">
          <el-input v-model="form.hukou" placeholder="请输入户口" />
        </el-form-item>
        <el-form-item label="籍贯" prop="jiguan">
          <el-input v-model="form.jiguan" placeholder="请输入籍贯" />
        </el-form-item>
        <el-form-item label="保险号码" prop="insuranceno">
          <el-input v-model="form.insuranceno" placeholder="请输入保险号码" />
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入联系地址" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalcode">
          <el-input v-model="form.postalcode" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="学习经历" prop="studyexp">
          <el-input v-model="form.studyexp" placeholder="请输入学习经历" />
        </el-form-item>
        <el-form-item label="专业" prop="professional">
          <el-input v-model="form.professional" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="form.college" placeholder="请输入学院" />
        </el-form-item>
        <el-form-item label="职位" prop="staff">
          <el-input v-model="form.staff" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="职位名称" prop="staffname">
          <el-input v-model="form.staffname" placeholder="请输入职位名称" />
        </el-form-item>
        <el-form-item label="政治等级" prop="politicallevel">
          <el-input v-model="form.politicallevel" placeholder="请输入政治等级" />
        </el-form-item>
        <el-form-item label="计算机等级" prop="computerlevel">
          <el-input v-model="form.computerlevel" placeholder="请输入计算机等级" />
        </el-form-item>
        <el-form-item label="语言" prop="foreign">
          <el-input v-model="form.foreign" placeholder="请输入语言" />
        </el-form-item>
        <el-form-item label="外语等级" prop="foreignlevel">
          <el-input v-model="form.foreignlevel" placeholder="请输入外语等级" />
        </el-form-item>
        <el-form-item label="何时工作" prop="whenwork">
          <el-date-picker clearable
            v-model="form.whenwork"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择何时工作">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作时间" prop="worktime">
          <el-input v-model="form.worktime" placeholder="请输入工作时间" />
        </el-form-item>
        <el-form-item label="特殊" prop="special">
          <el-input v-model="form.special" type="textarea" placeholder="请输入特殊" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="附件" prop="attach">
          <el-input v-model="form.attach" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="照片" prop="photo">
          <el-input v-model="form.photo" placeholder="请输入照片" />
        </el-form-item>
        <el-form-item label="入职日期" prop="entryunitdate">
          <el-date-picker clearable
            v-model="form.entryunitdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入职日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单位工作时间" prop="unitworktime">
          <el-input v-model="form.unitworktime" placeholder="请输入单位工作时间" />
        </el-form-item>
        <el-form-item label="辞职日期" prop="quitdate">
          <el-date-picker clearable
            v-model="form.quitdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择辞职日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="现在合同日期" prop="nowcontractdate">
          <el-date-picker clearable
            v-model="form.nowcontractdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择现在合同日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="现在合同结束日期" prop="nowcontractenddate">
          <el-date-picker clearable
            v-model="form.nowcontractenddate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择现在合同结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退休日期" prop="tuixiudate">
          <el-date-picker clearable
            v-model="form.tuixiudate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择退休日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退休年龄" prop="tuixiuage">
          <el-input v-model="form.tuixiuage" placeholder="请输入退休年龄" />
        </el-form-item>
        <el-form-item label="工作形式" prop="workinformal">
          <el-input v-model="form.workinformal" placeholder="请输入工作形式" />
        </el-form-item>
        <el-form-item label="首次合同日期" prop="firstcontractdate">
          <el-date-picker clearable
            v-model="form.firstcontractdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择首次合同日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="技术等级" prop="techlevel">
          <el-input v-model="form.techlevel" placeholder="请输入技术等级" />
        </el-form-item>
        <el-form-item label="教学日期" prop="techexdate">
          <el-date-picker clearable
            v-model="form.techexdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择教学日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职员名称" prop="staffbyname">
          <el-input v-model="form.staffbyname" placeholder="请输入职员名称" />
        </el-form-item>
        <el-form-item label="职员评分" prop="stafftechscore">
          <el-input v-model="form.stafftechscore" placeholder="请输入职员评分" />
        </el-form-item>
        <el-form-item label="银行" prop="bank">
          <el-input v-model="form.bank" placeholder="请输入银行" />
        </el-form-item>
        <el-form-item label="银行帐号" prop="bankno">
          <el-input v-model="form.bankno" placeholder="请输入银行帐号" />
        </el-form-item>
        <el-form-item label="工资等级" prop="salarylevel">
          <el-input v-model="form.salarylevel" placeholder="请输入工资等级" />
        </el-form-item>
        <el-form-item label="职员生日" prop="staffyinlibirthday">
          <el-date-picker clearable
            v-model="form.staffyinlibirthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择职员生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="个人描述" prop="persondesp">
          <el-input v-model="form.persondesp" type="textarea" placeholder="请输入个人描述" />
        </el-form-item>
        <el-form-item label="护照" prop="passport">
          <el-input v-model="form.passport" placeholder="请输入护照" />
        </el-form-item>
        <el-form-item label="血型" prop="bloody">
          <el-input v-model="form.bloody" placeholder="请输入血型" />
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="form.height" placeholder="请输入身高" />
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入体重" />
        </el-form-item>
        <el-form-item label="视力" prop="eyesight">
          <el-input v-model="form.eyesight" placeholder="请输入视力" />
        </el-form-item>
        <el-form-item label="健康状况" prop="health">
          <el-input v-model="form.health" placeholder="请输入健康状况" />
        </el-form-item>
        <el-form-item label="驾照" prop="drivers">
          <el-input v-model="form.drivers" placeholder="请输入驾照" />
        </el-form-item>
        <el-form-item label="工作经历" prop="workexp">
          <el-input v-model="form.workexp" type="textarea" placeholder="请输入工作经历" />
        </el-form-item>
        <el-form-item label="工作经历附件" prop="workexpattach">
          <el-input v-model="form.workexpattach" placeholder="请输入工作经历附件" />
        </el-form-item>
        <el-form-item label="社会关系" prop="socialrelation">
          <el-input v-model="form.socialrelation" type="textarea" placeholder="请输入社会关系" />
        </el-form-item>
        <el-form-item label="社会关系附件" prop="socialrelationattach">
          <el-input v-model="form.socialrelationattach" placeholder="请输入社会关系附件" />
        </el-form-item>
        <el-form-item label="复职职员日期" prop="recoverstaffdate">
          <el-date-picker clearable
            v-model="form.recoverstaffdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择复职职员日期">
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
import { listHrmsfile, getHrmsfile, delHrmsfile, addHrmsfile, updateHrmsfile } from "@/api/crm-hr/hrmsfile";

export default {
  name: "Hrmsfile",
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
      // 人事档案表格数据
      hrmsfileList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        workid: null,
        name: null,
        indepartment: null,
        sex: null,
        marriage: null,
        birthday: null,
        national: null,
        political: null,
        idno: null,
        hukou: null,
        jiguan: null,
        insuranceno: null,
        address: null,
        postalcode: null,
        email: null,
        telephone: null,
        studyexp: null,
        professional: null,
        college: null,
        staff: null,
        staffname: null,
        politicallevel: null,
        computerlevel: null,
        foreign: null,
        foreignlevel: null,
        whenwork: null,
        worktime: null,
        workstatus: null,
        special: null,
        memo: null,
        attach: null,
        photo: null,
        entryunitdate: null,
        unitworktime: null,
        quitdate: null,
        nowcontractdate: null,
        nowcontractenddate: null,
        tuixiudate: null,
        tuixiuage: null,
        workinformal: null,
        firstcontractdate: null,
        techlevel: null,
        techexdate: null,
        stafftype: null,
        staffbyname: null,
        stafftechscore: null,
        bank: null,
        bankno: null,
        salarylevel: null,
        staffyinlibirthday: null,
        persondesp: null,
        passport: null,
        bloody: null,
        height: null,
        weight: null,
        eyesight: null,
        health: null,
        drivers: null,
        workexp: null,
        workexpattach: null,
        socialrelation: null,
        socialrelationattach: null,
        recoverstaffdate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        workid: [
          { required: true, message: "工作ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        indepartment: [
          { required: true, message: "入职部门不能为空", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "change" }
        ],
        marriage: [
          { required: true, message: "婚否不能为空", trigger: "blur" }
        ],
        birthday: [
          { required: true, message: "生日不能为空", trigger: "blur" }
        ],
        national: [
          { required: true, message: "国籍不能为空", trigger: "blur" }
        ],
        political: [
          { required: true, message: "政治面貌不能为空", trigger: "blur" }
        ],
        idno: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
        ],
        hukou: [
          { required: true, message: "户口不能为空", trigger: "blur" }
        ],
        jiguan: [
          { required: true, message: "籍贯不能为空", trigger: "blur" }
        ],
        insuranceno: [
          { required: true, message: "保险号不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        postalcode: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "电子邮件不能为空", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        studyexp: [
          { required: true, message: "学习经历不能为空", trigger: "blur" }
        ],
        professional: [
          { required: true, message: "专业不能为空", trigger: "blur" }
        ],
        college: [
          { required: true, message: "学院不能为空", trigger: "blur" }
        ],
        staff: [
          { required: true, message: "职位不能为空", trigger: "blur" }
        ],
        staffname: [
          { required: true, message: "职位名称不能为空", trigger: "blur" }
        ],
        politicallevel: [
          { required: true, message: "政治等级不能为空", trigger: "blur" }
        ],
        computerlevel: [
          { required: true, message: "计算机等级不能为空", trigger: "blur" }
        ],
        foreign: [
          { required: true, message: "外语不能为空", trigger: "blur" }
        ],
        foreignlevel: [
          { required: true, message: "外语等级不能为空", trigger: "blur" }
        ],
        whenwork: [
          { required: true, message: "何时工作不能为空", trigger: "blur" }
        ],
        worktime: [
          { required: true, message: "工作时间不能为空", trigger: "blur" }
        ],
        workstatus: [
          { required: true, message: "工作状态不能为空", trigger: "blur" }
        ],
        special: [
          { required: true, message: "特殊不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        attach: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ],
        photo: [
          { required: true, message: "照片不能为空", trigger: "blur" }
        ],
        entryunitdate: [
          { required: true, message: "入职日期不能为空", trigger: "blur" }
        ],
        unitworktime: [
          { required: true, message: "单位工作时间不能为空", trigger: "blur" }
        ],
        quitdate: [
          { required: true, message: "离职日期不能为空", trigger: "blur" }
        ],
        nowcontractdate: [
          { required: true, message: "现合同日期不能为空", trigger: "blur" }
        ],
        nowcontractenddate: [
          { required: true, message: "现合同结束日期不能为空", trigger: "blur" }
        ],
        tuixiudate: [
          { required: true, message: "退休日期不能为空", trigger: "blur" }
        ],
        tuixiuage: [
          { required: true, message: "退休年龄不能为空", trigger: "blur" }
        ],
        workinformal: [
          { required: true, message: "工作形式不能为空", trigger: "blur" }
        ],
        firstcontractdate: [
          { required: true, message: "首个合同日期不能为空", trigger: "blur" }
        ],
        techlevel: [
          { required: true, message: "技术等级不能为空", trigger: "blur" }
        ],
        techexdate: [
          { required: true, message: "技术日期不能为空", trigger: "blur" }
        ],
        stafftype: [
          { required: true, message: "职位类型不能为空", trigger: "change" }
        ],
        staffbyname: [
          { required: true, message: "职员名称不能为空", trigger: "blur" }
        ],
        stafftechscore: [
          { required: true, message: "职员评分不能为空", trigger: "blur" }
        ],
        bank: [
          { required: true, message: "银行不能为空", trigger: "blur" }
        ],
        bankno: [
          { required: true, message: "银行编号不能为空", trigger: "blur" }
        ],
        salarylevel: [
          { required: true, message: "工资等级不能为空", trigger: "blur" }
        ],
        staffyinlibirthday: [
          { required: true, message: "工资日期不能为空", trigger: "blur" }
        ],
        persondesp: [
          { required: true, message: "个人描述不能为空", trigger: "blur" }
        ],
        passport: [
          { required: true, message: "护照不能为空", trigger: "blur" }
        ],
        bloody: [
          { required: true, message: "血型不能为空", trigger: "blur" }
        ],
        height: [
          { required: true, message: "身高不能为空", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "体重不能为空", trigger: "blur" }
        ],
        eyesight: [
          { required: true, message: "视力不能为空", trigger: "blur" }
        ],
        health: [
          { required: true, message: "健康状况不能为空", trigger: "blur" }
        ],
        drivers: [
          { required: true, message: "驾照不能为空", trigger: "blur" }
        ],
        workexp: [
          { required: true, message: "工作经历不能为空", trigger: "blur" }
        ],
        workexpattach: [
          { required: true, message: "工作经历附件不能为空", trigger: "blur" }
        ],
        socialrelation: [
          { required: true, message: "社会关系不能为空", trigger: "blur" }
        ],
        socialrelationattach: [
          { required: true, message: "社会关系附件不能为空", trigger: "blur" }
        ],
        recoverstaffdate: [
          { required: true, message: "复职日期不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询人事档案列表 */
    getList() {
      this.loading = true;
      listHrmsfile(this.queryParams).then(response => {
        this.hrmsfileList = response.rows;
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
        workid: null,
        name: null,
        indepartment: null,
        sex: null,
        marriage: null,
        birthday: null,
        national: null,
        political: null,
        idno: null,
        hukou: null,
        jiguan: null,
        insuranceno: null,
        address: null,
        postalcode: null,
        email: null,
        telephone: null,
        studyexp: null,
        professional: null,
        college: null,
        staff: null,
        staffname: null,
        politicallevel: null,
        computerlevel: null,
        foreign: null,
        foreignlevel: null,
        whenwork: null,
        worktime: null,
        workstatus: "0",
        special: null,
        memo: null,
        attach: null,
        photo: null,
        entryunitdate: null,
        unitworktime: null,
        quitdate: null,
        nowcontractdate: null,
        nowcontractenddate: null,
        tuixiudate: null,
        tuixiuage: null,
        workinformal: null,
        firstcontractdate: null,
        techlevel: null,
        techexdate: null,
        stafftype: null,
        staffbyname: null,
        stafftechscore: null,
        bank: null,
        bankno: null,
        salarylevel: null,
        staffyinlibirthday: null,
        persondesp: null,
        passport: null,
        bloody: null,
        height: null,
        weight: null,
        eyesight: null,
        health: null,
        drivers: null,
        workexp: null,
        workexpattach: null,
        socialrelation: null,
        socialrelationattach: null,
        recoverstaffdate: null
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
      this.title = "添加人事档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHrmsfile(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改人事档案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHrmsfile(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHrmsfile(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除人事档案编号为"' + ids + '"的数据项？').then(function() {
        return delHrmsfile(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/hrmsfile/export', {
        ...this.queryParams
      }, `hrmsfile_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
