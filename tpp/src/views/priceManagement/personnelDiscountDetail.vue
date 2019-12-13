<template>
  <div class="detail">
    <div class="btn">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提交</el-button>
    </div>
    <div class="contentForm">
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline" label-width="25%">
        <el-form-item label="人员折扣批号">
          <el-input v-model="ruleForm.user" placeholder="请输入人员折扣批号"></el-input>
        </el-form-item>

        <el-form-item label="事业部">
          <el-select v-model="ruleForm.region" filterable placeholder="请选择事业部" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="人员">
          <!-- <el-select v-model="ruleForm.region" filterable placeholder="请选择人员" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select> -->
          <el-autocomplete
            v-model="ruleForm.person"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择人员"
            @select="handleSelect"
            style="width:100%"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="人员类型">
          <el-select v-model="ruleForm.region" placeholder="请选择人员类型" style="width:100%">
            <el-option label="店长" value="shanghai"></el-option>
            <el-option label="总监" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格折扣率%">
          <el-input v-model="ruleForm.user" placeholder="请输入价格折扣率"></el-input>
        </el-form-item>

        <el-form-item label="生效日期" prop="effect">
          <el-date-picker
            v-model="ruleForm.effect"
            type="date"
            placeholder="请输入生效日期"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="失效日期" prop="invalid">
          <el-date-picker
            v-model="ruleForm.invalid"
            type="date"
            placeholder="请输入失效日期"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      timeout:  null,
      restaurants: [],
      formInline: {
        user: "",
        region: ""
      },
      radio: "1",
      ruleForm: {
        business: "租赁",
        cause: "",
        assets: "设备",
        equipment: ""
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
          { required: true, message: "请输入设备型号", trigger: "change" }
        ]
      }
    };
  },
  created() {
    document.title = "人员折扣详情";
  },
  mounted() {
      this.restaurants = this.loadAll();
    },
  methods: {
     loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        ];
      },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
  }
};
</script>

<style lang='scss' scoped>
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
.btn {
  width: 96%;
  margin: 0 auto;
}
//时间
.contentForm ::v-deep.el-input__prefix {
  display: none;
}
</style>
