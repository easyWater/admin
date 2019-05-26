<template>
  <common>
    <template v-slot:title>
      分类目录
    </template>

    <template v-slot:formTitle>
      添加新分类目录
    </template>

    <template v-slot:addForm>
      <Form ref="form" :model="form" :rules="rules" label-position="top">
        <FormItem label="名称" prop="name" label-for="name">
          <Input type="text" v-model="form.name" size="large" element-id="name" placeholder="分类名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="slug" label-for="slug">
          <Input type="text" v-model="form.slug" size="large" element-id="slug" placeholder="别名"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('form')">提交</Button>
          <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </template>

    <template v-slot:tb>
      <Button v-show="showBatch" type="error" style="margin-bottom: 10px" @click="delCata">批量删除</Button>
      <Table border :columns="columns" :data="data" :loading="loading" @on-selection-change="selChange"></Table>
      <!-- 分页器 -->
      <Page :total="total" style="text-align: right; margin-top: 15px;" :current="pageIndex" :page-size="pageSize" show-elevator show-sizer show-total :page-size-opts="[8, 15, 20, 25]" @on-change="indexChange" @on-page-size-change="sizeChange" />
    </template>
  </common>
</template>

<script>
import common from '../common/common.vue'
export default {
  components: {
    common
  },
  data() {
    return {
      form: {
        //表单数据
        name: '',
        slug: ''
      },
      rules: {
        //校验规则
        name: [{ required: true, trigger: 'blur', message: '请输入分类名称' }],
        slug: [{ required: true, trigger: 'blur', message: '请输入别名' }]
      },
      loading: false, //表格显示加载状态
      columns: [
        {
          type: 'selection',
          width: 50
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '别名',
          key: 'alias'
        },
        {
          title: '操作',
          align: 'center',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'warning'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.getCataData(params.row.id)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error'
                  },
                  on: {
                    click: () => {
                      this.ids = []
                      this.ids.push(params.row.id)
                      this.delCata()
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data: [
        // 表格数据
      ],
      total: 0, //总页数
      pageSize: 10, //页容量
      pageIndex: 1, //当前页
      showBatch: false, //是否显示批量操作
      ids: [
        // 删除分类的id集合
      ],
      id: '' //编辑页时，分类id
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSubmit(name) {
      //表单提交
      this.$refs[name].validate(valid => {
        if (valid) {
          const data = {
            name: this.form.name,
            alias: this.form.slug
          }
          if (this.id) {
            //编辑
            data.id = this.id
          }
          this.$http({ url: '/category/save', type: 'POST', data }).then(
            res => {
              this.$Message.success(res.message)
              this.getData()
              this.$refs[name].resetFields()
            }
          )
        } else {
          // 验证失败
        }
      })
    },
    handleReset(name) {
      //重置表单
      this.$refs[name].resetFields()
    },
    selChange(selection) {
      //只要选中项发生变化时就会触发
      if (selection.length > 1) {
        this.showBatch = true
        this.ids = []
        selection.forEach(item => {
          this.ids.push(item.id)
        })
      } else {
        this.showBatch = false
      }
    },
    getData() {
      this.loading = true
      const data = {
        page: this.pageIndex,
        size: this.pageSize
      }
      this.$http({ url: '/category/list', type: 'POST', data }).then(res => {
        this.data = res.data.records
        this.total = res.data.total
        this.loading = false
      })
    },
    getCataData(id) {
      //根据id查询分类详情
      this.$http({ url: '/category/detail', type: 'POST', data: { id } }).then(
        res => {
          this.form.name = res.data.name
          this.form.slug = res.data.alias
          this.id = res.data.id
        }
      )
    },
    delCata() {
      //删除分类
      const data = {
        ids: this.ids.join(',')
      }
      this.$http({ url: '/category/delete', type: 'POST', data }).then(res => {
        this.$Message.success(res.message)
        this.getData()
      })
    },
    indexChange(index) {
      //当前页改变
      this.pageIndex = index
      this.getData()
    },
    sizeChange(size) {
      //页容量改变
      this.pageSize = size
      this.pageIndex = 1
      this.getData()
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
</style>

