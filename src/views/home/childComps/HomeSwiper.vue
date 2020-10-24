<template>
  <swiper>
    <swiperItem v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="ImgLoad">
      </a>
    </swiperItem>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      IsLoad:false
    }
  },
  methods:{
    ImgLoad(){
      if (!this.IsLoad){
        this.$emit('SwiperImgLoad')
        this.IsLoad=true
      }
    }
  }
}
</script>

<style scoped>

</style>