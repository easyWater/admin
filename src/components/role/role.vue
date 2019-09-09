<template>
    <common>
        <template v-slot:title>
            角色
        </template>

        <template v-slot:formTitle>
            添加新角色
        </template>

        <template v-slot:addForm>
            <Form ref="form" :model="form" :rules="rules" label-position="top">                
                           
                <FormItem label="名称" prop="name" label-for="name">
                    <Input type="text" v-model="form.name" size="large" element-id="name" placeholder="名称"></Input>
                </FormItem>

                <FormItem label="分配权限" prop="name">
                     <Tree :data="data2" show-checkbox></Tree>
                </FormItem>

                 <FormItem label="备注" prop="remark" label-for="remark">
                    <Input type="textarea" v-model="form.remark" size="large" element-id="remark" placeholder="备注"></Input>
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
        name: '',
        remark: "",       
      },
      rules: {       
        name: [{ required: true, trigger: "blur", message: "请输入名称" }],
        remark: [{ required: true, trigger: "blur", message: "请输入备注" }],
      },
      loading: false, //表格加载数据状态
      columns: [        
        {
          title: "名称",
          key: "name"
        },
        {
          title: "备注",
          key: "remark"
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
      data2: [
        {
            title: 'parent 1',
            expand: true,
            children: [
                {
                    title: 'parent 1-1',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-1-1'
                        },
                        {
                            title: 'leaf 1-1-2'
                        }
                    ]
                },
                {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-2-1'
                        },
                        {
                            title: 'leaf 1-2-1'
                        }
                    ]
                }
            ]
        }
    ]
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
          const url = `/config/role/save`
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
    },
    getPermissions() {// 获取权限列表
        let url = `/config/permission/list`
        this.$http({url}).then(res => {
            
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

