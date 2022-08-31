<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="分类名称" prop="classname">
        <el-input
          v-model="queryParams.classname"
          placeholder="请输入分类名称"
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
          v-hasPermi="['crm-hr:xingzhengbanci:add']"
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
          v-hasPermi="['crm-hr:xingzhengbanci:edit']"
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
          v-hasPermi="['crm-hr:xingzhengbanci:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['crm-hr:xingzhengbanci:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="xingzhengbanciList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="分类名称" align="center" prop="classname" />
      <el-table-column label="职责时间" align="center" prop="dutytime" />
      <el-table-column label="开始打卡时间" align="center" prop="startcardtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startcardtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束打卡时间" align="center" prop="endcardtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endcardtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类管理一" align="center" prop="classmanageone" />
      <el-table-column label="分类管理二" align="center" prop="classmanagetwo" />
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
            v-hasPermi="['crm-hr:xingzhengbanci:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['crm-hr:xingzhengbanci:remove']"
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

    <!-- 添加或修改行政班次对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="分类名称" prop="classname">
          <el-input v-model="form.classname" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="职责时间" prop="dutytime">
          <el-input v-model="form.dutytime" placeholder="请输入职责时间" />
        </el-form-item>
        <el-form-item label="是否可开始时间" prop="isstarttimeenable">
          <el-radio v-model="form.isstarttimeenable" label="1">是</el-radio>
          <el-radio v-model="form.isstarttimeenable" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否可结束时间" prop="isendtimeenable">
          <el-radio v-model="form.isendtimeenable" label="1">是</el-radio>
          <el-radio v-model="form.isendtimeenable" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="开始打卡时间" prop="startcardtime">
          <el-date-picker clearable
            v-model="form.startcardtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始打卡时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束打卡时间" prop="endcardtime">
          <el-date-picker clearable
            v-model="form.endcardtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束打卡时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始延职打卡时间" prop="startdelaycardtime">
          <el-date-picker clearable
            v-model="form.startdelaycardtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始延职打卡时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束延职打卡时间" prop="enddelaycardtime">
          <el-date-picker clearable
            v-model="form.enddelaycardtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束延职打卡时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="延迟时间" prop="latertime">
          <el-date-picker clearable
            v-model="form.latertime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择延迟时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="早退时间" prop="earlytime">
          <el-date-picker clearable
            v-model="form.earlytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择早退时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班级管理一 prop="classmanageone">
          <el-input v-model="form.classmanageone" placeholder="请输入班级管理一" />
        </el-form-item>
        <el-form-item label="班级管理二" prop="classmanagetwo">
          <el-input v-model="form.classmanagetwo" placeholder="请输入班级管理二" />
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
import { listXingzhengbanci, getXingzhengbanci, delXingzhengbanci, addXingzhengbanci, updateXingzhengbanci } from "@/api/crm-hr/xingzhengbanci";

export default {
  name: "Xingzhengbanci",
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
      // 行政班次表格数据
      xingzhengbanciList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        classname: null,
        dutytime: null,
        isstarttimeenable: null,
        isendtimeenable: null,
        startcardtime: null,
        endcardtime: null,
        startdelaycardtime: null,
        enddelaycardtime: null,
        latertime: null,
        earlytime: null,
        classmanageone: null,
        classmanagetwo: null,
        memo: null,
        creator: null,
        createtime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        classname: [
          { required: true, message: "班级名称不能为空", trigger: "blur" }
        ],
        dutytime: [
          { required: true, message: "职责时间不能为空", trigger: "blur" }
        ],
        isstarttimeenable: [
          { required: true, message: "是否开始时间不能为空", trigger: "blur" }
        ],
        isendtimeenable: [
          { required: true, message: "是否结束时间不能为空", trigger: "blur" }
        ],
        startcardtime: [
          { required: true, message: "开始打卡时间不能为空", trigger: "blur" }
        ],
        endcardtime: [
          { required: true, message: "结束打卡时间不能为空", trigger: "blur" }
        ],
        startdelaycardtime: [
          { required: true, message: "开始延迟打卡时间不能为空", trigger: "blur" }
        ],
        enddelaycardtime: [
          { required: true, message: "结束延迟打卡时间不能为空", trigger: "blur" }
        ],
        latertime: [
          { required: true, message: "迟到时间不能为空", trigger: "blur" }
        ],
        earlytime: [
          { required: true, message: "早退时间不能为空", trigger: "blur" }
        ],
        classmanageone: [
          { required: true, message: "班级管理一不能为空", trigger: "blur" }
        ],
        classmanagetwo: [
          { required: true, message: "班级管理二不能为空", trigger: "blur" }
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
    /** 查询行政班次列表 */
    getList() {
      this.loading = true;
      listXingzhengbanci(this.queryParams).then(response => {
        this.xingzhengbanciList = response.rows;
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
        classname: null,
        dutytime: null,
        isstarttimeenable: null,
        isendtimeenable: null,
        startcardtime: null,
        endcardtime: null,
        startdelaycardtime: null,
        enddelaycardtime: null,
        latertime: null,
        earlytime: null,
        classmanageone: null,
        classmanagetwo: null,
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
      this.title = "添加行政班次";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getXingzhengbanci(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改行政班次";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateXingzhengbanci(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addXingzhengbanci(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除行政班次编号为"' + ids + '"的数据项？').then(function() {
        return delXingzhengbanci(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('crm-hr/xingzhengbanci/export', {
        ...this.queryParams
      }, `xingzhengbanci_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
