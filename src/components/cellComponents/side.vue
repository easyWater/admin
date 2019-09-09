<template>
    <!-- 左侧 -->
    <section class="sideBar">
      <section class="normal">
        <section class="inner">
          <section class="head">
            <a href="javascript: void(0);">
              <img src="../../../statics/images/avatar.jpg" alt />
              <h4>管理员</h4>
            </a>
          </section>
          <ul class="menu">
            <li class="active">
              <router-link to="/layout/dashboard" class="a-menu">
                <i class="iconfont icon-yibiaopan1 lf"></i>仪表盘
              </router-link>
            </li>
            <li>
              <a href="javascript: void(0);" class="a-menu">
                <i class="iconfont icon-tuding lf"></i>文章
                <i class="iconfont icon-you rg"></i>
              </a>
              <ul>
                <li>
                  <router-link to="/layout/article/list">所有文章</router-link>
                </li>
                <li>
                  <router-link to="/layout/addArticle">写文章</router-link>
                </li>
                <li>
                  <router-link to="/layout/catalog">分类目录</router-link>
                </li>
                <li>
                  <router-link to="/layout/article/recycle">回收站</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/layout/comments" class="a-menu">
                <i class="iconfont icon-pinglun lf"></i>评论
              </router-link>
            </li>
            <li>
              <router-link to="/layout/user" class="a-menu">
                <i class="iconfont icon-yonghu1 lf"></i>用户
              </router-link>
            </li>
            <li>
              <a href="javascript: void(0);" class="a-menu">
                <i class="iconfont icon-shezhi lf"></i>设置
                <i class="iconfont icon-you rg"></i>
              </a>
              <ul>
                <!-- <li><router-link to="/layout/navMenu">导航菜单</router-link></li>
                <li><router-link to="/layout/siteSet">网站设置</router-link></li>-->
                <li>
                  <router-link to="/layout/permissionList">权限管理</router-link>
                </li>
                <li>
                  <router-link to="/layout/role">角色管理</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </section>
      <section class="narrow">
        <h4>
          <img src="../../../statics/images/avatar.jpg" alt />
        </h4>
        <ul class="menu">
          <li>
            <a href="javascript: void(0);">
              <i class="iconfont icon-yibiaopan1"></i>
            </a>
          </li>
          <li class="active">
            <a href="javascript: void(0);">
              <i class="iconfont icon-tuding"></i>
            </a>
            <ul>
              <li>
                <h5>文章</h5>
              </li>
              <li class="active">
                <a href="javascript: void(0);">所有文章</a>
              </li>
              <li>
                <a href="javascript: void(0);">写文章</a>
              </li>
              <li>
                <a href="javascript: void(0);">分类目录</a>
              </li>
              <li>
                <a href="javascript: void(0);">标签</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript: void(0);">
              <i class="iconfont icon-pinglun"></i>
            </a>
          </li>
          <li>
            <a href="javascript: void(0);">
              <i class="iconfont icon-yonghu1"></i>
            </a>
          </li>
          <li>
            <a href="javascript: void(0);">
              <i class="iconfont icon-shezhi"></i>
            </a>
            <ul>
              <li>
                <h5>设置</h5>
              </li>
              <li>
                <a href="javascript: void(0);">网站设置</a>
              </li>
              <li>
                <a href="javascript: void(0);">导航菜单</a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </section>
</template>

