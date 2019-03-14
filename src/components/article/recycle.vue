<template>
    <section class="article">
        <section class="pageTitle">
            <h2>所有文章 </h2>
            <a href="javascript: void(0);">写文章</a>
        </section>
        <section class="toolbar">
            <Button type="error">批量删除</Button>
            <Dropdown style="margin-left: 12px">
                <Button>
                    所有分类
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>分类1</DropdownItem>
                    <DropdownItem>分类2</DropdownItem>                    
                    <DropdownItem>分类3</DropdownItem>                   
                </DropdownMenu>
            </Dropdown>
            <Dropdown style="margin-left: 6px">
                <Button>
                    所有状态
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>状态1</DropdownItem>
                    <DropdownItem>状态2</DropdownItem>                    
                    <DropdownItem>状态3</DropdownItem>                   
                </DropdownMenu>
            </Dropdown>
            <Button style="margin-left: 6px">
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
          // key: 'action',
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log("index: ", params.index, "row:", params.row);
                      //点击编辑后操作
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  on: {
                    click: () => {
                      console.log("index: ", params.index, "row:", params.row);
                      // 点击删除后操作
                    }
                  }
                },
                "删除"
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
      pageIndex: 2 //当前页
    };
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


