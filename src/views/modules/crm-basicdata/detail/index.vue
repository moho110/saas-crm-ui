<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="prodid">
        <el-input
          v-model="queryParams.prodid"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="prodname">
        <el-input
          v-model="queryParams.prodname"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="prodguige">
        <el-input
          v-model="queryParams.prodguige"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="prodxinghao">
        <el-input
          v-model="queryParams.prodxinghao"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="proddanwei">
        <el-input
          v-model="queryParams.proddanwei"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="zhekou">
        <el-input
          v-model="queryParams.zhekou"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="beizhu">
        <el-input
          v-model="queryParams.beizhu"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="mainrowid">
        <el-input
          v-model="queryParams.mainrowid"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="jine">
        <el-input
          v-model="queryParams.jine"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="oldprodid">
        <el-input
          v-model="queryParams.oldprodid"
          placeholder="请输入${comment}"
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
          v-hasPermi="['crm-basicdata:detail:add']"
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
          v-hasPermi="['crm-basicdata:detail:edit']"
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
          v-hasPermi="['crm-basicdata:detail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-basicdata:detail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="detailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="${comment}" align="center" prop="prodid" />
      <el-table-column label="${comment}" align="center" prop="prodname" />
      <el-table-column label="${comment}" align="center" prop="prodguige" />
      <el-table-column label="${comment}" align="center" prop="prodxinghao" />
      <el-table-column label="${comment}" align="center" prop="proddanwei" />
      <el-table-column label="${comment}" align="center" prop="price" />
      <el-table-column label="${comment}" align="center" prop="zhekou" />
      <el-table-column label="${comment}" align="center" prop="num" />
      <el-table-column label="${comment}" align="center" prop="beizhu" />
      <el-table-column label="${comment}" align="center" prop="mainrowid" />
      <el-table-column label="${comment}" align="center" prop="jine" />
      <el-table-column label="${comment}" align="center" prop="oldprodid" />
      <el-table-column label="${comment}" align="center" prop="opertype" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['crm-basicdata:detail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-basicdata:detail:remove']"
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

    <!-- 添加或修改产品组装明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="prodid">
          <el-input v-model="form.prodid" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="prodname">
          <el-input v-model="form.prodname" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="prodguige">
          <el-input v-model="form.prodguige" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="prodxinghao">
          <el-input v-model="form.prodxinghao" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="proddanwei">
          <el-input v-model="form.proddanwei" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="price">
          <el-input v-model="form.price" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="zhekou">
          <el-input v-model="form.zhekou" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="num">
          <el-input v-model="form.num" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="beizhu">
          <el-input v-model="form.beizhu" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="mainrowid">
          <el-input v-model="form.mainrowid" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="jine">
          <el-input v-model="form.jine" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="oldprodid">
          <el-input v-model="form.oldprodid" placeholder="请输入${comment}" />
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
import { listDetail, getDetail, delDetail, addDetail, updateDetail } from "@/api/crm-basicdata/detail";

export default {
  name: "Detail",
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
      // 产品组装明细表格数据
      detailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prodid: null,
        prodname: null,
        prodguige: null,
        prodxinghao: null,
        proddanwei: null,
        price: null,
        zhekou: null,
        num: null,
        beizhu: null,
        mainrowid: null,
        jine: null,
        oldprodid: null,
        opertype: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        prodid: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        prodname: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        prodguige: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        prodxinghao: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        proddanwei: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        zhekou: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        num: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        beizhu: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        mainrowid: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        jine: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        oldprodid: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        opertype: [
          { required: true, message: "$comment不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询产品组装明细列表 */
    getList() {
      this.loading = true;
      listDetail(this.queryParams).then(response => {
        this.detailList = response.rows;
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
        prodid: null,
        prodname: null,
        prodguige: null,
        prodxinghao: null,
        proddanwei: null,
        price: null,
        zhekou: null,
        num: null,
        beizhu: null,
        mainrowid: null,
        jine: null,
        oldprodid: null,
        opertype: null
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
      this.title = "添加产品组装明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品组装明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDetail(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDetail(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除产品组装明细编号为"' + ids + '"的数据项？').then(function() {
        return delDetail(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-basicdata/detail/export', {
        ...this.queryParams
      }, `detail_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
