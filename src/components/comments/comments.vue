<template>
    <section class="comments">
        <section class="pageTitle">
            <h2>所有评论</h2>
        </section>
        <section class="toolbar">
            <span v-show="showBatch" style="margin-right: 20px;">
                <Button type="error" @click="auditStatus(true)">批量批准</Button>
                <Button style="margin-left: 8px;" type="primary" @click="auditStatus(false)">批量驳回</Button>
                <Button style="margin-left: 8px;" type="error" @click="delComment">批量删除</Button>
            </span>

            <Input v-model="searchBy.accountName" placeholder="请输入用户昵称" style="width: 120px" clearable />

            <Input v-model="searchBy.articleTitle" placeholder="请输入文章标题" style="width: 150px; margin-left: 15px;" clearable />

            <Input v-model="searchBy.content" placeholder="请输入评论内容" style="width: 120px; margin-left: 15px;" clearable />

            <Input v-model="searchBy.email" placeholder="请输入用户邮箱" style="width: 150px; margin-left: 15px;" clearable />

            <Button style="margin-left: 6px" @click="screening">
                筛选
            </Button>
        </section>
        <section class="comBody">
            <!-- 表格 -->
            <Table border :columns="columns" :data="data" @on-selection-change="selChange"></Table>
            <!-- 分页 -->
            <Page :total="total" :current="pageIndex" :page-size="pageSize" show-elevator show-sizer show-total :page-size-opts="[8, 15, 20, 25]" @on-change="indexChange" @on-page-size-change="sizeChange" />
        </section>
    </section>
</template>

<script>
import {list, audit, del} from './api'
export default {
    name: 'comments',
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    width: 50
                },
                {
                    title: '作者',
                    key: 'accountName'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '评论',
                    key: 'content'
                },
                {
                    title: '评论在',
                    key: 'articleTitle'
                },
                {
                    title: '提交于',
                    key: 'updateTime'
                },
                {
                    title: '审核状态',
                    key: 'auditStatus',
                    render: (h, params) => {
                        if(params.row.auditStatus === 0) {
                            return h('span', {}, '待审核')
                        }else if(params.row.auditStatus === 1) {
                            return h('span', {}, '已通过')
                        }else {
                            return h('span', {}, '已驳回')
                        }
                    }
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
                                        this.ids = []
                                        this.ids.push(params.row.id)
                                        this.auditStatus(true)
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
                                        this.ids = []
                                        this.ids.push(params.row.id)
                                        this.auditStatus(false)
                                    }
                                }
                            }, '驳回'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                    click: () => {
                                        this.ids = []
                                        this.ids.push(params.row.id)
                                        this.delComment()
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            data: [// 表格数据               
            ],
            total: 0, //总条数
            pageIndex: 1, //当前页
            pageSize: 8, // 页容量
            showBatch: false, //是否显示批量操作
            searchBy: {
                accountName: '',
                articleTitle: '',
                content: '',
                email: ''
            },
            ids: [
                //批量操作的id集合
            ]
        }
    },
    created() {
        this.getData() 
    },
    methods: {
        indexChange(index) { //当前页改变
            this.pageIndex = index
            this.getData()
        },
        sizeChange(size) { //页容量改变
            this.pageSize = size
            this.pageIndex = 1
            this.getData()
        },
        getData() {
            let params = {
                size: this.pageSize, 
                page: this.pageIndex
            }
            for(let key in this.searchBy) {
                if(this.searchBy[key]) {
                    params[key] = this.searchBy[key]
                }
            }
            list(params).then(res => {
                this.data = res.data.records
                this.total = res.data.total
            })
        },
        screening() { //根据条件筛选数据      
            this.getData()
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
        auditStatus(status) { //修改状态
            let params = {
                auditStatus: status,
                id: this.ids.join(',')
            }
            audit(params).then(res => {
                this.getData()
                this.$Message.success('操作成功')
            })
        },
        delComment() { //删除评论
            del({ids: this.ids.join(',')}).then(res => {
                this.getData()
                this.$Message.success('操作成功')
            })
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
    .toolbar {
        margin-bottom: 10px;
    }
}
</style>


