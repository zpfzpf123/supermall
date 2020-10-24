<template>
  <div class="cart-list">
    <scroll class="content" :pullUpLoad="true"
            :probeType="3" ref="scroll"
              >
        <cart-list-item v-for="(item,index) in itemInfo"
        :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "cartList",
  components:{
    CartListItem,
    Scroll,
  },
  computed:{
    ...mapGetters({
      itemInfo:'cartLists'
    })
  },
  activated(){
      this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height:calc(100vh - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>