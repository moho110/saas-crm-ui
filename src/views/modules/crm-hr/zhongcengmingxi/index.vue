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
      <el-form-item label="职员" prop="staff">
        <el-input
          v-model="queryParams.staff"
          placeholder="请输入职员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="评价人" prop="pingjiaman">
        <el-input
          v-model="queryParams.pingjiaman"
          placeholder="请输入评价人"
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
          v-hasPermi="['crm-hr:zhongcengmingxi:add']"
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
          v-hasPermi="['crm-hr:zhongcengmingxi:edit']"
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
          v-hasPermi="['crm-hr:zhongcengmingxi:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:zhongcengmingxi:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zhongcengmingxiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="评测名称" align="center" prop="testname" />
      <el-table-column label="评测人" align="center" prop="testmanby" />
      <el-table-column label="单位" align="center" prop="uit" />
      <el-table-column label="职员" align="center" prop="staff" />
      <el-table-column label="品德评估" align="center" prop="pindeevl" />
      <el-table-column label="学习评价" align="center" prop="studypingjia" />
      <el-table-column label="绩效评价" align="center" prop="jixiaopingjia" />
      <el-table-column label="评价人" align="center" prop="pingjiaman" />
      <el-table-column label="评价时间" align="center" prop="pingjiatime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-hr:zhongcengmingxi:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:zhongcengmingxi:remove']"
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

    <!-- 添加或修改中层干部测评内容明细对话框 -->
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
        <el-form-item label="品德评估" prop="pindeevl">
          <el-input v-model="form.pindeevl" placeholder="请输入品德评估" />
        </el-form-item>
        <el-form-item label="品德备注" prop="pindememo">
          <el-input v-model="form.pindememo" placeholder="请输入品德备注" />
        </el-form-item>
        <el-form-item label="能力评价" prop="abillitypingjia">
          <el-input v-model="form.abillitypingjia" placeholder="请输入能力评价" />
        </el-form-item>
        <el-form-item label="能力备注" prop="abillitymemo">
          <el-input v-model="form.abillitymemo" placeholder="请输入能力备注" />
        </el-form-item>
        <el-form-item label="学习评价" prop="studypingjia">
          <el-input v-model="form.studypingjia" placeholder="请输入学习评价" />
        </el-form-item>
        <el-form-item label="学习备注" prop="studymemo">
          <el-input v-model="form.studymemo" placeholder="请输入学习备注" />
        </el-form-item>
        <el-form-item label="绩效评价" prop="jixiaopingjia">
          <el-input v-model="form.jixiaopingjia" placeholder="请输入绩效评价" />
        </el-form-item>
        <el-form-item label="绩效备注" prop="jixiaomemo">
          <el-input v-model="form.jixiaomemo" placeholder="请输入绩效备注" />
        </el-form-item>
        <el-form-item label="廉政评价" prop="lianzhengpingjia">
          <el-input v-model="form.lianzhengpingjia" placeholder="请输入廉政评价" />
        </el-form-item>
        <el-form-item label="廉政备注" prop="lianzhengmemo">
          <el-input v-model="form.lianzhengmemo" placeholder="请输入廉政备注" />
        </el-form-item>
        <el-form-item label="评价人" prop="pingjiaman">
          <el-input v-model="form.pingjiaman" placeholder="请输入评价人" />
        </el-form-item>
        <el-form-item label="评价时间" prop="pingjiatime">
          <el-input v-model="form.pingjiatime" placeholder="请输入评价时间" />
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
import { listZhongcengmingxi, getZhongcengmingxi, delZhongcengmingxi, addZhongcengmingxi, updateZhongcengmingxi } from "@/api/crm-hr/zhongcengmingxi";

export default {
  name: "Zhongcengmingxi",
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
      // 中层干部测评内容明细表格数据
      zhongcengmingxiList: [],
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
        pindeevl: null,
        pindememo: null,
        abillitypingjia: null,
        abillitymemo: null,
        studypingjia: null,
        studymemo: null,
        jixiaopingjia: null,
        jixiaomemo: null,
        lianzhengpingjia: null,
        lianzhengmemo: null,
        pingjiaman: null,
        pingjiatime: null
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
        pindeevl: [
          { required: true, message: "品德评估不能为空", trigger: "blur" }
        ],
        pindememo: [
          { required: true, message: "品德备注不能为空", trigger: "blur" }
        ],
        abillitypingjia: [
          { required: true, message: "能力评价不能为空", trigger: "blur" }
        ],
        abillitymemo: [
          { required: true, message: "能力备注不能为空", trigger: "blur" }
        ],
        studypingjia: [
          { required: true, message: "学习评价不能为空", trigger: "blur" }
        ],
        studymemo: [
          { required: true, message: "学习备注不能为空", trigger: "blur" }
        ],
        jixiaopingjia: [
          { required: true, message: "绩效评价不能为空", trigger: "blur" }
        ],
        jixiaomemo: [
          { required: true, message: "绩效备注不能为空", trigger: "blur" }
        ],
        lianzhengpingjia: [
          { required: true, message: "廉政评价不能为空", trigger: "blur" }
        ],
        lianzhengmemo: [
          { required: true, message: "廉政备注不能为空", trigger: "blur" }
        ],
        pingjiaman: [
          { required: true, message: "评价人不能为空", trigger: "blur" }
        ],
        pingjiatime: [
          { required: true, message: "评价时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询中层干部测评内容明细列表 */
    getList() {
      this.loading = true;
      listZhongcengmingxi(this.queryParams).then(response => {
        this.zhongcengmingxiList = response.rows;
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
        pindeevl: null,
        pindememo: null,
        abillitypingjia: null,
        abillitymemo: null,
        studypingjia: null,
        studymemo: null,
        jixiaopingjia: null,
        jixiaomemo: null,
        lianzhengpingjia: null,
        lianzhengmemo: null,
        pingjiaman: null,
        pingjiatime: null
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
      this.title = "添加中层干部测评内容明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getZhongcengmingxi(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改中层干部测评内容明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateZhongcengmingxi(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZhongcengmingxi(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除中层干部测评内容明细编号为"' + ids + '"的数据项？').then(function() {
        return delZhongcengmingxi(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/zhongcengmingxi/export', {
        ...this.queryParams
      }, `zhongcengmingxi_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
