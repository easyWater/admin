<template>
    <section class="article">
        <section class="pageTitle">
            <h2 v-cloak>{{isRecycle ? '回收站' : '所有文章'}}</h2>
            <a v-if="!isRecycle" href="javascript: void(0);">写文章</a>
        </section>
        <section class="toolbar">
            <Button v-if="!isRecycle" type="error">批量删除</Button>
            <span v-else>
                <Button type="primary">批量还原</Button>
                <Button style="margin-left: 8px;" type="error">永久删除</Button>
            </span>

            <Select v-model="category"  style="width:120px; margin-left: 20px;">
                <Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <Select v-model="status"  style="width:120px; margin-left: 15px;">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <Button style="margin-left: 6px" @click="screening">
                筛选
            </Button>
        </section>
        <section class="list">
            <!-- 表格 -->
            <Table border :columns="columns" :data="data" @on-select-all="selAll" @on-select-all-cancel="cancelSelAll" @on-selection-change="selChange"></Table>
            <!-- 分页器 -->
            <Page :total="total" :current="pageIndex" :page-size="pageSize" show-elevator show-sizer show-total :page-size-opts="[8, 15, 20, 25]" @on-change="indexChange" @on-page-size-change="sizeChange" />
        </section>
    </section>
</template>

<script>
export default {
  data() {
    return {
      isRecycle: false, //是否是回收站
      columns: [
        //表格列定义
        {
          type: "selection",
          width: 50
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "作者",
          key: "author"
        },
        {
          title: "分类",
          key: "category"
        },
        {
          title: "发表时间",
          key: "publishTime"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: this.isRecycle ? 'primary' : "warning"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      if(this.isRecycle) {
                        //回收站中点击还原
                        console.log("还原", "index: ", params.index, "row:", params.row);
                     
                      }else {
                         //文章列表点击编辑后操作
                         console.log("编辑", "index: ", params.index, "row:", params.row);
                      }
                    }
                  }
                },
                this.isRecycle ? '还原' : "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  on: {
                    click: () => {
                      if(this.isRecycle) {
                        //回收站中永久删除
                        console.log("永久删除 index: ", params.index, "row:", params.row);
                      }else {
                        //文章列表中逻辑删除
                        console.log("删除 index: ", params.index, "row:", params.row);
                      }
                      
                    }
                  }
                },
                this.isRecycle ? '永久删除' : "删除"
              )
            ]);
          }
        }
      ],
      data: [
        //表格数据
        {
          title: "标题1",
          author: "张三",
          category: "生活",
          publishTime: "2019-03-13",
          status: "待审核"
        },
        {
          title: "标题2",
          author: "张三",
          category: "生活",
          publishTime: "2019-03-13",
          status: "待审核"
        },
        {
          title: "标题3",
          author: "张三",
          category: "生活",
          publishTime: "2019-03-13",
          status: "待审核"
        },
        {
          title: "标题4",
          author: "张三",
          category: "生活",
          publishTime: "2019-03-13",
          status: "待审核"
        }
      ],
      total: 100, //总页数
      pageSize: 8, //页容量
      pageIndex: 2, //当前页
      category: 'life',
      status: 'publish',
      categoryList: [
        {
          value: 'study',
          label: '学习'
        },
        {
          value: 'life',
          label: '生活'
        },
        {
          value: 'work',
          label: '工作'
        }
      ],
      statusList: [
        //状态列表
        {
          value: 'publish',
          label: '已发布'
        },
        {
          value: 'waitingAudit',
          label: '待审核'
        }
      ],
    };
  },
  created() {
    if(this.$route.params.type === 'recycle') { //当前页面为回收站
      this.isRecycle = true
    }
  },
  watch: {
    $route: function(newVal, oldVal) {
        console.log('newVal', newVal)
        if(newVal.params.type === 'recycle') {
            this.isRecycle = true
        }else {
          this.isRecycle = false
        }
    }
  },
  methods: {
    selAll(selection) {
      //全选按钮选中
      console.log("点击全选时触发: ", selection);
    },
    cancelSelAll(selection) {
      //全选按钮取消选中
      console.log("点击取消全选时触发: ", selection);
    },
    selChange(selection) {
      //任意项选中状态改变
      console.log("已选项数据: ", selection);
    },
    indexChange(index) {
      //当前页改变
      console.log("index: ", index);
    },
    sizeChange(size) {
      //页容量改变
      console.log("size: ", size);
    },
    screening() { //根据条件筛选数据


    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.article {
  padding: 0px 15px;
  // .pageTitle {
  //   margin-bottom: 20px;
  //   h2 {
  //     color: #333333;
  //     font-size: 24px;
  //     display: inline-block;
  //     vertical-align: middle;
  //   }
  //   a {
  //     color: #fff;
  //     background-color: #40586d;
  //     border: 1px solid #374b5d;
  //     font-size: 12px;
  //     margin-left: 10px;
  //     padding: 0px 5px;
  //     line-height: 20px;
  //     border-radius: 3px;
  //     display: inline-block;
  //     vertical-align: middle;
  //   }
  // }
  .toolbar {
    margin-bottom: 10px;
  }
  .list {
    .ivu-table-wrapper {
      margin-bottom: 15px;
    }
    .ivu-page {
      text-align: center;
    }
  }
}
</style>