<script>
export default {
  name: "side",
  mounted() {
    this.choiceMenu();
    this.switchAside();
  },
  methods: {
    choiceMenu() {
      $(".menu>li").on("click", function(e) {
        //点击菜单
        if ($(e.target).hasClass("a-menu")) {
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");

          //其他兄弟元素二级菜单状态调整
          $(this)
            .siblings()
            .find("ul")
            .slideUp();

          //自身二级菜单状态调整
          $(this)
            .find("ul")
            .stop()
            .slideToggle();

          //调整自身右图标的方向
          if (
            $(this)
              .find(".iconfont.rg")
              .hasClass("unfold")
          ) {
            //改为右,收起
            $(this)
              .find(".iconfont.rg")
              .removeClass("unfold");
          } else {
            //改为下,展开
            $(this)
              .find(".iconfont.rg")
              .addClass("unfold");
          }

          //调整其他兄弟元素右图标的方向
          $(this)
            .siblings()
            .find(".iconfont.rg")
            .removeClass("unfold");
        }
      });
      $(".menu>li")
        .find("a>.iconfont.rg")
        .on("click", function() {
          //由于右侧图标浮动，需添加点击事件与一级菜单a保持一致
          $(this).addClass("a-menu");
          $(
            $(this)
              .parent()
              .parent()[0]
          ).trigger("click");
        });
    },
    switchAside() {
      //切换侧边栏
      $(".main>.top>.lf").on("click", function() {
        if ($(".sideBar").hasClass("isAside")) {
          $(".sideBar").css({ width: "180px" });
          $(".sideBar>.normal").show();
          $(".sideBar>.narrow").hide();
          $(".main").css({
            width: "calc(100% - 180px)"
          });
          $(".sideBar").removeClass("isAside");
        } else {
          $(".sideBar").css({ width: "46px" });
          $(".sideBar>.normal").hide();
          $(".sideBar>.narrow").show();
          $(".main").css({
            width: "calc(100% - 46px)"
          });
          $(".sideBar").addClass("isAside");
        }
      });
    }
  }
};
</script>

<style lang="scss" type="text/css">
.sideBar {
  width: 180px;
  transition: all 0.5s;
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
        // width: 130px;
        // height: 127px;
        background-color: #243443;
        a {
          display: block;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-sizing: border-box;
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
        > li {
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
              transform: rotate(0deg);
              transition: all 0.3s;
              &.unfold {
                transform: rotate(90deg);
              }
            }
          }
          &:first-child {
            margin-top: 0px;
          }
          &.active > a {
            color: #f6f6f6;
            background-color: #213140;
          }
          &:hover {
            color: #f6f6f6;
            background-color: #213140;
          }
          > ul {
            display: none;
            background-color: #243443;
            box-shadow: inset 0 1px 3px #111e29;
            padding: 8px 0px;
            li {
              a {
                display: block;
                padding-left: 30px;
                line-height: 37px;
              }
              &:hover a {
                color: #f6f6f6;
                background-color: #213140;
              }
            }
          }
        }
      }
    }
  }
  .narrow {
    width: 46px;
    display: none;
    h4 {
      margin-bottom: 10px;
      img {
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0 auto;
      }
    }
    > .menu {
      > li {
        position: relative;
        margin-top: 1px;
        > a {
          display: block;
          text-align: center;
          color: #a9b0c2;
          .iconfont {
            font-size: 20px;
            line-height: 40px;
            &.icon-yibiaopan1 {
              font-size: 25px;
            }
            &.icon-tuding {
              font-size: 23px;
            }
            &.icon-pinglun {
              font-size: 16px;
            }
          }
        }
        > ul {
          display: none;
          position: absolute;
          left: 46px;
          top: 0px;
          min-width: 120px;
          background-color: #2f4050;
          > li {
            &:hover {
              a {
                color: #f6f6f6;
              }
            }
            &.active {
              a {
                color: #5ad0c3;
              }
            }
            > a {
              display: block;
              line-height: 30px;
              color: #a9b0c2;
              font-size: 14px;
              padding-left: 15px;
            }
            h5 {
              padding-left: 15px;
              font-size: 14px;
              color: #f6f6f6;
              line-height: 40px;
              background-color: #213140;
            }
          }
        }
        &:hover {
          > a {
            background-color: #213140;
            color: #f6f6f6;
          }
          ul {
            display: block;
          }
        }
        &.active {
          > a {
            background-color: #5ad0c3;
            color: #f6f6f6;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              right: 0px;
              top: 15px;
              border-top: 4px solid transparent;
              border-left: 4px solid transparent;
              border-bottom: 4px solid transparent;
              border-right: 4px solid #f8f9fb;
            }
          }
        }
        &.active:hover {
          > a {
            &::after {
              display: none;
            }
          }
          > ul {
            li {
              h5 {
                background-color: #5ad0c3;
              }
            }
          }
        }
      }
    }
  }
}
</style>
