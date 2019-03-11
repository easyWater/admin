<template>
  <section id="app" class="clearfix">
    <!-- 左侧 -->
    <section class="sideBar">
      <section class="normal">
        <section class="inner">
            <section class="head">
                <a href="javascript: void(0);">
                    <img src="../statics/images/avatar.jpg" alt="">
                    <h4>管理员</h4>
                </a>
            </section>
            <ul class="menu">
              <li class="active">
                <a href="javascript: void(0);"><i class="iconfont icon-yibiaopan1 lf"></i>仪表盘</a>
              </li>
              <li>
                <a href="javascript: void(0);"><i class="iconfont icon-tuding lf"></i>文章<i class="iconfont icon-you rg"></i></a>
                <ul>
                  <li><a href="javascript: void(0);">所有文章</a></li>
                  <li><a href="javascript: void(0);">写文章</a></li>
                  <li><a href="javascript: void(0);">分类目录</a></li>
                  <li><a href="javascript: void(0);">标签</a></li>
                </ul>
              </li>
              <li>
                <a href="javascript: void(0);"><i class="iconfont icon-pinglun lf"></i>评论</a>
              </li>
              <li>
                <a href="javascript: void(0);"><i class="iconfont icon-yonghu1 lf"></i>用户</a>
              </li>
              <li>
                <a href="javascript: void(0);"><i class="iconfont icon-shezhi lf"></i>设置<i class="iconfont icon-xia rg"></i></a>
                <ul>
                  <li><a href="javascript: void(0);">网站设置</a></li>
                  <li><a href="javascript: void(0);">导航菜单</a></li>
                </ul>
              </li>
            </ul>
        </section>
      </section>
      <!-- <section class="narrow"></section> -->
    </section>
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

       </section>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: "app"
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
  .sideBar {
    height: 100%;
    float: left;
    .normal,
    .narrow {
      height: 100%;
      background-color: #2f4050;
    }
    .normal {
      width: 180px;
      overflow: hidden;
      > .inner {
        height: 100%;
        overflow-y: scroll;
        margin-right: -17px;
        .head {
          padding: 25px;
          width: 130px;
          height: 127px;
          background-color: #243443;
          a {
            display: block;
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: block;
              margin: 0 auto;
              border: 3px solid rgba(255, 255, 255, .3);
            }
            h4 {
              font-size: 16px;
              color: #a9b0c2;
              padding: 20px 0px 10px;
              text-align: center;
            }
          }
        }
        .menu {
          padding: 10px 0px; 
          >li {
            margin-top: 1px;
            a {              
              display: block;
              line-height: 40px;
              padding: 0px 20px;
              color: #a9b0c2;
              font-size: 14px;
              .iconfont.lf {
                padding-right: 10px;
                font-size: 18px;
                &.icon-pinglun {
                  font-size: 14px;
                }
              }
              .iconfont.rg {
                float: right;
                font-size: 18px;
              }
            }
            &:first-child {
              margin-top: 0px;
            }
            &.active a {
              color: #f6f6f6;
              background-color: #243443;
            }
            &:hover {
              color: #f6f6f6;
              background-color: #243443;
            }
            >ul {
              background-color: #243443;
              box-shadow: inset 0 1px 3px #111e29;
              li {
                a {
                  display: block;
                  padding-left: 30px;
                  line-height: 37px;
                }
              }
            }
          }
        }
      }
    }
    .narrow {
      width: 46px;
    }
  }
  .main {
    float: right;
    height: 100%;
    width: calc(100% - 180px);
    .top {
      height: 50px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      > .lf {
        float: left;
        padding-left: 22px;
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
      }
    }
  }
}
</style>
