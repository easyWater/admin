<template>
    <common>
        <template v-slot:title>
            用户
        </template>

        <template v-slot:formTitle>
            添加新用户
        </template>

        <template v-slot:addForm>
            <Form ref="form" :model="form" :rules="rules" label-position="top">
                <FormItem label="头像" prop="headImage">
                    <Upload :action="`${$baseUrl}/file/upload`" name="file" :show-upload-list="false" accept="image/*" :on-success="imgUpSuccess" :on-error="imgUpError">
                       <img v-if="form.headImage" class="up-img" :src="form.headImage" alt="">
                       <section v-if="!form.headImage" class="head-img">
                         <Icon type="md-add" class="add-icon" />               
                       </section>
                    </Upload>
                </FormItem>
                <FormItem label="邮箱" prop="email" label-for="email">
                    <Input type="email" v-model="form.email" size="large" element-id="email" placeholder="邮箱"></Input>
                </FormItem>                
                <FormItem label="用户名" prop="username" label-for="username">
                    <Input type="text" v-model="form.username" size="large" element-id="username" placeholder="用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password" label-for="password">
                    <Input type="password" v-model="form.password" size="large" element-id="password" placeholder="密码"></Input>
                </FormItem> 
                <FormItem label="状态" prop="status">
                    <RadioGroup v-model="form.status">
                        <Radio :label="1">启用</Radio>
                        <Radio :label="0">停用</Radio>
                    </RadioGroup>
                </FormItem>                   
                <FormItem>
                    <Button type="primary" @click="handleSubmit('form')">{{id ? '修改' : '新增'}}</Button>
                    <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </template>

        <template v-slot:tb>
            <Table border :columns="columns" :data="data" :loading="loading"></Table>
        </template>
    </common>
</template>

<script>
import common from "../common/common.vue";
export default {
  name: 'user',
  components: {
    common
  },
  data() {
    return {
      form: {
        headImage: '',
        email: "",
        username: "",
        password: "",
        status: 1
      },
      rules: {
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱" },
          { type: "email", trigger: "blur", message: "请输入正确的邮箱格式" }
        ],
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      loading: false, //表格加载数据状态
      columns: [
        {
          title: "头像",
          key: "headImage",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.headImage
              },
              style: {
                width: "80px",
                margin: "5px auto"
              }
            });
          }
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if(params.row.status === 0) {
              return h('span', {}, '禁用')
            }else {
              return h('span', {}, '启用')
            }
          }
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getDetail(params.row.id)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  on: {
                    click: () => {
                      this.delRow(params.row.id)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [
      ],
      id: null, //编辑时存在
    };
  },
  created() {
    this.getList()
  },
  methods: {
    handleSubmit(name) {
      //表单提交
      this.$refs[name].validate(valid => {
        if (valid) {
          const url = `/user/save`
          let params = JSON.parse(JSON.stringify(this.form))
          if(this.id) {
            params.id = this.id
          }
          this.$http({url, params}).then(res => {            
            this.getList()
            this.$Message.success('操作成功')
            this.$refs[name].resetFields()
            this.id = null
          })
        } else {     
        }
      });
    },
    handleReset(name) {
      // 重置表单
      this.$refs[name].resetFields();
    },
    getList() { //获取表格数据
      this.loading = true
      const url = `/user/list`
      this.$http({url}).then(res => {
        this.data = res.data.records
        this.loading = false
      })
    },
    imgUpSuccess(response) { //图片上传成功
      this.form.headImage = response.data.url
      this.$Message.success('上传成功')
    },
    imgUpError(error, file, fileList) { //图片上传失败
      this.$Message.error('上传失败,请稍后再试...', error)
    },
    delRow(id) { //删除
      this.$Modal.confirm({
          title: '提示',
          content: '确认删除吗?',
          onOk: () => {
              this.$http({url: `/user/delete`, params: {ids: id} }).then(res => {
                this.getList()
                this.$Message.success('删除成功')    
              })
          },
          onCancel: () => {
          }
      })
    },
    getDetail(id) { //详情
      this.id = id
      this.$http({url: `/user/detail`, params: {id}}).then(res => {
        this.form.email = res.data.email
        this.form.headImage = res.data.headImage
        this.form.username = res.data.username
        this.form.password = res.data.password
        this.form.status = res.data.status
      })
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.up-img {
  width: 99px;
  cursor: pointer;
}
.head-img {
  width: 99px;
  height: 99px;
  border: 1px solid #dcdee2;
  text-align: center;
  line-height: 99px;
  background-color: #f8f8f9;
  .add-icon {
    font-size: 26px;
  }
}
</style>

