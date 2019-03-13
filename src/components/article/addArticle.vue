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
                    <Upload action="//jsonplaceholder.typicode.com/posts/" name="featuresImg" :format="['jpg', 'jpeg', 'png', 'gif']" :on-format-error="formatErr" :before-upload="befUpload" :on-exceeded-size="exceededSize" :max-size="2048" :show-upload-list="false">
                        <Button icon="ios-cloud-upload-outline">选择图片</Button>
                    </Upload> 
                    <span v-if="featuresImg.name">文件名：<b>{{featuresImg.name}}</b></span>                   
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
                        <DatePicker type="date" :value="article.date" @on-change="dateChange" show-week-numbers placeholder="Select date" style="width: 80%"></DatePicker>
                    </Col>
                    <Col span="12">
                        <TimePicker format="HH:mm" :value="article.time" placeholder="Select time" @on-change="timeChange" style="width: 80%"></TimePicker>
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
import WangEditor from 'wangeditor'
export default {
  name: 'addArticle',
  data() {
    return {
      article: {
        //文章对象
        title: '',
        slug: 'slug',
        category: '',
        status: '',
        content: '',
        date: '',
        time: ''
      },
      categoryList: [
        //分类列表
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
      featuresImg: {} //特色图片
    }
  },
  created() {
    // 给发布日期以及时间设置初始值
    this.setCurrentTime()
  },
  mounted() {
    this.createEditor()
  },
  methods: {
    setCurrentTime() {
      const date = new Date()
      const y = date.getFullYear()
      const month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      const d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      const h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
      const minu =
        date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      this.article.date = y + '-' + month + '-' + d
      this.article.time = h + ':' + minu
    },
    createEditor() {
      //创建富文本编辑器
      this.editor = new WangEditor('#editor')
      this.editor.create() //创建编辑器实例
    },
    submitArt() {
      //1.获取编辑器中内容设置给表单对象
      // this.$set(this.article, 'content', this.editor.txt.html())
      this.article.content = this.editor.txt.html() //获取html格式的内容
    },
    dateChange(formatDate) {
      // 选择发布日期
      this.article.date = formatDate
    },
    timeChange(formatTime) {
      //选择发布时间
      this.article.time = formatTime
    },
    formatErr(file, fileList) {
      //文件上传格式验证失败
      console.log('file', file, 'fileList', fileList)
      this.$Message.warning('图片格式仅支持jpg、jpeg、png、gif')
    },
    befUpload(file) {
      // console.log('file', file)
      //文件上传前调用
      // this.featuresImg = file
      // return false
      //判断格式
      const type = file.name.split('.')[1]
      if(type !== 'jpg' && type !== 'jpeg' && type !== 'png' && type !== 'gif') {
        this.$Message.warning('图片格式仅支持jpg、jpeg、png、gif')
        return false
      }

      // 判断大小
      if(file.size > 2048) {
        this.$Message.warning('特色图片大小不能超过2M')
        return false
      }

      this.featuresImg = file
      return false

    },
    exceededSize(file, fileList) {
      //上传文件超出指定大小
      this.$Message.warning('特色图片大小不能超过2M')
    }
  }
}
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

