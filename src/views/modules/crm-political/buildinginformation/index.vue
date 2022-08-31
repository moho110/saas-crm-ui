<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="教学楼编号" prop="buildingno">
        <el-input
          v-model="queryParams.buildingno"
          placeholder="请输入教学楼编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="教学楼名称" prop="buildingname">
        <el-input
          v-model="queryParams.buildingname"
          placeholder="请输入教学楼名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开发商" prop="builder">
        <el-input
          v-model="queryParams.builder"
          placeholder="请输入开发商"
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
          v-hasPermi="['crm-political:buildinginformation:add']"
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
          v-hasPermi="['crm-political:buildinginformation:edit']"
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
          v-hasPermi="['crm-political:buildinginformation:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-political:buildinginformation:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="buildinginformationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="教学楼编号" align="center" prop="buildingno" />
      <el-table-column label="教学楼名称" align="center" prop="buildingname" />
      <el-table-column label="位置" align="center" prop="buildinglocate" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="教学楼结构" align="center" prop="buildingstruct" />
      <el-table-column label="开始日期" align="center" prop="startdate" />
      <el-table-column label="完成日期" align="center" prop="finishdate" />
      <el-table-column label="交付日期" align="center" prop="jiaofudate" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-political:buildinginformation:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-political:buildinginformation:remove']"
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

    <!-- 添加或修改房产信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="教学楼编号" prop="buildingno">
          <el-input v-model="form.buildingno" placeholder="请输入教学楼编号" />
        </el-form-item>
        <el-form-item label="教学楼名称" prop="buildingname">
          <el-input v-model="form.buildingname" placeholder="请输入教学楼名称" />
        </el-form-item>
        <el-form-item label="教学楼位置" prop="buildinglocate">
          <el-input v-model="form.buildinglocate" placeholder="请输入教学楼位置" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="教学楼结构" prop="buildingstruct">
          <el-input v-model="form.buildingstruct" placeholder="请输入教学楼结构" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio v-model="form.type" label="1">特殊</el-radio>
          <el-radio v-model="form.type" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="总数" prop="sum">
          <el-input v-model="form.sum" placeholder="请输入总数" />
        </el-form-item>
        <el-form-item label="开始日期" prop="startdate">
          <el-input v-model="form.startdate" placeholder="请输入开始日期" />
        </el-form-item>
        <el-form-item label="完成日期" prop="finishdate">
          <el-input v-model="form.finishdate" placeholder="请输入完成日期" />
        </el-form-item>
        <el-form-item label="交付日期" prop="jiaofudate">
          <el-input v-model="form.jiaofudate" placeholder="请输入交付日期" />
        </el-form-item>
        <el-form-item label="使用中" prop="usein">
          <el-input v-model="form.usein" placeholder="请输入使用中" />
        </el-form-item>
        <el-form-item label="面积" prop="area">
          <el-input v-model="form.area" placeholder="请输入面积" />
        </el-form-item>
        <el-form-item label="销售数量" prop="salednum">
          <el-input v-model="form.salednum" placeholder="请输入销售数量" />
        </el-form-item>
        <el-form-item label="出租数量" prop="rentnum">
          <el-input v-model="form.rentnum" placeholder="请输入出租数量" />
        </el-form-item>
        <el-form-item label="开发商" prop="builder">
          <el-input v-model="form.builder" placeholder="请输入开发商" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="操作管理" prop="optmanage">
          <el-input v-model="form.optmanage" placeholder="请输入操作管理" />
        </el-form-item>
        <el-form-item label="区域名称" prop="areaname">
          <el-input v-model="form.areaname" placeholder="请输入区域名称" />
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
import { listBuildinginformation, getBuildinginformation, delBuildinginformation, addBuildinginformation, updateBuildinginformation } from "@/api/crm-political/buildinginformation";

export default {
  name: "Buildinginformation",
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
      // 房产信息表格数据
      buildinginformationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        buildingno: null,
        buildingname: null,
        buildinglocate: null,
        unit: null,
        buildingstruct: null,
        type: null,
        sum: null,
        startdate: null,
        finishdate: null,
        jiaofudate: null,
        usein: null,
        area: null,
        salednum: null,
        rentnum: null,
        builder: null,
        creator: null,
        createtime: null,
        memo: null,
        optmanage: null,
        areaname: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        buildingno: [
          { required: true, message: "教学楼编号不能为空", trigger: "blur" }
        ],
        buildingname: [
          { required: true, message: "教学楼名称不能为空", trigger: "blur" }
        ],
        buildinglocate: [
          { required: true, message: "教学楼位置不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        buildingstruct: [
          { required: true, message: "教学楼结构不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        sum: [
          { required: true, message: "总数不能为空", trigger: "blur" }
        ],
        startdate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" }
        ],
        finishdate: [
          { required: true, message: "完成日期不能为空", trigger: "blur" }
        ],
        jiaofudate: [
          { required: true, message: "交付日期不能为空", trigger: "blur" }
        ],
        usein: [
          { required: true, message: "使用中不能为空", trigger: "blur" }
        ],
        area: [
          { required: true, message: "面积不能为空", trigger: "blur" }
        ],
        salednum: [
          { required: true, message: "销售数量不能为空", trigger: "blur" }
        ],
        rentnum: [
          { required: true, message: "出租数量不能为空", trigger: "blur" }
        ],
        builder: [
          { required: true, message: "开发商不能为空", trigger: "blur" }
        ],
        creator: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        memo: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        optmanage: [
          { required: true, message: "操作管理不能为空", trigger: "blur" }
        ],
        areaname: [
          { required: true, message: "区域名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询房产信息列表 */
    getList() {
      this.loading = true;
      listBuildinginformation(this.queryParams).then(response => {
        this.buildinginformationList = response.rows;
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
        buildingno: null,
        buildingname: null,
        buildinglocate: null,
        unit: null,
        buildingstruct: null,
        type: null,
        sum: null,
        startdate: null,
        finishdate: null,
        jiaofudate: null,
        usein: null,
        area: null,
        salednum: null,
        rentnum: null,
        builder: null,
        creator: null,
        createtime: null,
        memo: null,
        optmanage: null,
        areaname: null
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
      this.title = "添加房产信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBuildinginformation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改房产信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBuildinginformation(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBuildinginformation(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除房产信息编号为"' + ids + '"的数据项？').then(function() {
        return delBuildinginformation(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-political/buildinginformation/export', {
        ...this.queryParams
      }, `buildinginformation_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
