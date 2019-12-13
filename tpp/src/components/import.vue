<template>
  <div  class="imp">
    <el-button type="primary" @click="add" class="addbtn">新增</el-button>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :file-list="fileList"
    >
      <el-button type="primary">导入</el-button>
    </el-upload>
    <div class="textBtn">模板下载</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  props: {
    listData: {
      type: Object
    }
  },
  methods: {
    add() {
      //新增
      if (this.listData.listFlag === "person") {
        this.$router.push("/personnelDiscountDetail");
      } else if (this.listData.listFlag === "regional") {
        this.$router.push("/regionalPriceDetail");
      } else if (this.listData.listFlag === "stand") {
        this.$router.push("/standardPriceDetail");
      }
      console.log(this.listData);
    },
    //导入
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  }
};
</script>
<style lang="scss">
.imp{
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
}
.addbtn{
  margin-right: 1rem;
}
.textBtn {
  //模板下载
  border-bottom: 1px solid #409eff;
  color: #409eff;
  height: 30px;
  line-height: 40px;
  margin-left: 1rem;
  cursor:pointer;
}
.contentBtn .el-upload-list{
  display: none;
}
</style>