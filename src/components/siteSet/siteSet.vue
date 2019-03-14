<template>
    <section class="siteSet">
        <section class="pageTitle">
            <h2>网站设置</h2>
        </section>
        <section>
            <Form ref="form" :model="form" :rules="rules" :label-width="120">
                <!-- 网站图标上传 -->
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
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.siteSet {
  padding: 0px 15px;
}
</style>




