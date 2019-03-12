<template>
    <section class="article">
        <section class="heade">
            <h2>所有文章 </h2>
            <a href="javascript: void(0);">写文章</a>
        </section>
        <section class="toolbar">
            <Button type="error">批量删除</Button>
            <Dropdown style="margin-left: 12px">
                <Button>
                    所有分类
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>分类1</DropdownItem>
                    <DropdownItem>分类2</DropdownItem>                    
                    <DropdownItem>分类3</DropdownItem>                   
                </DropdownMenu>
            </Dropdown>
            <Dropdown style="margin-left: 6px">
                <Button>
                    所有状态
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>状态1</DropdownItem>
                    <DropdownItem>状态2</DropdownItem>                    
                    <DropdownItem>状态3</DropdownItem>                   
                </DropdownMenu>
            </Dropdown>
            <Button style="margin-left: 6px">
                筛选
            </Button>
        </section>
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss" type="text/css" scoped>
.article {
  padding: 0px 15px;
  .heade {
    margin-bottom: 20px;
    h2 {
      color: #333333;
      font-size: 24px;
      display: inline-block;
      vertical-align: middle;
    }
    a {
      color: #fff;
      background-color: #40586d;
      border: 1px solid #374b5d;
      font-size: 12px;
      margin-left: 10px;
      padding: 0px 5px;
      line-height: 20px;
      border-radius: 3px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>


