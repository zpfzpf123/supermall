<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="title" class="tab-control"
                 @tabClick="tabClick" ref="tabcontrol1" v-show="isTabFixed">
    </tab-control>
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll"
            :pullUpLoad="true" @pullingUp="itemmore"
    >
      <home-swiper :banner="banners" @SwiperImgLoad="SwiperImgLoad"></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view/>
      <tab-control :title="title" class="tab-control"
                   @tabClick="tabClick" ref="tabcontrol2">
      </tab-control>
      <goods-list :goods="goods[currentType].list" class="goods-list"></goods-list>
    </Scroll>
    <back-top @click.native="backclick" v-show="isshow"></back-top>
  </div>

</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";

  import {getHomeMultidata,getHomegoods} from "network/home";
  import {debounce} from "common/debounce";

  export default {　
    name: "Home",
    components:{
      Scroll,
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop,
      debounce
    },
    data(){
      return{
        banners:[],
        recommends: [],
        title:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isshow:false,
        TabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    created() {
      this._getHomeMultidata()
      this._getHomegoods('pop')
      this._getHomegoods('new')
      this._getHomegoods('sell')

    },
    mounted() {
      const refresh=debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('ItemImgLoad',()=>{
          refresh()
      })

    },
    methods:{
      /*
      * 加载轮播图片完成后再计算tabcontrol的高度
      * */
        SwiperImgLoad(){
         this.TabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop
        },
      /*
      * tabcontrol的显示和隐藏
      * */
      /*
      * backtop显示和隐藏
      * */
      contentscroll(position){
        this.isshow=(-position.y)>1000
        this.isTabFixed=(-position.y)>this.TabOffsetTop
      },
      /*
      * 上拉加载更多
      * */
      itemmore(){
        this._getHomegoods(this.currentType)
        this.$refs.scroll.scroll.finishPullUp()
      },
      /*
      * 回到顶部方法
      * */
      backclick() {
        this.$refs.scroll.scrollto(0,0,500)
      },

      /*
      * 监听事件的方法
      * */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType='pop'
                break
          case 1:
            this.currentType='new'
                break
          case 2:
            this.currentType='sell'
                break
        }
        this.$refs.tabcontrol1.curretindex=index
        this.$refs.tabcontrol2.curretindex=index
      },


      /*
      * 发送网络请求的方法
      * */
      _getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      _getHomegoods(type){
        const page=this.goods[type].page+1
        getHomegoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      }
    },
/*    activated() {
      this.$refs.scroll.scrollto(0,this.saveY,0)
    },
    deactivated() {
      this.saveY=this.$refs.scroll.scroll.y
      console.log(this.saveY)
    }*/
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>
