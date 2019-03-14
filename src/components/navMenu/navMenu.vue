<template>
    <common>
        <template v-slot:title>
            导航菜单
        </template>

        <template v-slot:formTitle>
            添加新导航链接
        </template>

        <template v-slot:addForm>
            <Form ref="form" :model="form" :rules="rules" label-position="top">
                <FormItem label="文本" prop="txt" label-for="txt">
                    <Input type="text" v-model="form.txt" size="large" element-id="txt" placeholder="文本"></Input>
                </FormItem>
                <FormItem label="标题" prop="title" label-for="title">
                    <Input type="text" v-model="form.title" size="large" element-id="title" placeholder="标题"></Input>
                </FormItem>
                <FormItem label="链接" prop="link" label-for="link">
                    <Input type="text" v-model="form.link" size="large" element-id="link" placeholder="链接"></Input>
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
          txt: '',
          title: '',
          link: ''
      },
      rules: {
          txt: [
              {required: true, trigger: 'blur', message: '请输入文本'}
          ],
          title: [
              {required: true, trigger: 'blur', message: '请输入标题'}
          ],
          link: [
              {required: true, trigger: 'blur', message: '请输入链接'}
          ]
      },
      showBatch: false, //是否显示批量操作
      loading: false, //表格是否显示加载中
      columns: [
        {
          type: "selection",
          width: 50
        },
        {
          title: "文本",
          key: "txt"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "链接",
          key: "link"
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
          txt: '奇趣事',
          title: '奇趣事',
          link: '#'
        },
        {
          txt: '潮科技',
          title: '潮科技',
          link: '#'
        },
        {
          txt: '会生活',
          title: '会生活',
          link: '#'
        }
      ],
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

