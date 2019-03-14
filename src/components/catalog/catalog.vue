<template>
    <section class="catalog">
        <section class="pageTitle">
            <h2>分类目录</h2>
        </section> 
        <section class="center clearfix">
            <section class="addForm">
                <h4>添加新分类目录</h4>
                <!-- 表单 -->
                <Form ref="form" :model="form" :rules="rules" label-position="top">
                    <FormItem label="名称" prop="name" label-for="name">
                        <Input type="text" v-model="form.name" size="large" element-id="name" placeholder="分类名称"></Input>
                    </FormItem>
                    <FormItem label="别名" prop="slug" label-for="slug">
                        <Input type="text" v-model="form.slug" size="large" element-id="slug" placeholder="slug"></Input>
                    </FormItem>                    
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('form')">提交</Button>
                        <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </section>
            <section class="dataTb">
                <!-- 数据表格 -->
                <Table border :columns="columns" :data="data" :loading="loading"></Table>
            </section>
        </section>
    </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        //表单数据
        name: "",
        slug: ""
      },
      rules: {
        //校验规则
        name: [{ required: true, trigger: "blur", message: "请输入分类名称" }],
        slug: [{ required: true, trigger: "blur", message: "请输入别名" }]
      },
      loading: false, //表格显示加载状态
      columns: [
        {
          type: "selection",
          width: 50
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "slug",
          key: "slug"
        },
        {
            title: '操作',
            align: 'center',
            width: 160,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'warning',
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                console.log('编辑', params.index, params.row)
                            }
                        }
                    }, '编辑'),
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
              name: '生活',
              slug: 'life'
          },
          {
              name: '工作',
              slug: 'work'
          },
          {
              name: '学习',
              slug: 'study'
          }
      ]
    };
  },
  methods: {
    handleSubmit(name) {
      //表单提交
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log("验证成功，提交数据....");
        } else {
          console.log("验证失败");
        }
      });
    },
    handleReset(name) {
      //重置表单
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.catalog {
  padding: 0px 15px;
  .center {
    .addForm {
      float: left;
      width: 32%;
      h4 {
        color: #333333;
        font-size: 17px;
        margin-bottom: 15px;
      }
    }
    .dataTb {
      float: right;
      width: 65%;
    }
  }
}
</style>

