<template>
  <div class="stand">
    <div class="standTitle">人员折扣管理</div>
    <div class="contentForm">
      <el-form
        :inline="true"
        :model="ruleForm"
        class="demo-form-inline"
        label-width="25%"
        status-icon
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="人员折扣批号" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入人员折扣批号"></el-input>
        </el-form-item>

        <el-form-item label="人员" prop="num" >
          <el-input v-model="ruleForm.region" placeholder="请选择人员"></el-input>
        </el-form-item>

        <el-form-item label="人员类型" prop="staffType">
          <el-select v-model="ruleForm.staffType" placeholder="请选择人员类型" style="width:100%">
            <el-option label="店长" value="shanghai"></el-option>
            <el-option label="总监" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择状态" style="width:100%">
            <el-option label="草稿" value="0"></el-option>
            <el-option label="生效" value="1"></el-option>
            <el-option label="失效" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="contentBtn">
      <div style="padding: 0 2%;float: left;">
        <el-button type="primary" @click="onFind('ruleForm')">查询</el-button>
        <el-button type="primary" @click="onDelete('ruleForm')">清除</el-button>
      </div>
      <!-- <div style="padding: 0 2%;float: left;">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="text" class="textBtn">模板下载</el-button>
      </div> -->
      <Imp :listData="listData" />
    </div>

    <div class="contentTable">
      <template>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button @click="handleFind(scope.row,scope.$index)" type="primary" size="small" >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="人员折扣批号" width="150" align="center"></el-table-column>
          <el-table-column prop="address" label="人员姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="date" label="人员类型" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="价格折扣率" width="150" align="center"></el-table-column>
          <el-table-column prop="date" label="生效日期" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="失效日期" width="150" align="center"></el-table-column>
          <el-table-column prop="address" label="状态" width="150" align="center"></el-table-column>
          <el-table-column label="复制新增" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="small" >复制新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="20"
        layout="prev, pager, next, jumper,total"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Imp from "../../components/import"
import { personListFind, perListStateFind  } from "@/services/datablock.js";
export default {
  components: {
    Imp
  },
  data() {
    return {
      listData:{listFlag:"person",},//组件传参
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      ruleForm: {
        num:"",
        staff: "",
        staffType: "",
        state: "",
      },
      rules: {
        staff: [
          { required: true, message: "请输入人员", trigger: "blur" }
        ],
        staffType: [{ required: true, message: "请选择人员类型", trigger: "change" }],
        state: [
          { required: true, message: "请选择状态", trigger: "change" }
        ]
      },
      currentPage1: 1,//分页
    };
  },
  created() {
    document.title = "人员折扣列表";
    this.init();
  },
  methods: {
    init(){
      perListStateFind({}).then(res =>{
        console.log(res)
      })
    },
    onFind(formName) {//查询
      this.$refs[formName].validate((valid) => {
          if (valid) {
            personListFind(this.ruleForm).then(res =>{
            console.log(res)
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    },
    onDelete(formName) {//清除
      this.$refs[formName].resetFields();
    },
    add(){//新增
      this.$router.push('/personnelDiscountDetail')
    },
    handleClick(){//复制新增

    },
    handleFind(){//单个查询

    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
};
</script>

<style lang='scss' scoped>
// @import "../../assets/sass/index.scss";
.standTitle {
  background: #00bfff;
  height: 52px;
  line-height: 52px;
  font-size: 18px;
  padding-left: 1%;
  text-align: left;
}
.contentForm {
  width: 100%;
}
.demo-form-inline {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  flex-wrap: wrap;
}
.contentForm .el-form--inline .el-form-item {
  width: 30%;
}
.contentForm ::v-deep.el-form-item__content {
  //输入框宽度
  width: 70%;
}
.contentBtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0 20px 0;
}
.contentTable {
  width: 98%;
  margin: 0 auto;
}
.textBtn {//模板下载
  border-bottom: 1px solid #409eff;
  line-height: 0px;
}
.block {//分页
  text-align: right;
}
</style>
