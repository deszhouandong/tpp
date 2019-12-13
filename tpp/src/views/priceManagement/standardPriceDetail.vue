<template>
  <div class="detail">
    <div class="header">
      <div>
        <el-button type="primary" class="btn" @click="save('ruleForm')">取消</el-button>
        <el-button type="primary" class="btn" @click="save('ruleForm')">保存</el-button>
        <el-button type="primary" class="btn" @click="submit('ruleForm')">关闭页面</el-button>
      </div>
      <div>
        <el-button type="primary" class="btn" @click="save('ruleForm')">作废</el-button>
        <el-button type="primary" class="btn" @click="save('ruleForm')">修改</el-button>
        <el-button type="primary" class="btn" @click="save('ruleForm')">提交</el-button>
        <el-button type="primary" class="btn" @click="submit('ruleForm')">关闭页面</el-button>
      </div>
      <div>
        <el-button type="primary" class="btn" @click="save('ruleForm')">作废</el-button>
        <el-button type="primary" class="btn" @click="save('ruleForm')">撤销确认</el-button>
        <el-button type="primary" class="btn" @click="submit('ruleForm')">关闭页面</el-button>
      </div>
    </div>
    <div class="contentForm">
      <el-form
        :inline="true"
        :model="ruleForm"
        class="demo-form-inline"
        label-width="28%"
        :rules="rules"
        ref="formName"
        :validate-on-rule-change="false"
      >
        <el-form-item label="标准价格批号">
          <el-input v-model="ruleForm.num" style="width:100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="业务类型">
          <el-select v-model="ruleForm.business" placeholder="请选择业务类型" style="width:100%"  @change="typeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="事业部">
          <el-select v-model="ruleForm.num" filterable placeholder="请选择事业部" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产类别" prop="assets">
          <el-select v-model="ruleForm.assets" placeholder="请选择资产类别" style="width:100%" disabled>
            <el-option label="设备" value="1"></el-option>
            <el-option label="销售" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择设备/材料" prop="equipmentType">
          <el-input
            v-model="ruleForm.equipmentType"
            placeholder="请输入设备型号"
            style="width:100%"
            readonly
          >
            <EM slot="append" />
          </el-input>
        </el-form-item>

        <el-form-item label="单位" prop="company">
          <el-select v-model="ruleForm.company" placeholder="请选择单位" style="width:100%" disabled>
            <el-option label="台" value="1"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="币种" prop="currency">
          <el-select v-model="ruleForm.currency" placeholder="请选择币种" style="width:100%">
            <el-option label="人民币" value="1"></el-option>
            <el-option label="美元" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日价格（元）" prop="day">
          <el-input v-model="ruleForm.day" placeholder="请输入日价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="周价格（元）" prop="week">
          <el-input v-model="ruleForm.week" placeholder="请输入周价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="月价格（元）" prop="month">
          <el-input v-model="ruleForm.month" placeholder="请输入月价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="台班价格（元）" prop="class">
          <el-input v-model="ruleForm.class" placeholder="请输入台班价格（元）" style="width:100%"></el-input>
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

        <el-form-item label="设备标准价格（元）" v-if="epflag">
          <el-input v-model="ruleForm.num" placeholder="请输入设备标准价格（元）" style="width:100%"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import EM from "../../components/equipmentMaterials";
export default {
  components: {
    EM
  },
  name: "Index",
  computed: {},
  data() {
    let rag = /^((-?[1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/; //可以为负数两位小数
    let validateDay = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入天价格（元）"));
      } else if (!rag.test(value)) {
        callback(new Error("价格格式错误"));
      }
    };
    let validateWeek = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入周价格（元）"));
      } else if (!rag.test(value)) {
        callback(new Error("价格格式错误"));
      }
    };
    let validateMonth = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入月价格（元）"));
      } else if (!rag.test(value)) {
        callback(new Error("价格格式错误"));
      }
    };
    let validateClass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入台班价格（元）"));
      } else if (!rag.test(value)) {
        callback(new Error("价格格式错误"));
      }
    };
    return {
      formInline: {
        d: "",
        user: "",
        region: ""
      },
      options: [{
          value: '1',
          label: '租赁'
        }, {
          value: '2',
          label: '销售'
        },],
      epflag: false, //设备标准价格
      popFlag: false, //弹框
      ruleForm: {
        num: "",
        business: "租赁",
        cause: "",
        assets: "设备",
        equipment: "",
        company: "台",
        invalid: "",
        effect: "",
        currency: "人民币",
        day: "",
        week: "",
        month: "",
        class: "",
        equipmentType: ""
      },
      rules: {
        business: [
          { required: true, message: "请选择业务类型", trigger: "change" }
        ],
        cause: [{ required: true, message: "请选择事业部", trigger: "change" }],
        assets: [
          { required: true, message: "请选择资产类别", trigger: "change" }
        ],
        company: [{ required: true, message: "请选择单位", trigger: "change" }],
        day: [{ required: true, trigger: "blur", validator: validateDay }],
        week: [{ required: true, validator: validateWeek, trigger: "blur" }],
        month: [{ required: true, validator: validateMonth, trigger: "blur" }],
        invalid: [
          { required: true, message: "请选择失效日期", trigger: "change" }
        ],
        effect: [
          { required: true, message: "请选择生效日期", trigger: "change" }
        ],
        class: [{ required: true, validator: validateClass, trigger: "blur" }],
        currency: [
          { required: true, message: "请选择币种", trigger: "change" }
        ],
        equipmentType: [
          { required: true, message: "请输入设备型号", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    document.title = "标准价格详情";
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
    typeChange(val) {
      //业务类型改变事件
      console.log(val);
      if (val === "2") {
        this.epflag = true;
      } else {
        this.epflag = false;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.detail {
  margin-top: 20px;
}

.contentForm {
  width: 96%;
  display: flex;
  justify-content: space-between;
  margin: 15px auto 0;
}
.demo-form-inline {
  width: 100%;
}
.contentForm .el-form--inline .el-form-item {
  width: 30%;
}
.contentForm ::v-deep.el-form-item__label {
  text-align: center;
}
.contentForm ::v-deep.el-form-item__content {
  //输入框宽度
  width: 70%;
}

.header {
  width: 96%;
  margin: 0 3.6rem;
  // text-align: center;
  .btn {
    margin: 1rem 1rem;
    width: 96px;
  }
}
//时间
.contentForm ::v-deep.el-input__prefix {
  display: none;
}
</style>
