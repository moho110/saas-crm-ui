<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建人" prop="createman">
        <el-input
          v-model="queryParams.createman"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核人" prop="shenheman">
        <el-input
          v-model="queryParams.shenheman"
          placeholder="请输入审核人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提醒人" prop="tixingren">
        <el-input
          v-model="queryParams.tixingren"
          placeholder="请输入提醒人"
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
          v-hasPermi="['crm-customer:shenqingbaobei:add']"
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
          v-hasPermi="['crm-customer:shenqingbaobei:edit']"
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
          v-hasPermi="['crm-customer:shenqingbaobei:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-customer:shenqingbaobei:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="shenqingbaobeiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="客户ID" align="center" prop="customerid" />
      <el-table-column label="联系人ID" align="center" prop="linkmanid" />
      <el-table-column label="机会ID" align="center" prop="chanceid" />
      <el-table-column label="附件" align="center" prop="fujian" />
      <el-table-column label="创建人" align="center" prop="createman" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒人" align="center" prop="tixingren" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-customer:shenqingbaobei:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-customer:shenqingbaobei:remove']"
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

    <!-- 添加或修改申请报备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="客户ID" prop="customerid">
          <el-input v-model="form.customerid" placeholder="请输入客户ID" />
        </el-form-item>
        <el-form-item label="联系人ID" prop="linkmanid">
          <el-input v-model="form.linkmanid" placeholder="请输入联系人ID" />
        </el-form-item>
        <el-form-item label="机会ID" prop="chanceid">
          <el-input v-model="form.chanceid" placeholder="请输入机会ID" />
        </el-form-item>
        <el-form-item label="介绍" prop="introduce">
          <el-input v-model="form.introduce" type="textarea" placeholder="请输入介绍" />
        </el-form-item>
        <el-form-item label="支持" prop="zhichi">
          <el-input v-model="form.zhichi" placeholder="请输入支持" />
        </el-form-item>
        <el-form-item label="附件" prop="fujian">
          <el-input v-model="form.fujian" placeholder="请输入附件" />
        </el-form-item>
        <el-form-item label="创建人" prop="createman">
          <el-input v-model="form.createman" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="form.state" label="1">良好</el-radio>
          <el-radio v-model="form.state" label="0">一般</el-radio>
        </el-form-item>
        <el-form-item label="批阅" prop="piyu">
          <el-input v-model="form.piyu" placeholder="请输入批阅" />
        </el-form-item>
        <el-form-item label="审核人" prop="shenheman">
          <el-input v-model="form.shenheman" placeholder="请输入审核人" />
        </el-form-item>
        <el-form-item label="审核时间" prop="shenhetime">
          <el-date-picker clearable
            v-model="form.shenhetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="主体" prop="zhuti">
          <el-input v-model="form.zhuti" type="textarea" placeholder="请输入主体" />
        </el-form-item>
        <el-form-item label="提醒人" prop="tixingren">
          <el-input v-model="form.tixingren" placeholder="请输入提醒人" />
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
import { listShenqingbaobei, getShenqingbaobei, delShenqingbaobei, addShenqingbaobei, updateShenqingbaobei } from "@/api/crm-customer/shenqingbaobei";

export default {
  name: "Shenqingbaobei",
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
      // 申请报备表格数据
      shenqingbaobeiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        customerid: null,
        linkmanid: null,
        chanceid: null,
        introduce: null,
        zhichi: null,
        fujian: null,
        createman: null,
        createtime: null,
        state: null,
        piyu: null,
        shenheman: null,
        shenhetime: null,
        zhuti: null,
        tixingren: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerid: [
          { required: true, message: "客户ID不能为空", trigger: "blur" }
        ],
        linkmanid: [
          { required: true, message: "联系人ID不能为空", trigger: "blur" }
        ],
        chanceid: [
          { required: true, message: "机会ID不能为空", trigger: "blur" }
        ],
        introduce: [
          { required: true, message: "介绍不能为空", trigger: "blur" }
        ],
        zhichi: [
          { required: true, message: "支持不能为空", trigger: "blur" }
        ],
        fujian: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ],
        createman: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createtime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        state: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        piyu: [
          { required: true, message: "批阅不能为空", trigger: "blur" }
        ],
        shenheman: [
          { required: true, message: "审核人不能为空", trigger: "blur" }
        ],
        shenhetime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
        zhuti: [
          { required: true, message: "主体不能为空", trigger: "blur" }
        ],
        tixingren: [
          { required: true, message: "提醒人不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询申请报备列表 */
    getList() {
      this.loading = true;
      listShenqingbaobei(this.queryParams).then(response => {
        this.shenqingbaobeiList = response.rows;
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
        customerid: null,
        linkmanid: null,
        chanceid: null,
        introduce: null,
        zhichi: null,
        fujian: null,
        createman: null,
        createtime: null,
        state: null,
        piyu: null,
        shenheman: null,
        shenhetime: null,
        zhuti: null,
        tixingren: null
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
      this.title = "添加申请报备";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getShenqingbaobei(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改申请报备";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateShenqingbaobei(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addShenqingbaobei(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除申请报备编号为"' + ids + '"的数据项？').then(function() {
        return delShenqingbaobei(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-customer/shenqingbaobei/export', {
        ...this.queryParams
      }, `shenqingbaobei_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
