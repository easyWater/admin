<template>
  <section class="login-page">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      class="login-form"
      :label-width="0"
    >
      <FormItem>
        <section class="blog-title">xuan-yy</section>
      </FormItem>
      <FormItem prop="userName">
        <Input v-model="formValidate.userName" placeholder="用户名"></Input>
      </FormItem>
      <FormItem prop="passWord">
        <Input type="password" v-model="formValidate.passWord" placeholder="密码"></Input>
      </FormItem>
      <FormItem style="text-align: center;">
        <a href="javascript: void(0);" class="submit-btn" @click="handleSubmit('formValidate')">登录</a>
      </FormItem>
    </Form>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        userName: "",
        passWord: ""
      },
      ruleValidate: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        passWord: [{ validator: validatePassWord, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let url = `/user/signIn`;
          this.$http({ url, params: this.formValidate }).then(res => {
            this.$Message.success("登录成功");
            // 存储token            
            this.$store.commit('setToken', res.data.token)
            // 优先记录页面，没有再跳转首页
            if(this.$store.getters.getLastUrl) {
              this.$router.push(this.$store.getters.getLastUrl)
            }else {
              this.$router.push('/layout/dashboard')
            }
          });
        } else {
        }
      });
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.login-page {
  padding-top: 10%;
  .login-form {
    width: 234px;
    margin: 0 auto;
    .blog-title {
      font-size: 26px;
      color: #011121;
      font-weight: 700;
      text-align: center;
    }
    .submit-btn {
      display: block;
      background-color: #57a3f3;
      width: 100%;
      height: 32px;
      color: #fff;
      border-radius: 4px;
    }
  }
}
</style>