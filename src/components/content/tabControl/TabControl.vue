<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in title"
    :class="{active:index===curretindex}"  @click="colorchange(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      curretindex: 0
    }
  },
  methods: {
    colorchange: function (index) {
      this.curretindex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
.tab-control-item span{
  padding: 5px;
}
</style>