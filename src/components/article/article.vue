<template>
    <section class="article">
        <section class="pageTitle">
            <h2 v-cloak>{{isRecycle ? '回收站' : '所有文章'}}</h2>
            <!-- <a v-if="!isRecycle" href="javascript: void(0);">写文章</a> -->
            <router-link v-if="!isRecycle" to="/layout/addArticle">写文章</router-link>
        </section>
        <section class="toolbar">
            <span v-show="showBatch" style="margin-right: 20px;">
              <Button v-if="!isRecycle" type="error" @click="delArticle">批量删除</Button>
              <span v-else>
                  <Button type="primary" @click="revert">批量还原</Button>
                  <Button style="margin-left: 8px;" type="error" @click="delArticle">永久删除</Button>
              </span>
            </span>

            <Select v-model="category" style="width:120px;" placeholder="请选择分类" clearable>
                <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>

            <Select v-model="status" style="width:120px; margin-left: 15px;" placeholder="请选择状态" clearable>
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <Select v-model="type" style="width:120px; margin-left: 15px;" placeholder="请选择栏目" clearable>
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <Button style="margin-left: 6px" @click="screening">
                筛选
            </Button>
        </section>
        <section class="list">
            <!-- 表格 -->
            <Table border :columns="columns" :data="data" @on-selection-change="selChange"></Table>
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
      showBatch: false, //是否显示批量操作
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
          key: "userName",
          width: 100
        },
        {
          title: "栏目",
          key: "type",
          width: 100,
          render: (h, params) => {
            return h("span", params.row.type === 0 ? '前端' : params.row.type === 1 ? '后端' : '生活')
          }
        },
        {
          title: "分类",
          key: "categoryName",
          width: 100
        },
        {
          title: "发表时间",
          key: "createTime",
          render: (h, params) => {
            return h('span', this.formatDate(params.row.createTime))
          }
        },
        {
          title: "状态",
          key: "isFinished",
          width: 100,
          render: (h, params) => {
            return h("span", params.row.isFinished === 1 ? '已发布' : '未发布')
          }
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
                        this.ids = []
                        this.ids.push(params.row.id)
                        this.revert()
                      }else {
                         //文章列表点击编辑后操作
                         this.$router.push(`/layout/addArticle?articleId=${params.row.id}`)
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
                      this.ids = []
                      this.ids.push(params.row.id)
                      this.delArticle()                                            
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
      ],
      total: 0, //总页数
      pageSize: 8, //页容量
      pageIndex: 1, //当前页
      category: '', //所属分类
      status: '', //状态
      type: '', //文章所属栏目
      categoryList: [
        // 分类
      ],
      statusList: [
        //状态列表
        {
          value: 1,
          label: '已发布'
        },
        {
          value: 0,
          label: '未发布'
        }
      ],
      typeList: [
        {
          value: 0,
          label: '前端'
        },
        {
          value: 1,
          label: '后端'
        },
        {
          value: 2,
          label: '生活'
        }
      ],
      ids: [
        // 批量删除的id集合
      ]
    };
  },
  created() {
    // 根据页面类型不同调用不同接口获取数据...    
    if(this.$route.params.type === 'recycle') { //当前页面为回收站
      this.isRecycle = true
    }
    this.getArtData()
    this.getCategoryList()
  },
  watch: {
    $route: function(newVal, oldVal) {
         // 根据页面类型不同调用不同接口获取数据...
        if(newVal.params.type === 'recycle') {
            this.isRecycle = true
        }else {
          this.isRecycle = false
        }        
        this.category = ''
        this.status = ''
        this.type = ''
        this.pageSize = 8 //页容量
        this.pageIndex = 1 //当前页
        this.getArtData()
    }
  },
  methods: {
    getCategoryList () { //获取分类列表
      const data = {
        page: 1,
        size: -1
      }
      this.$http({url: '/category/list', data}).then(res => {
        this.categoryList = res.data.records
      })
    },
    getArtData(categoryId, isFinished, type) {
      // 获取文章列表数据
      let params = {
        categoryId,
        isFinished,
        type,
        size: this.pageSize,
        page: this.pageIndex,
        isDelete: this.isRecycle ? 1 : 0
      }
      this.$http({url: `/article/list`, params}).then(res => {
        this.data = res.data.records
        this.total = res.data.total
      })
    },
    selChange(selection) {
      //任意项选中状态改变
      this.ids = []
      selection.forEach(item => {
        this.ids.push(item.id)
      })      
      if(selection.length > 1) {
        this.showBatch = true
      }else {
        this.showBatch = false
      }
    },
    indexChange(index) {
      //当前页改变
      this.pageIndex = index
      this.getArtData(this.category, this.status, this.type)
    },
    sizeChange(size) {
      //页容量改变
      this.pageSize = size
      this.pageIndex = 1
      this.getArtData(this.category, this.status, this.type)
    },
    screening() { //根据条件筛选数据      
      this.getArtData(this.category, this.status, this.type)
    },
    delArticle() { //删除文章
      const data = {
        ids: this.ids.join(',')
      }
      let url = ''
      if(!this.isRecycle) { //文章删除接口
        url = '/article/delete'
      }else { //回收站中文章删除接口
        url = '/article/finalDelete'
      }
      this.$http({url, data}).then(res => {
        this.showBatch = false
        this.$Message.success(res.message)
        this.getArtData(this.category, this.status, this.type)
      })
    },
    revert() { //还原文章
      const data = {
        ids: this.ids.join(',')
      }
      this.$http({url: '/article/revert', data}).then(res => {
        this.showBatch = false
        this.$Message.success(res.message)
        this.getArtData(this.category, this.status, this.type)
      })
    },
    formatDate(time) {
      let date = new Date(time)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return y + '-' + m + '-' +d
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.article {
  padding: 0px 15px;
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


