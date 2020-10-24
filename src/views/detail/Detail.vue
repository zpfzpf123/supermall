<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"/>
    <scroll class="content" ref="scroll" :pullUpLoad="true" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-goods-list :goods="recommends" ref="goodslist"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTop" v-show="isshow"/>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import DetailShopInfo from "./ChildComp/DetailShopInfo";
import DetailGoodsInfo from "./ChildComp/DetailGoodsInfo";
import DetailParamInfo from "./ChildComp/DetailParamInfo";
import DetailCommentInfo from "./ChildComp/DetailCommentInfo";
import DetailBottomBar from "./ChildComp/DetailBottomBar";
import DetailGoodsList from "./ChildComp/DetailGoodsList";

import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";


import {backTopmixin} from "common/mixin";
import BackTop from "../../components/content/backtop/BackTop";


import {mapActions} from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      ThemesTopYs: [],
      currentindex:0
    }
  },
  mixins:[backTopmixin],
  components: {
    BackTop,
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    DetailGoodsList,

    Scroll
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //获取顶部轮播图
    GetDetail(this.iid).then(res => {
      const data = res.result
      this.TopImage = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取商铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品详情数据
      this.detailInfo = data.detailInfo
      console.log(data)
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论信息
      if (data.rate.list[0]) {
        this.commentInfo = data.rate.list[0]
      }

    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  updated() {
    //解决滚动bug
    setTimeout(() => {
      this.$refs.scroll.refresh()
      this.ThemesTopYs[0] = 0
      this.ThemesTopYs[1] = this.$refs.param.$el.offsetTop - 44
      this.ThemesTopYs[2] = this.$refs.comment.$el.offsetTop - 44
      this.ThemesTopYs[3] = this.$refs.goodslist.$el.offsetTop - 44
    }, 1500)
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(index) {
      this.$refs.scroll.scrollto(0, -this.ThemesTopYs[index], 500)
    },
    contentScroll(position){
        const positionY=-position.y
        for (let i=0;i<this.ThemesTopYs.length;i++) {
          if ((i<this.ThemesTopYs.length-1&&positionY>=this.ThemesTopYs[i]&&positionY<this.ThemesTopYs[i+1])||(i===this.ThemesTopYs.length-1&&positionY>=this.ThemesTopYs[i])){
            this.currentindex=i
            this.$refs.detailnav.currentindex=this.currentindex
          }
        }
        this.ListerBackTop(position)
    },
    addToCart(){
      //获取展示信息
      const product={
        image:this.TopImage[0],
        title:this.goods.title,
        desc:this.goods.desc,
        price:parseInt(this.goods.realPrice),
        iid:this.iid
      }
      this.addCart(product).then(res=>{
        this.$toast.show(res,2000)
      })
      /*this.$store.dispatch('addCart',product).then(res=>{
        console.log(res)
      })*/
    }

  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  overflow: scroll;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 102px);
}
</style>