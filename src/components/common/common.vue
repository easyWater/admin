<template>
    <section class="common">
        <section class="pageTitle">
            <h2>
                <slot name="title"></slot>
            </h2>
        </section> 
        <section class="center clearfix">
            <section class="addForm">
                <h4>
                    <slot name="formTitle"></slot>
                </h4>
                <!-- 表单 -->
                <slot name="addForm"></slot>
            </section>
            <section class="dataTb">
                <!-- 数据表格 -->
                <slot name="tb"></slot>
            </section>
        </section>
    </section>
</template>

<script>
export default {
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.common {
  padding: 0px 15px;
  .center {
    .addForm {
      float: left;
      width: 32%;
      h4 {
        color: #333333;
        font-size: 17px;
        margin-bottom: 15px;
      }
    }
    .dataTb {
      float: right;
      width: 65%;
    }
  }
}
</style>

