<template>
    <section class="dashboard">
        <section class="slogan">
            <h1>One Belt, One Road</h1>
            <h4>Thoughts, stories and ideas.</h4>
            <router-link to="/addArticle">写文章</router-link>
        </section>
        <ul class="statistical">
            <li>
                站点内容统计：
            </li>
            <li>
                <b>{{siteCount.articleCount}}</b>篇文章（<b>{{siteCount.unfinishedCount}}</b>篇草稿）
            </li>
            <li>
                <b>{{siteCount.categoryCount}}</b>个分类
            </li><li>
                <b>{{siteCount.commentCount}}</b>条评论（<b>{{siteCount.auditingCount}}</b>条待审核）
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            siteCount: {

            }
        }
    },
    created() {
        this.getSiteCount()
    },
    methods: {
        getSiteCount() {
            this.$http({url: `/dashboard/stat`}).then(res => {
                this.siteCount = res.data
            })
        }
    }
}
</script>

<style lang="scss" type="text/css" scoped>
.dashboard {
    padding: 0px 15px;
    .slogan {
        // width: 100%;
        height: 205px;
        padding: 48px 60px;
        margin-bottom: 30px;
        background-color: #eeeeee;
        border-radius: 6px;
        text-align: center;
        h1 {
            color: #333333;
            font-size: 63px;
            text-align: center;
            padding: 20px 0px 10px;
        }
        h4 {
            color: #333333;
            font-size: 21px;
            margin-bottom: 15px;
            text-align: center;
        }
        a {
            font-size: 18px;
            padding: 10px 16px;
            background-color: #40586d;
            border: 1px solid #374b5d;
            border-radius: 6px;
            color: #fff;
            display: inline-block;
        }
    }
    .statistical {
        border: 1px solid #dddddd;
        width: 33.33333333333333%;
        li {
            border-bottom: 1px solid #dddddd;
            padding-left: 15px;
            font-size: 14px;
            color: #333333;
            line-height: 40px;
            &:last-child {
                border-bottom: 0px;
            }
            &:first-child {
                background-color: #f5f5f5;                
                font-size: 16px;
            }
        }
    }
}
</style>

