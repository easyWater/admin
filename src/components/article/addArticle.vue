<template>
    <section class="addArticle">
        <section class="pageTitle">
            <h2>写文章</h2>
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
                <!-- <section class="item">
                    <p>别名</p>
                    <Input v-model="article.slug" placeholder="slug" clearable size="large" />
                    <span>https://zce.me/post/<b>{{article.slug}}</b></span>
                </section> -->
                <!-- <section class="item">
                    <p>特色图像</p>
                    <Upload action="//jsonplaceholder.typicode.com/posts/" name="featuresImg" :format="['jpg', 'jpeg', 'png', 'gif']" :on-format-error="formatErr" :before-upload="befUpload" :on-exceeded-size="exceededSize" :max-size="2048" :show-upload-list="false">
                        <Button icon="ios-cloud-upload-outline">选择图片</Button>
                    </Upload> 
                    <span v-if="featuresImg.name">文件名：<b>{{featuresImg.name}}</b></span>                   
                </section> -->
                <section class="item">
                    <p>所属栏目</p>
                    <Select v-model="article.type">
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>                
                </section>
                <section class="item">
                    <p>所属分类</p>
                    <Select v-model="article.category">
                        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>                
                </section>
                <!-- <section class="item clearfix">
                    <p>发布时间</p>
                    <Col span="12">
                        <DatePicker type="date" :value="article.date" @on-change="dateChange" show-week-numbers placeholder="Select date" style="width: 80%"></DatePicker>
                    </Col>
                    <Col span="12">
                        <TimePicker format="HH:mm" :value="article.time" placeholder="Select time" @on-change="timeChange" style="width: 80%"></TimePicker>
                    </Col>               
                </section> -->                
                <section class="item">
                    <p>是否立即发布</p>
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
        category: '',
        status: '',
        content: '',
        type: ''
      },
      categoryList: [
        //分类列表
      ],
      statusList: [
        //状态列表
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      typeList: [ //栏目
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
      id: '' //编辑页面有值
      // featuresImg: {} //特色图片
    }
  },
  created() {
    // 给发布日期以及时间设置初始值
    // this.setCurrentTime()
    this.getCategoryList() //获取分类数据
    if(this.$route.query.articleId) {
      this.id = this.$route.query.articleId
      this.getArtData()
    }
  },
  mounted() {
    this.createEditor()
  },
  methods: {
    // setCurrentTime() { //设置当前时间
    //   const date = new Date()
    //   const y = date.getFullYear()
    //   const month =
    //     date.getMonth() + 1 >= 10
    //       ? date.getMonth() + 1
    //       : '0' + (date.getMonth() + 1)
    //   const d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    //   const h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
    //   const minu =
    //     date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
    //   this.article.date = y + '-' + month + '-' + d
    //   this.article.time = h + ':' + minu
    // },
    getCategoryList () { //获取分类列表
      const data = {
        page: 1,
        size: -1
      }
      this.$http({url: '/category/list', type: 'POST', data}).then(res => {
        this.categoryList = res.data.records
      })
    },
    createEditor() {
      //创建富文本编辑器
      this.editor = new WangEditor('#editor')
      this.editor.create() //创建编辑器实例
    },
    submitArt() {
      // 判断标题以及正文是否存在
      if(!this.article.title) {
        this.$Message.warning('文章标题咧！')
        return
      }

      if(!this.editor.txt.text()) { //判断编辑器内是否有纯文本(排除默认p标签)
        this.$Message.warning('写点什么吧...')
        return
      }

      if(!this.article.type && this.article.type !== 0) { //判断是否选择所属栏目
        this.$Message.warning('栏目是必填哦...')
        return
      }

      if(!this.article.category) { //判断是否选择所属分类
        this.$Message.warning('分类是必填哦...')
        return
      }

      if(!this.article.status && this.article.status !== 0) { //判断是否立即发布
        this.$Message.warning('要不要立即发布捏？')
        return
      }

      this.article.content = this.editor.txt.html() //获取编辑器中内容html格式设置给表单对象

      let data = {
        categoryId: this.article.category,
        content: this.article.content,
        isFinished: this.article.status,
        title: this.article.title,
        type: this.article.type
      }

      if(this.id) {
        data.id = this.id
      }

      this.$http({url: '/article/save', type: 'POST', data}).then(res => {
        this.$Message.success(res.message)
        this.$router.push('/article/list')
      })
    },
    getArtData() { //获取文章信息
      this.$http({url: '/article/detail', type: 'post', data: {id: this.id}}).then(res => {
        this.article.title = res.data.title
        this.article.content = res.data.content
        this.article.status = res.data.isFinished
        this.article.type = res.data.type
        this.article.category = res.data.categoryId
        this.editor.txt.html(res.data.content)
      })
    }
    // dateChange(formatDate) {
    //   // 选择发布日期
    //   this.article.date = formatDate
    // },
    // timeChange(formatTime) {
    //   //选择发布时间
    //   this.article.time = formatTime
    // },
    // formatErr(file, fileList) {
    //   //文件上传格式验证失败
    //   console.log('file', file, 'fileList', fileList)
    //   this.$Message.warning('图片格式仅支持jpg、jpeg、png、gif')
    // },
    // befUpload(file) {
    //   // console.log('file', file)
    //   //文件上传前调用
    //   // this.featuresImg = file
    //   // return false
    //   //判断格式
    //   const type = file.name.split('.')[1]
    //   if(type !== 'jpg' && type !== 'jpeg' && type !== 'png' && type !== 'gif') {
    //     this.$Message.warning('图片格式仅支持jpg、jpeg、png、gif')
    //     return false
    //   }

    //   // 判断大小
    //   if(file.size > 2048) {
    //     this.$Message.warning('特色图片大小不能超过2M')
    //     return false
    //   }

    //   this.featuresImg = file
    //   return false

    // },
    // exceededSize(file, fileList) {
    //   //上传文件超出指定大小
    //   this.$Message.warning('特色图片大小不能超过2M')
    // }
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

