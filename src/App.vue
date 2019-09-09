<template>
  <section id="app" class="clearfix">
   <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss" type="text/css">
@import url("../statics/css/init.css");
@import url("../statics/font/iconfont.css");
body,
html {
  height: 100%;
}
#app {
  height: 100%;  
}
.pageTitle {
  margin-bottom: 20px;
  h2 {
    color: #333333;
    font-size: 24px;
    display: inline-block;
    vertical-align: middle;
  }
  a {
    color: #fff;
    background-color: #40586d;
    border: 1px solid #374b5d;
    font-size: 12px;
    margin-left: 10px;
    padding: 0px 5px;
    line-height: 20px;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
