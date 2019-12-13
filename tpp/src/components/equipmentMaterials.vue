<template>
  <el-popover placement="top" width="1100" trigger="click" slot="append" v-model="popflag">
    <div class="header">
      <span>设置设备/材料</span>
      <i class="el-icon-circle-close" @click="popflag = false"></i>
    </div>
    <div class="popBtn">
      <!-- <el-form-item label="事业部" style="width:30%">
          <el-input v-model="formInline.user" placeholder="请输入事业部" style="width:60%;"></el-input>
      </el-form-item>-->
      <el-form-item label="事业部" style="width:30%">
        <el-select v-model="formInline.user" placeholder="请选择事业部" style="width:60%">
          <el-option label="工业设备事业部" value="shanghai"></el-option>
          <el-option label="销售" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备型号" style="width:30%">
        <el-input v-model="formInline.user" placeholder="请输入设备型号" style="width:60%;"></el-input>
      </el-form-item>

      <div style="width:30%;">
        <el-button type="primary" @click="onFind('ruleForm')">查询</el-button>
      </div>
    </div>
    <el-table :data="gridData" border>
      <el-table-column width="50" align="center" property="date" label="序号"></el-table-column>
      <el-table-column width="100" align="center" property="name" label="选择"></el-table-column>
      <el-table-column width="150" align="center" property="address" label="类别"></el-table-column>
      <el-table-column width="400" align="center" property="date" label="描述"></el-table-column>
      <el-table-column width="150" align="center" property="name" label="计量单位"></el-table-column>
      <el-table-column width="200" align="center" property="address" label="事业部"></el-table-column>
    </el-table>
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
    <el-button slot="reference">选择</el-button>
  </el-popover>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      formInline: {
        d: "",
        user: "",
        region: ""
      },
      currentPage1: 1,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      popflag: false
    };
  },
  methods: {
    choice() {
      //设备材料选择
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    save(formName) {
      this.$refs.formName.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onFind(formName) {
      //设备查询
    }
  }
};
</script>

<style lang="scss" scoped>
.contentForm .el-popover {
  padding: 0;
}
// 弹框
.header {
  background: #00bfff;
  height: 52px;
  // line-height: 52px;
  font-size: 18px;
  padding: 0 15px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.block {
  text-align: right;
}
.popBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
.popBtn .el-form--inline .el-form-item {
  width: 30%;
}
</style>