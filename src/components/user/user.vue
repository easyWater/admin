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
                <FormItem label="邮箱" prop="email" label-for="email">
                    <Input type="email" v-model="form.email" size="large" element-id="email" placeholder="邮箱"></Input>
                </FormItem>
                <FormItem label="别名" prop="slug" label-for="slug">
                    <Input type="text" v-model="form.slug" size="large" element-id="slug" placeholder="slug"></Input>
                </FormItem>
                <FormItem label="昵称" prop="nickname" label-for="nickname">
                    <Input type="text" v-model="form.nickname" size="large" element-id="nickname" placeholder="昵称"></Input>
                </FormItem>
                <FormItem label="密码" prop="password" label-for="password">
                    <Input type="password" v-model="form.password" size="large" element-id="password" placeholder="密码"></Input>
                </FormItem>                    
                <FormItem>
                    <Button type="primary" @click="handleSubmit('form')">提交</Button>
                    <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </template>

        <template v-slot:tb>
            <Button v-show="showBatch" type="error" style="margin-bottom: 10px">批量删除</Button>
            <Table border :columns="columns" :data="data" :loading="loading" @on-select-all="selAll" @on-select-all-cancel="cancelSelAll" @on-selection-change="selChange"></Table>
        </template>
    </common>
</template>

<script>
import common from "../common/common.vue";
export default {
  components: {
    common
  },
  data() {
    return {
      form: {
        email: "",
        slug: "",
        nickname: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, trigger: "blur", message: "请输入邮箱" },
          { type: "email", trigger: "blur", message: "请输入正确的邮箱格式" }
        ],
        slug: [{ required: true, trigger: "blur", message: "请输入别名" }],
        nickname: [{ required: true, trigger: "blur", message: "请输入昵称" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      },
      loading: false, //表格加载数据状态
      columns: [
        {
          type: "selection",
          width: 50
        },
        {
          title: "头像",
          key: "headImg",
          align: "center",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.headImg
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
          title: "别名",
          key: "slug"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "状态",
          key: "status"
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
                      console.log("编辑", params.index, params.row);
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
                      console.log("删除", params.index, params.row);
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
        {
          headImg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552559353782&di=58f8ec135f8d6aa2248fe8ba275cddcd&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F26%2F20180326120657_cuhhd.png",
          email: "1234567890@qq.com",
          slug: "虎太郎1",
          nickname: "小宝宝",
          status: "启用"
        },
        {
          headImg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552559409425&di=2e1c4df2916ea41296c8208a8d04386a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F05%2F20180505122857_dfftg.thumb.700_0.jpg",
          email: "1234567890@qq.com",
          slug: "虎太郎2",
          nickname: "小宝宝",
          status: "禁用"
        },
        {
          headImg:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552559440307&di=ebd3417add75f16edb402a75dc164cd2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F14%2F20180714142138_CYFTh.thumb.700_0.jpeg",
          email: "1234567890@qq.com",
          slug: "虎太郎3",
          nickname: "小宝宝",
          status: "启用"
        }
      ],
      showBatch: false
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
    selAll(selection) {
      //全选按钮选中
      console.log("selection: ", selection);
      this.showBatch = true; //显示批量删除
    },
    cancelSelAll(selection) {
      //全选按钮取消选中
      console.log("selection: ", selection);
      this.showBatch = false; //隐藏批量删除
    },
    selChange(selection) { //只要选中项发生变化时就会触发
        if(selection.length > 1) {
            this.showBatch = true
        }else {
            this.showBatch = false
        }
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
</style>

