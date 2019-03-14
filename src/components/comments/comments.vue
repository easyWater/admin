<template>
    <section class="comments">
        <section class="pageTitle">
            <h2>所有评论</h2>
        </section>
        <section class="comBody">
            <!-- 表格 -->
            <Table border :columns="columns" :data="data"></Table>
            <!-- 分页 -->
            <Page :total="total" :current="pageIndex" :page-size="pageSize" show-elevator show-sizer show-total :page-size-opts="[8, 15, 20, 25]" @on-change="indexChange" @on-page-size-change="sizeChange" />
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 50
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '评论',
                    key: 'comments'
                },
                {
                    title: '评论在',
                    key: 'article'
                },
                {
                    title: '提交于',
                    key: 'subTime'
                },
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 230,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                    click: () => {
                                        console.log('批准：', params.index, params.row)
                                    }
                                }
                            }, '批准'),
                            h('Button', {
                                props: {
                                    type: 'warning'
                                },
                                style: {
                                    margin: '0px 8px'
                                },
                                on: {
                                    click: () => {
                                        console.log('驳回', params.index, params.row)
                                    }
                                }
                            }, '驳回'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                    click: () => {
                                        console.log('删除', params.index, params.row)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            data: [
                {
                    author: '张三',
                    comments: '嗨，这是一条评论。要开始审核、编辑及删除评论，请访问仪表盘的“评论”页面。评论者头像来自Gravatar。',
                    article: '《世界你好》',
                    subTime: '2019-03-14 14:33',
                    status: '待审核'
                },
                {
                    author: '张三',
                    comments: '嗨，这是一条评论。要开始审核、编辑及删除评论，请访问仪表盘的“评论”页面。评论者头像来自Gravatar。',
                    article: '《世界你好》',
                    subTime: '2019-03-14 14:33',
                    status: '待审核'
                },
                {
                    author: '张三',
                    comments: '嗨，这是一条评论。要开始审核、编辑及删除评论，请访问仪表盘的“评论”页面。评论者头像来自Gravatar。',
                    article: '《世界你好》',
                    subTime: '2019-03-14 14:33',
                    status: '待审核'
                },
                {
                    author: '张三',
                    comments: '嗨，这是一条评论。要开始审核、编辑及删除评论，请访问仪表盘的“评论”页面。评论者头像来自Gravatar。',
                    article: '《世界你好》',
                    subTime: '2019-03-14 14:33',
                    status: '待审核'
                },
                {
                    author: '张三',
                    comments: '嗨，这是一条评论。要开始审核、编辑及删除评论，请访问仪表盘的“评论”页面。评论者头像来自Gravatar。',
                    article: '《世界你好》',
                    subTime: '2019-03-14 14:33',
                    status: '待审核'
                }
            ],
            total: 80, //总条数
            pageIndex: 1, //当前页
            pageSize: 8, // 页容量

        }
    },
    methods: {
        indexChange(index) { //当前页改变
            console.log('index: ', index)
        },
        sizeChange(size) { //页容量改变
            console.log('size: ', size)
        }
    }
}
</script>

<style lang="scss" type="text/css" scoped>
.comments {
    padding: 0px 15px;
    .comBody {
        .ivu-table-wrapper {
            margin-bottom: 15px;
        }
        .ivu-page {
            text-align: center;
        }
    }
}
</style>


