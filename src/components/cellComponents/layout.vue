<template>
  <section class="layout clearfix">
    <!-- 左侧 -->
    <side />
    <!-- 右侧 -->
    <section class="main">
      <section class="top clearfix">
        <section class="lf"><i class="iconfont icon-caidan_zhankai"></i></section>
        <section class="rg">
          <p><i class="iconfont icon-geren"></i><span>个人中心</span></p>
          <p><i class="iconfont icon-tuichu"></i><span>退出</span></p>
        </section>
      </section>
      <section class="body">
       <section class="inner">
          <router-view></router-view>          
       </section>
      </section>
    </section>
  </section>
</template>

<script>
import side from './side'
export default {
  name: "layout",
  components: {
    side
  },
};
</script>

<style lang="scss" type="text/css">
.layout {
   height: 100%;
  .main {
    float: right;
    height: 100%;
    width: calc(100% - 180px);
    transition: all 0.5s;
    .top {
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      > .lf {
        float: left;
        padding-left: 22px;
        cursor: pointer;
        .iconfont {
          line-height: 48px;
          font-size: 16px;
          color: #444;
        }
      }
      > .rg {
        float: right;
        p {
          display: inline-block;
          padding: 0px 15px;
          vertical-align: middle;
          line-height: 48px;
          .iconfont {
            font-size: 16px;
            color: #444;
            padding-right: 6px;
            &.icon-tuichu {
              font-size: 14px;
            }
          }
          span {
            font-size: 14px;
            color: #40586d;
          }
          &:nth-child(2) {
            margin-right: 7px;
          }
        }
      }
    }
    .body {
      height: calc(100% - 50px);
      background-color: #f8f9fb;
      overflow: hidden;
      > .inner {
        height: 100%;
        overflow-y: scroll;
        padding: 20px 5px;
        margin-right: -17px;
      }
    }
  }
}
</style>
