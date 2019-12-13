<template>
  <div class="detail" :class="noclick">
    <div class="btn">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提交</el-button>
      <el-button type="primary">删除</el-button>
      <el-button type="primary">复制新增</el-button>
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
        <el-form-item label="区域价格批号">
          <el-input v-model="formInline.user" placeholder="请输入区域价格批号" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="业务类型">
          <el-select
            v-model="formInline.region"
            placeholder="请选择业务类型"
            style="width:100%"
            @change="typeChange"
          >
            <!-- <el-option label="租赁" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>-->
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="事业部">
          <el-select v-model="formInline.region" filterable placeholder="请选择事业部" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="营业店">
          <el-select
            v-model="formInline.user"
            placeholder="请选择营业店"
            style="width:100%"
            :disabled="disabled"
            filterable
          >
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产类别">
          <el-select v-model="formInline.region" placeholder="请选择资产类别" style="width:100%" disabled>
            <el-option label="设备" value="shanghai"></el-option>
            <el-option label="材料" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择设备/材料">
          <el-input v-model="formInline.user" placeholder="请输入设备/材料型号" style="width:100%">
            <EM slot="append" />
          </el-input>
        </el-form-item>

        <el-form-item label="设备单位">
          <el-select v-model="formInline.region" placeholder="请选择设备单位" style="width:100%" disabled>
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设置月价格">
          <el-radio v-model="radio" label="1" @change="monthChange">是</el-radio>
          <el-radio v-model="radio" label="2" @change="monthChange">否</el-radio>
        </el-form-item>

        <el-form-item label="月份">
          <el-date-picker
            v-model="formInline.user"
            type="month"
            placeholder="请选择月"
            style="width:100%"
            :disabled="disMonth"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="活动类型">
          <el-select v-model="formInline.region" placeholder="请选择活动类型" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="区域型号折扣率%" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入区域型号折扣率" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="币种">
          <el-select v-model="formInline.region" placeholder="请选择币种" style="width:100%">
            <el-option label="工业设备事业部" value="shanghai"></el-option>
            <el-option label="销售" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标准日价格（元）" v-if="!epflag">
          <el-input v-model="formInline.user" style="width:100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="标准周价格（元）" v-if="!epflag">
          <el-input v-model="formInline.user" style="width:100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="标准月价格（元）" v-if="!epflag">
          <el-input v-model="formInline.user" style="width:100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="区域日价格（元）">
          <el-input v-model="formInline.user" placeholder="请输入区域日价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="区域周价格（元）">
          <el-input v-model="formInline.user" placeholder="请输入区域周价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="区域月价格（元）">
          <el-input v-model="formInline.user" placeholder="请输入区域月价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="标准台班价格（元）" v-if="!epflag">
          <el-input v-model="formInline.user" style="width:100%" readonly></el-input>
        </el-form-item>

        <el-form-item label="设备标准价格（元）" v-if="epflag">
          <el-input v-model="formInline.user" placeholder="请输入设备标准价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="生效日期" prop="effect">
          <el-date-picker
            v-model="formInline.d"
            type="date"
            placeholder="请输入生效日期"
            style="width:100%"
            :picker-options="pickerOptions0"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="区域台班价格（元）">
          <el-input v-model="formInline.user" placeholder="请输入区域台班价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="设备折扣价格（元）" v-if="epflag">
          <el-input v-model="formInline.user" placeholder="请输入台班价格（元）" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="失效日期" prop="invalid">
          <el-date-picker
            v-model="formInline.d"
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
import EM from "../../components/equipmentMaterials";
export default {
  components: {
    EM
  },
  name: "Index",
  data() {
    let rag = /^100(\.?\%)$|^([1-9]\d|[1-9]\d)(\.?\%)$/; //0-100百分数
    let validateDay = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入区域型号折扣率%"));
      } else if (!rag.test(value)) {
        callback(new Error("区域型号折扣率%格式错误"));
      }
    };
    return {
      pickerOptions0: {
        //生效日期限制
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      options: [
        {
          value: "1",
          label: "租赁"
        },
        {
          value: "2",
          label: "销售"
        }
      ],
      epflag: false,
      formInline: {
        d: "",
        user: "",
        region: ""
      },
      radio: "2",
      disflag: true,
      ruleForm: {
        num: ""
      },
      rules: {
        num: [{ required: true, trigger: "blur", validator: validateDay }]
      },
      disMonth: true
    };
  },
  created() {
    document.title = "区域加个详情";
  },
  computed: {
    disabled: function(params) {
      //禁用营业店
      if (this.formInline.region === "") {
        return this.disflag;
      }
    },
    noclick: function() {
      //只读
      // return 'noclick'
    }
  },
  methods: {
    typeChange(val) {
      //业务类型改变事件
      console.log(val);
      if (val === "2") {
        this.epflag = true;
      } else {
        this.epflag = false;
      }
    },
    monthChange(val) {
      //单选框
      console.log(val);
      if (val === "1") {
        this.disMonth = false;
      } else if (val === "2") {
        this.disMonth = true;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.noclick {
  pointer-events: none;
}
.contentForm {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.contentForm .el-form--inline .el-form-item {
  width: 30%;
}
.demo-form-inline {
  width: 100%;
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
