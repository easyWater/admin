<template>
  <section class="pageBox">
    <section class="pageTitle">
      <h2>权限管理</h2>
    </section>
    <section class="pageMain">
      <Tree :data="data" :render="renderContent"></Tree>
    </section>
    <Modal v-model="isModel" :title="parentId ? '新增' : '编辑'" :footer-hide="true" @on-cancel="cancelSub">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="权限名称" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入权限名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </section>
</template>

<script>
export default {
  name: "permission",
  data() {
    return {
      isModel: false,
      formValidate: {
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }]
      },
      parentId: "", //父节点的id
      editeId: '', //编辑节点的id
      data: [
        {
          title: "parent 1",
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "ios-folder-outline"
                    },
                    style: {
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "ios-add",
                        type: "primary"
                      }),
                      style: {
                        width: "64px",
                        marginRight: '8px'
                      },
                      on: {
                        click: () => {
                          this.append(root, node, data);
                        }
                      }
                    }),
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "md-create"
                      }),
                      on: {
                        click: () => {
                          this.edite(root, node, data);
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: [
            {
              title: "child 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1",
                  expand: true
                },
                {
                  title: "leaf 1-1-2",
                  expand: true
                }
              ]
            },
            {
              title: "child 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1",
                  expand: true
                },
                {
                  title: "leaf 1-2-1",
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let url = `/config/permission/tree`;
      this.$http({url }).then(res => {
        // this.data = res.data.data
      });
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.append(root, node, data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "md-create"
                }),
                on: {
                  click: () => {
                    this.edite(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(root, node, data) {
      this.parentId = root.find(el => el === node).parent;
      this.isModel = true;
      // console.log('root, node, data', root, node, data)
    },
    edite(root, node, data) {
      this.editeId = data.id
      this.isModel = true
    },
    remove(root, node, data) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认删除该权限吗？",
        onOk: () => {
          let url = ``
          this.$http({url, params: {id: ''}}).then(res => {
            //   更新视图
            this.getData()
          })
        },
        onCancel: () => {
        }
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let url = `/config/permission/save`;
          let params = {
            name: this.formValidate.name,
            parentId: this.parentId
          };
          this.$http({ url, params }).then(res => {
            //   更新结构
            this.getData();
            this.parentId = ''
            // 隐藏弹窗
            this.isModel = false;
          });
        }
      });
    },
    handleReset(name) {
      this.isModel = false;
      this.$refs[name].resetFields();
    },
    cancelSub() {
      this.$refs.formValidate.resetFields();
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.pageBox {
  padding: 0px 15px;
  .pageMain {
    width: 500px;
    margin: 0 auto;
    // background-color: #e6e9f0;
  }
}
</style>


