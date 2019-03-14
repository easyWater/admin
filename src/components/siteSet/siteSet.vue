<template>
    <section class="siteSet">
        <section class="pageTitle">
            <h2>网站设置</h2>
        </section>
        <section>
            <Form ref="form" :model="form" :rules="rules" :label-width="120">
                <!-- 网站图标上传 -->
                <FormItem label="网站图标" prop="icon" >
                    <Upload action="//jsonplaceholder.typicode.com/posts/" ref="upload" :max-size="2048" :format="['jpg', 'jpeg', 'png']" :show-upload-list="false" :on-format-error="formatError" :on-exceeded-size="maxSizeError" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="bfUpload">
                        <img src="../../../statics/images/default.png" style="width: 150px;">
                    </Upload>
                </FormItem>
                <FormItem label="站点名称" prop="name" label-for="name">
                    <Input type="text" v-model="form.name" size="large" element-id="name" placeholder="站点名称"></Input>
                </FormItem>
                <FormItem label="站点描述" prop="desc" label-for="desc">
                    <Input type="textarea" v-model="form.desc" size="large" element-id="desc" placeholder="站点描述"></Input>
                </FormItem>
                <FormItem label="站点关键词" prop="keyWords" label-for="keyWords">
                    <Input type="text" v-model="form.keyWords" size="large" element-id="keyWords" placeholder="站点关键词"></Input>
                </FormItem>          
                <FormItem label="评论" prop="comments">
                    <CheckboxGroup v-model="form.comments">
                        <Checkbox style="margin-right: 18px;" label="openCom">开启评论功能</Checkbox>
                        <Checkbox label="mustAppro">评论必须经人工批准</Checkbox>                    
                    </CheckboxGroup>
                </FormItem>             
                <FormItem>
                    <Button type="primary" @click="handleSubmit('form')">提交</Button>
                    <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </section>
    </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        desc: "",
        keyWords: "",
        comments: ['openCom', 'mustAppro']
      },
      rules: {
        name: [{ required: true, message: "请输入站点名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入站点描述", trigger: "blur" }],
        keyWords: [
          { required: true, message: "请输入站点关键词", trigger: "blur" }
        ],
        comments: [
          // { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          // { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      //表单提交
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log("验证通过，提交数据...");
        } else {
          console.log("验证失败");
        }
      });
    },
    handleReset(name) {
      // 重置表单
      this.$refs[name].resetFields();
    },
    formatError(file, fileList) {
        this.$Message.warning('图片格式仅支持jpg、jpeg、png')
    },
    maxSizeError(file, fileList) {
      this.$Message.warning('图片大小不可超过2M')
    },
    uploadSuccess(response, file, fileList) {
      // 获取服务器返回的url并设置给img的src展示
    },
    uploadError(error, file, fileList) {
      // 友好提示
    },
    bfUpload(file) {
      console.log(file)
      // 1.action中设置正确的服务器接口
      // 2.限制图片格式，写好处理函数
      // 3.限制图片大小，写好处理函数
      // 4.在上传成功的处理函数中，获取服务器返回的url并设置给img的src展示
      // 5.在上传失败的处理函数中，友好提示
      // 6.控制只能上传一张


      // return this.$refs.upload.fileList.length !== 1 该方式只能上传第一张，不可更改

      this.$refs.upload.clearFiles() //清空已上传的文件，配合单文件上传确保只有一张

      // const type = file.name.split('.')[1]
      // if(type !== 'jpg' && type !== 'jpeg' && type !== 'png' && type !== 'gif') {
      //   this.$Message.warning('图片格式仅支持jpg、jpeg、png、gif')
      //   return false
      // }

      // if(file.size > 2048) {
      //   this.$Message.warning('图片大小不可超过2M')
      //   return false
      // }

      
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.siteSet {
  padding: 0px 15px;
}
</style>




