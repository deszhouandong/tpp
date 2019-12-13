<template>
  <div class="stand">
    <div class="standTitle">区域价格管理</div>
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
        <el-form-item label="区域价格批号" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入标准价格批号" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="业务类型" prop="business">
          <el-select v-model="ruleForm.business" placeholder="请选择业务类型" style="width:100%">
            <el-option label="租赁" value="1"></el-option>
            <el-option label="销售" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="事业部" prop="cause">
          <el-select v-model="ruleForm.cause" filterable placeholder="请选择事业部" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产类别" prop="assets">
          <el-select v-model="ruleForm.assets" placeholder="请选择资产类别" style="width:100%">
            <el-option label="设备" value="1"></el-option>
            <el-option label="材料" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备型号" prop="equipment">
          <el-select v-model="ruleForm.equipment" placeholder="请输入设备型号" style="width:100%">
            <el-option label="设备" value="1"></el-option>
            <el-option label="材料" value="2"></el-option>
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
          <el-table-column prop="name" label="区域价格批号" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="业务类型" width="120" align="center"></el-table-column>
          <el-table-column prop="date" label="事业部" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="营业店" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="资产类别" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="设备/材料型号" width="120" align="center"></el-table-column>
          <el-table-column prop="date" label="设备单位" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="币种" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="活动类型" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="折扣率" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="日价格（元）" width="120" align="center"></el-table-column>
          <el-table-column prop="date" label="周价格（元）" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="月价格（元）" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="台班价格（元）" width="120" align="center"></el-table-column>
          <el-table-column prop="date" label="生效日期" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="失效日期" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="状态" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="复制新增" width="120" align="center"></el-table-column>
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
export default {
  name: "Index",
  components: {
    Imp
  },
  data() {
    return {
      listData:{listFlag:"regional",},//组件传参
      formInline: {
        user: "",
        region: "1"
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
        business: "租赁",
        cause: "",
        assets: "设备",
        equipment: "",
        state:"",
      },
      rules: {
        business: [
          { required: true, message: "请选择业务类型", trigger: "change" }
        ],
        cause: [{ required: true, message: "请选择事业部", trigger: "change" }],
        assets: [
          { required: true, message: "请选择资产类别", trigger: "change" }
        ],
        equipment: [
          { required: true, message: "请输入设备型号", trigger: "blur" }
        ],
        state: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
      },
      currentPage1: 1,//分页
    };
  },
  created() {
    document.title = "区域价格列表";
  },
  methods: {
    onFind(formName) {//查询
      this.$refs.formName.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    onDelete(formName) {//清除
      this.$refs[formName].resetFields();
    },
    add(){//新增
      this.$router.push('/regionalPriceDetail')
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
  padding-left: 15px;
}
.contentForm {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.demo-form-inline {
  width: 100%;
}
.contentForm ::v-deep.el-form--inline .el-form-item {
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
.textBtn {
  border-bottom: 1px solid #409eff;
  line-height: 0px;
}
.block {//分页
  text-align: right;
}
</style>
