<template>
  <div class="goods-list">
    <detail-goods-lists v-for="item in goods" :goods-item="item"
                     class="item"
    ></detail-goods-lists>
  </div>
</template>

<script>
import DetailGoodsLists from "./DetailGoodsLists";
export default {
  name: "GoodsList",
  components:{
    DetailGoodsLists
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.goods-list .item {
  width: 48%;
}
</style>