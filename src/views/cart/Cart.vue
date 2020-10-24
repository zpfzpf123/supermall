<template>
  <div>
    <nav-bar class="cart-navvar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list ref="cart"/>
    <check-button-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import cartList from "./childComps/cartList";
import CheckButtonBar from "./childComps/CheckButtonBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    cartList,
    CheckButtonBar
  },
  computed: {
    //直接用getters里的名字
    /*...mapGetters(['cartLength'])*/
    //自定义名字
    ...mapGetters({
      length: 'cartLength'
    })
  },
  methods: {}
}
</script>

<style scoped>
.cart-navvar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
