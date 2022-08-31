<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="评测名称" prop="testname">
        <el-input
          v-model="queryParams.testname"
          placeholder="请输入评测名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评测人" prop="testmanby">
        <el-input
          v-model="queryParams.testmanby"
          placeholder="请输入评测人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="uit">
        <el-input
          v-model="queryParams.uit"
          placeholder="请输入单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职员" prop="staff">
        <el-input
          v-model="queryParams.staff"
          placeholder="请输入职员"
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
          v-hasPermi="['crm-hr:zhongcengrenyuan:add']"
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
          v-hasPermi="['crm-hr:zhongcengrenyuan:edit']"
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
          v-hasPermi="['crm-hr:zhongcengrenyuan:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:zhongcengrenyuan:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zhongcengrenyuanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="评测名称" align="center" prop="testname" />
      <el-table-column label="评测人" align="center" prop="testmanby" />
      <el-table-column label="单位" align="center" prop="uit" />
      <el-table-column label="职员" align="center" prop="staff" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:zhongcengrenyuan:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:zhongcengrenyuan:remove']"
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

    <!-- 添加或修改中层干部被评人员明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="评测名称" prop="testname">
          <el-input v-model="form.testname" placeholder="请输入评测名称" />
        </el-form-item>
        <el-form-item label="评测人" prop="testmanby">
          <el-input v-model="form.testmanby" placeholder="请输入评测人" />
        </el-form-item>
        <el-form-item label="单位" prop="uit">
          <el-input v-model="form.uit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="职员" prop="staff">
          <el-input v-model="form.staff" placeholder="请输入职员" />
        </el-form-item>
        <el-form-item label="品德描述" prop="pindedesp">
          <el-input v-model="form.pindedesp" type="textarea" placeholder="请输入品德描述" />
        </el-form-item>
        <el-form-item label="品德自我评测" prop="pindeself">
          <el-input v-model="form.pindeself" type="textarea" placeholder="请输入品德自我评测" />
        </el-form-item>
        <el-form-item label="能力描述" prop="abillitydesp">
          <el-input v-model="form.abillitydesp" type="textarea" placeholder="请输入能力描述" />
        </el-form-item>
        <el-form-item label="能力自我评测" prop="abillityself">
          <el-input v-model="form.abillityself" type="textarea" placeholder="请输入能力自我评测" />
        </el-form-item>
        <el-form-item label="学习描述" prop="studydesp">
          <el-input v-model="form.studydesp" type="textarea" placeholder="请输入学习描述" />
        </el-form-item>
        <el-form-item label="学习自我评测" prop="studyself">
          <el-input v-model="form.studyself" type="textarea" placeholder="请输入学习自我评测" />
        </el-form-item>
        <el-form-item label="绩效描述" prop="jixiaodesp">
          <el-input v-model="form.jixiaodesp" type="textarea" placeholder="请输入绩效描述" />
        </el-form-item>
        <el-form-item label="绩效自我评测" prop="jixiaoself">
          <el-input v-model="form.jixiaoself" type="textarea" placeholder="请输入绩效自我评测" />
        </el-form-item>
        <el-form-item label="廉政描述" prop="lianzhengdesp">
          <el-input v-model="form.lianzhengdesp" type="textarea" placeholder="请输入廉政描述" />
        </el-form-item>
        <el-form-item label="廉政自我评测" prop="lianzhengself">
          <el-input v-model="form.lianzhengself" type="textarea" placeholder="请输入廉政自我评测" />
        </el-form-item>
        <el-form-item label="附件" prop="attach">
          <el-input v-model="form.attach" type="textarea" placeholder="请输入附件" />
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
import { listZhongcengrenyuan, getZhongcengrenyuan, delZhongcengrenyuan, addZhongcengrenyuan, updateZhongcengrenyuan } from "@/api/crm-hr/zhongcengrenyuan";

export default {
  name: "Zhongcengrenyuan",
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
      // 中层干部被评人员明细表格数据
      zhongcengrenyuanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        testname: null,
        testmanby: null,
        uit: null,
        staff: null,
        pindedesp: null,
        pindeself: null,
        abillitydesp: null,
        abillityself: null,
        studydesp: null,
        studyself: null,
        jixiaodesp: null,
        jixiaoself: null,
        lianzhengdesp: null,
        lianzhengself: null,
        attach: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        testname: [
          { required: true, message: "评测名称不能为空", trigger: "blur" }
        ],
        testmanby: [
          { required: true, message: "评测人不能为空", trigger: "blur" }
        ],
        uit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        staff: [
          { required: true, message: "职员不能为空", trigger: "blur" }
        ],
        pindedesp: [
          { required: true, message: "品德描述不能为空", trigger: "blur" }
        ],
        pindeself: [
          { required: true, message: "品德自我评价不能为空", trigger: "blur" }
        ],
        abillitydesp: [
          { required: true, message: "能力描述不能为空", trigger: "blur" }
        ],
        abillityself: [
          { required: true, message: "能力自我评价不能为空", trigger: "blur" }
        ],
        studydesp: [
          { required: true, message: "学习描述不能为空", trigger: "blur" }
        ],
        studyself: [
          { required: true, message: "学习自我评测不能为空", trigger: "blur" }
        ],
        jixiaodesp: [
          { required: true, message: "绩效描述不能为空", trigger: "blur" }
        ],
        jixiaoself: [
          { required: true, message: "绩效自我评测不能为空", trigger: "blur" }
        ],
        lianzhengdesp: [
          { required: true, message: "廉政描述不能为空", trigger: "blur" }
        ],
        lianzhengself: [
          { required: true, message: "廉政自我评测不能为空", trigger: "blur" }
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
    /** 查询中层干部被评人员明细列表 */
    getList() {
      this.loading = true;
      listZhongcengrenyuan(this.queryParams).then(response => {
        this.zhongcengrenyuanList = response.rows;
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
        testname: null,
        testmanby: null,
        uit: null,
        staff: null,
        pindedesp: null,
        pindeself: null,
        abillitydesp: null,
        abillityself: null,
        studydesp: null,
        studyself: null,
        jixiaodesp: null,
        jixiaoself: null,
        lianzhengdesp: null,
        lianzhengself: null,
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
      this.title = "添加中层干部被评人员明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getZhongcengrenyuan(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改中层干部被评人员明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateZhongcengrenyuan(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZhongcengrenyuan(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除中层干部被评人员明细编号为"' + ids + '"的数据项？').then(function() {
        return delZhongcengrenyuan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/zhongcengrenyuan/export', {
        ...this.queryParams
      }, `zhongcengrenyuan_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
