<template>
    <section class="addArticle">
        <section class="pageTitle">
            <h2>写文章 </h2>
        </section>
        <section class="arMain clearfix">
            <!-- 左侧正文 -->
            <section class="content">
                <p class="tit">标题</p>
                <Input v-model="article.title" placeholder="文章标题" clearable size="large" />
                <section id="editor">
                    <p>写点什么...</p>
                </section>
            </section>
            <!-- 右侧属性 -->
            <section class="attr">
                <section class="item">
                    <p>别名</p>
                    <Input v-model="article.slug" placeholder="slug" clearable size="large" />
                    <span>https://zce.me/post/<b>{{article.slug}}</b></span>
                </section>
                <section class="item">
                    <p>特色图像</p>
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                        <Button icon="ios-cloud-upload-outline">选择图片</Button>
                    </Upload>                    
                </section>
                <section class="item">
                    <p>所属分类</p>
                    <Select v-model="article.category">
                        <Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>                
                </section>
                <section class="item clearfix">
                    <p>发布时间</p>
                    <Col span="12">
                        <DatePicker type="date" :value="new Date()" :start-date="new Date()" @on-change="dateChange" show-week-numbers confirm placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                    <Col span="12">
                        <TimePicker format="HH:mm" :value="new Date()" confirm placeholder="Select time" @on-change="timeChange" style="width: 112px"></TimePicker>
                    </Col>               
                </section>
                <section class="item">
                    <p>状态</p>
                    <Select v-model="article.status">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>                
                </section>
                <section class="item">
                   <Button type="primary" @click="submitArt">保存</Button>            
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import WangEditor from "wangeditor";
export default {
  name: "addArticle",
  data() {
    return {
      article: {
        title: "",
        slug: "slug",
        category: "",
        status: "",
        content: "",
        date: '',
        time: ''
      },
      categoryList: [
        //分类列表
        {
          value: "study",
          label: "学习"
        },
        {
          value: "life",
          label: "生活"
        },
        {
          value: "work",
          label: "工作"
        }
      ],
      statusList: [
        //状态列表
        {
          value: "publish",
          label: "已发布"
        },
        {
          value: "waitingAudit",
          label: "待审核"
        }
      ]
    };
  },
  created() {
    // 给发布日期以及时间设置初始值
    const date = new Date()
    this.article.date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    this.article.time = date.getHours() +':'+ date.getMinutes()
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    createEditor() {
      //创建富文本编辑器
      this.editor = new WangEditor("#editor");
      this.editor.create(); //创建编辑器实例
    },
    submitArt() {
      //1.获取编辑器中内容设置给表单对象
    //   this.$set(this.article, 'content', "0000000")
      this.article.content = this.editor.txt.html(); //获取html格式的内容
      
    },
    dateChange(formatDate) {// 选择发布日期
        this.article.date = formatDate
    },
    timeChange(formatTime) { //选择发布时间
        this.article.time = formatTime
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.addArticle {
  padding: 0px 15px;
  .arMain {
    .content {
      width: 72%;
      float: left;
      .tit {
        color: #555;
        font-size: 14px;
        margin-bottom: 5px;
      }
      #editor {
        margin-top: 15px;
      }
    }
    .attr {
      width: 25%;
      float: right;
      .item {
        margin-bottom: 15px;
        p {
          font-size: 14px;
          color: #555;
          margin-bottom: 5px;
        }
        span {
          font-size: 14px;
          color: #737373;
          margin: 5px 0px 10px;
          display: block;
        }
      }
    }
  }
}
</style>

