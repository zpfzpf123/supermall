



# 1 创建vue项目

```
vue create supermall
```

## 1.1 tabbar构建

## 	构建思路

![image-20200926142033563](https://gitee.com/zpfzpf123/vue/raw/master/image-20200926142033563.png)

## 组件化思想

我们把下面的导航栏可以看做一个大的组件，而里面有四个图标和文字，我们可以把这些图标和文字运用插槽的思想把他们添加进去，方便我们后期的修改和维护，代码如下

> App.vue

```vue
<template>
  <div id="app">
    <tabbar>
        <tabbaritem>
          <img slot='item-icon' src="./assets/img/tabbar/home.svg" alt="">
          <div slot='item-text'>首页</div>
        </tabbaritem>

        <tabbaritem>
          <img slot='item-icon' src="./assets/img/tabbar/category.svg" alt="">
          <div slot='item-text'>购物车</div>
        </tabbaritem>

        <tabbaritem>
          <img slot='item-icon' src="./assets/img/tabbar/shopcart.svg" alt="">
          <div slot='item-text'>分类</div>
        </tabbaritem>

        <tabbaritem>
          <img slot='item-icon' src="./assets/img/tabbar/profile.svg" alt="">
          <div slot='item-text'>我的</div>
        </tabbaritem>
    </tabbar>
  </div>
</template>

<script>
import tabbar from './components/tabbar/tabbar.vue'
import tabbaritem from './components/tabbar/tabbar-item.vue'
export default {
  name: 'App',
  components: {
    tabbar,
    tabbaritem
  }
}
</script>

<style>
@import './assets/css/base.css'
</style>

```

> tabbar.vue

```vue
<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  }
</script>

<style>
  .tabbar {
    display: flex;

    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -5px 1px rgba(100, 100, 100, .1);
  }
  .tabbar img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
</style>

```

> tabbar-item.vue

```vue
<template>
  <div class="tab-bar-item">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>

</template>

<script>
  export default {
    name: 'tabbaritem'
  }
</script>

<style>


  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }


</style>

```



> 记住，我们在使用组件化思想的时候，衡多东西不要写死，而是要动态的决定它，这个是狗建议使用插槽，不如这里我们给`tabbar`添加一个插槽，给`tabbar-item`添加两个插槽,tabbar的插槽用来给tabbar-item插入东西,tabbar-item的插槽用来给图片和文字插入，这就是组件化思想

## 路由封装

> 我们需要在每个组件上面封装一个路由，代码如下

home.vue

```vue
<template>
  <div>
    home
  </div>
</template>

<script>
  export default{
    name:'home'
  }
</script>

<style>
</style>

```

> 其它category.vue profile.vue shopcart.vue 同理

index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
const home=()=>import('../view/home/home.vue')
const category=()=>import('../view/category/category.vue')
const profile=()=>import('../view/profile/profile.vue')
const shopcart=()=>import('../view/shopcart/shopcart.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:home,
    },
    {
      path:'/category',
      component:category,
    },
    {
      path:'/shopcart',
      component:shopcart,
    },
    {
      path:'/profile',
      component:profile,
    },
  ]
})

```

App.vue

```vue
<template>
  <div id="app">
    <tabbar>
      <tabbaritem path="/home">
        <img slot='item-icon' src="./assets/img/tabbar/home.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/home_active.svg" alt="">
        <div slot='item-text'>首页</div>
      </tabbaritem>

      <tabbaritem path="/category">
        <img slot='item-icon' src="./assets/img/tabbar/category.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/category_active.svg" alt="">
        <div slot='item-text'>购物车</div>
      </tabbaritem>

      <tabbaritem path="/shopcart">
        <img slot='item-icon' src="./assets/img/tabbar/shopcart.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot='item-text'>分类</div>
      </tabbaritem>

      <tabbaritem path="profile">
        <img slot='item-icon' src="./assets/img/tabbar/profile.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/profile_active.svg" alt="">
        <div slot='item-text'>我的</div>
      </tabbaritem>
    </tabbar>
    <router-view></router-view>
  </div>

</template>

<script>
  import tabbar from './components/tabbar/tabbar.vue'
  import tabbaritem from './components/tabbar/tabbar-item.vue'
  export default {
    name: 'App',
    components: {
      tabbar,
      tabbaritem
    }
  }
</script>

<style>
  @import './assets/css/base.css'
</style>

```

tabbar-item.vue

```vue
<template>
  <div class="tab-bar-item" @click="btnclick">
    <div v-if="activtive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name='item-icons'></slot>
    </div>
    <div @click="clickactive" :class="{active:!activtive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabbaritem',
    props:{
      path:String
    },
    data() {
      return {
        activtive: true
      }
    },
    methods: {
      clickactive() {
        this.activtive = !this.activtive
      },
        btnclick() {
          this.$router.push(this.path)
      }
    }
  }
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .active {
    color: red;
  }
</style>

```

> 我们通过props给每个路由添加路径，然后添加点击事件动态切换路由

## 动态绑定style和决定组件颜色

>  代码如下

**tabbar-item.vue**

```vue
<template>
  <div class="tab-bar-item" @click="btnclick">
    <div v-if="!activtive"> //如果activtive为true,这里就为false，那么图标就会显示红色，也就是活跃路由组件图标显示为红色
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name='item-icons'></slot>
    </div>
    <div :style="activeStyle"> //动态绑定style属性
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabbaritem',
    props: {
      path: String,
      activeColor:{
        type:String,
        default:'red' //给activeColor定义为字符串，初值为red
      }
    },
    computed: {
      activtive() {
        return this.$route.path.indexOf(this.path) !== -1//如果点击的路由为当前活跃路由，那么返回true
      },
      activeStyle() {
        return this.activtive ? {
          color: this.activeColor //如果activtive为true，给style动态绑定color属性，也就是活跃路由组件的文字加上颜色，如果false就传空属性
        } : {}
      }
    },
    methods: {
      btnclick() {
        this.$router.push(this.path)
      }
    }
  }
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
</style>

```

**App.vue**

```vue
<template>
  <div id="app">
    <tabbar>
      <tabbaritem path="/home"> //这里不加activeColor表示默认为初值红色
        <img slot='item-icon' src="./assets/img/tabbar/home.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/home_active.svg" alt="">
        <div slot='item-text'>首页</div>
      </tabbaritem>

      <tabbaritem path="/category" activeColor='blue'>
        <img slot='item-icon' src="./assets/img/tabbar/category.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/category_active.svg" alt="">
        <div slot='item-text'>购物车</div>
      </tabbaritem>

      <tabbaritem path="/shopcart" activeColor='yellow'>
        <img slot='item-icon' src="./assets/img/tabbar/shopcart.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot='item-text'>分类</div>
      </tabbaritem>

      <tabbaritem path="/profile" activeColor='green'>
        <img slot='item-icon' src="./assets/img/tabbar/profile.svg" alt="">
        <img slot='item-icons' src="./assets/img/tabbar/profile_active.svg" alt="">
        <div slot='item-text'>我的</div>
      </tabbaritem>
    </tabbar>
    <router-view></router-view>
  </div>

</template>

<script>
  import tabbar from './components/tabbar/tabbar.vue'
  import tabbaritem from './components/tabbar/tabbar-item.vue'
  export default {
    name: 'App',
    components: {
      tabbar,
      tabbaritem
    }
  }
</script>

<style>
  @import './assets/css/base.css'
</style>

```

## 路径起别名配置

+ 在webpack.config.js里面添加别名

```js
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'assets':resolve('src/assets')
    }
  },
```

+ 在App.vue里运用,***注意加~号***

```vue
<img slot='item-icon' src="~assets/img/tabbar/home.svg" alt="">
<img slot='item-icons' src="~/assets/img/tabbar/home_active.svg" alt="">
```

# 2 创建目录结构

**在日常开发中，我们一般需要在src下面拥有这几个目录，如图**

![image-20201008203043006](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201008203043006.png)

****

**我们还可以添加webpack.config.js文件进行一些配置,比如给目录添加别名**

```js
const path = require('path') // 引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
            .set('network', resolve('src/network'))
            .set('common', resolve('src/common'))
        // set第一个参数：设置的别名，第二个参数：设置的路径
    },

    runtimeCompiler: true
}
```

**我们还可以添加.editorconfig文件，用来让项目格式统一化**

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

# 3 引入基础样式

我们一般需要在assets/css里面引入一些基础样式，其中**normalize.css**是很多项目都在使用的，我们可以直接在github上面下载或者使用npm命令，一般我们还会创建一个**base.css**样式，**最后把normalize.css导入到base.css样式，再把base.css样式导入到App.vue中**

# 4 初具模型

见**github**

https://github.com/zpfzpf123/tabbar-

# 5 修改标题图标

在index.html中可见

![image-20201009140303197](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201009140303197.png)

**如图所示，favicon.ico就是标题图标，我们只需要修改这里就行，修改后界面**

![image-20201009140625544](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201009140625544.png)

# 6 首页导航栏的封装和使用

**首先新建一个supermall/src/components/common/navbar/NavBar.vue**

**NavBar.vue**

```vue
<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
}
.left,.right{
  width: 60px;
}
.center{
  flex: 1;
  text-align: center;
}
</style>
```

**我们设定一个组件为NavBar,然后又在这个组件划分为三个地方，左，中，右，然后使用flex布局，**

**之后我们把这个组件用到home上**

**home.vue**

```vue
<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "Home",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
```

**给center插槽添加东西，背景色和字体颜色这些最好不要在NavBar里面使用，这种特定的样式我们可以直接在home.vue里面进行设置，达到组件复用的效果**

# 7 请求首页多个数据

 **新建network/home.js和network/request.js**

request.js用于封装axios框架

```js
import axios from 'axios';
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout:5000
    })
    // 过滤器(拦截器)
    instance.interceptors.response.use(res => {
        return res.data
    })
    return instance(config) //返回的是一个promise
}

```

home.js用于对home页的网络封装

```js
import {request} from "./request";
export function GetHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
```

最后在Home.vue实现

```vue
<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    {{list}}
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {GetHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components:{
      NavBar
    },
    data(){
      return{
        list:[]
      }
    },
    created() {
      GetHomeMultidata().then(res=>{
        this.list=res.data.banner.list[0] //当组件被创立是出发网络请求，获取到的网络结果赋值给this.list最后展现出来
      })
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
```

如图所示

![image-20201009160732332](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201009160732332.png)

#  8 首页开发轮播图的展示

**轮播图组件不多说，自己封装一个或者找ui框架，新建一个supermall/src/components/common/swiper/swiper.vue和supermall/src/components/common/swiper/swiperitem.vue和supermall/src/components/common/swiper/index.js,代码如下**

swiper.vue

```vue
<template>
    <div id="hy-swiper">
      <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <slot name="indicator">
      </slot>
      <div class="indicator">
        <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
      </div>
    </div>
</template>

<script>
 export default {
  name: "Swiper",
    props: {
      interval: {
      type: Number,
        default: 3000
      },
      animDuration: {
      type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
    return {
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动
      }
    },
    mounted: function () {
      // 1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        this.handleDom();

        // 2.开启定时器
        this.startTimer();
      }, 500)
    },
    methods: {
    /**
       * 定时器操作
       */
      startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer: function () {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent: function (currentPosition) {
        // 0.设置正在滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },

      /**
       * 校验正确的位置
       */
      checkPosition: function () {
        window.setTimeout(() => {
          // 1.校验正确的位置
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },

      /**
       * 设置滚动的位置
       */
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },

      /**
       * 操作DOM, 在DOM前后添加Slide
       */
    handleDom: function () {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },

      /**
       * 拖动事件的处理
       */
      touchStart: function (e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },

      touchMove: function (e) {
        // 1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd: function (e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          this.currentIndex++
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },

      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }
 }
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
```

swiperitem.vue

```vue
<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
 export default {
  name: "Slide"
 }
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
```

index.js

```js
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}
```

**新建supermall/src/views/home/childComps/HomeSwiper.vue作为home页上对轮播图的封装**

HomeSwiper.vue

```vue
<template>
  <swiper>
    <swiperItem v-for="(item,index) in banner" :key="index">//动态绑定index
      <a :href="item.link"> //动态绑定链接
        <img :src="item.image" alt=""> //动态绑定图片
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
  }
}
</script>

<style scoped>

</style>
```

**最后运用到Home.vue上**

Home.vue

```
<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banner="banner"></HomeSwiper>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import NavBar from 'components/common/navbar/NavBar'

  import {GetHomeMultidata} from "network/home";
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper
    },
    data(){
      return{
        banner:[]
      }
    },
    created() {
      GetHomeMultidata().then(res=>{
        this.banner=res.data.banner.list
      })
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
```

**展示效果**

![image-20201009172516805](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201009172516805.png)

# 9 首页开发推荐信息展示

**与轮播图同理我们首先建立一个supermall/src/views/home/childComps/RecommendView.vue用于作为推荐信息展示的home主页的插件**

RecommendView.vue

```vue
<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommend:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  padding: 10px 0 20px 0;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
  text-align: center;
}
.recommend img{
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
</style>
```

Home.vue

```vue
<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banner="banner"></HomeSwiper>
    <RecommendView :recommend="recommend"></RecommendView>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import NavBar from 'components/common/navbar/NavBar'
  import RecommendView from "./childComps/RecommendView";
  import {GetHomeMultidata} from "network/home";
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return{
        banner:[],
        recommend: []
      }
    },
    created() {
      GetHomeMultidata().then(res=>{
        this.banner=res.data.banner.list //轮播图数据获取
        this.recommend=res.data.recommend.list //展示信息数据获取
      })
    }
  }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
```

**如图所示**

![image-20201009182535702](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201009182535702.png)

10 首页开发FeatureView的封装

FeatureView.vue

```vue
<template>
  <div class="feature">
    <a href="http://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>

<script>
export default {
name: "FeatureView"
}
</script>

<style scoped>
.feature img{
  width: 100%;
}
</style>
```

导入Home.vue

```vue
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import NavBar from 'components/common/navbar/NavBar'
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {GetHomeMultidata} from "network/home";
  export default {　
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return{
        banner:[],
        recommend: []
      }
    },
    created() {
      GetHomeMultidata().then(res=>{
        this.banner=res.data.banner.list
        this.recommend=res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px; //防止导航栏下的轮播图被遮盖
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;//固定导航栏
  left: 0;
  right: 0;
  top: 0;
  z-index: 2; //显示导航栏防止被覆盖
}
</style>
```

# 10 首页TabControl组件的使用

**这个组件我们会在业务的其他地方使用，所以我们需要封装成一个独立的组件，而且放在components/common里，我们在里面新建tabControl文件夹，然后新建TabControl.vue文件**

TabControl.vue

```vue
<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in title"
    :class="{active:index===curretindex}"  @click="colorchange(index)">//v-for遍历title :class动态绑定class属性active @click点击改变颜色
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  props: {
    title: { //从父组件传过来title属性
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
    colorchange(index) {
      this.curretindex = index
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
```

Home.vue

```
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view/>
    <tab-control :title="title" class="tab-control"></tab-control>
    <ul>
      <li>1</li> //暂时加上 方便其他页面管理
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
      <li>51</li>
      <li>52</li>
      <li>53</li>
      <li>54</li>
      <li>55</li>
      <li>56</li>
      <li>57</li>
      <li>58</li>
      <li>59</li>
      <li>60</li>
      <li>61</li>
      <li>62</li>
      <li>63</li>
      <li>64</li>
      <li>65</li>
      <li>66</li>
      <li>67</li>
      <li>68</li>
      <li>69</li>
      <li>70</li>
      <li>71</li>
      <li>72</li>
      <li>73</li>
      <li>74</li>
      <li>75</li>
      <li>76</li>
      <li>77</li>
      <li>78</li>
      <li>79</li>
      <li>80</li>
      <li>81</li>
      <li>82</li>
      <li>83</li>
      <li>84</li>
      <li>85</li>
      <li>86</li>
      <li>87</li>
      <li>88</li>
      <li>89</li>
      <li>90</li>
      <li>91</li>
      <li>92</li>
      <li>93</li>
      <li>94</li>
      <li>95</li>
      <li>96</li>
      <li>97</li>
      <li>98</li>
      <li>99</li>
      <li>100</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";

  import {GetHomeMultidata} from "network/home";
  export default {　
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl
    },
    data(){
      return{
        banner:[],
        recommend: [],
        title:['流行','新款','精选']
      }
    },
    created() {
      GetHomeMultidata().then(res=>{
        this.banner=res.data.banner.list
        this.recommend=res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
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
  position: sticky;//到了top指定的高度就把position改为fixed
  top: 44px;
}
</style>
```

展示效果

![image-20201010135520356](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201010135520356.png)

![image-20201010135536070](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201010135536070.png)

# 11 保存商品的数据结构设计

**我们如果需要展示流行/新款/精选这些页面，我们首先设计好数据结构，收先我们要把它们的数据统一放到一个对象里进行管理，然后对象里又可以分为三个对象分别代表流行，新款，精选，在对象里，我们可以设置页码与内容，如下**

```js
goods{
  'pop':{page:0 ,list:[]}
  'news':{page:0 ,list:[]}
  'sell':{page:0 ,list:[]}
}
```

# 12 首页数据的请求和保存

**更具对商品数据结构设计的思想,设计出以下代码**

**在network/home.js添加代码**

```js
export function getHomegoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}
```

Home.vue

```vue
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view/>
    <tab-control :title="title" class="tab-control"></tab-control>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
      <li>51</li>
      <li>52</li>
      <li>53</li>
      <li>54</li>
      <li>55</li>
      <li>56</li>
      <li>57</li>
      <li>58</li>
      <li>59</li>
      <li>60</li>
      <li>61</li>
      <li>62</li>
      <li>63</li>
      <li>64</li>
      <li>65</li>
      <li>66</li>
      <li>67</li>
      <li>68</li>
      <li>69</li>
      <li>70</li>
      <li>71</li>
      <li>72</li>
      <li>73</li>
      <li>74</li>
      <li>75</li>
      <li>76</li>
      <li>77</li>
      <li>78</li>
      <li>79</li>
      <li>80</li>
      <li>81</li>
      <li>82</li>
      <li>83</li>
      <li>84</li>
      <li>85</li>
      <li>86</li>
      <li>87</li>
      <li>88</li>
      <li>89</li>
      <li>90</li>
      <li>91</li>
      <li>92</li>
      <li>93</li>
      <li>94</li>
      <li>95</li>
      <li>96</li>
      <li>97</li>
      <li>98</li>
      <li>99</li>
      <li>100</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";

  import {GetHomeMultidata,getHomegoods} from "network/home";
  export default {　
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl
    },
    data(){
      return{
        banner:[],
        recommend: [],
        title:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'news':{page:0,list:[]},
          'sell':{page:0,list:[]}
        }
      }
    },
    created() {
      this.GetHomeMultidata()
      this.getHomegoods('pop')
      this.getHomegoods('news')
      this.getHomegoods('sell')
    },
    methods:{
      GetHomeMultidata(){
        GetHomeMultidata().then(res=>{
          this.banner=res.data.banner.list
          this.recommend=res.data.recommend.list
        })
      },
      getHomegoods(type){
        const page=this.goods[type].page+1 //在下一次请求时页码加一
        getHomegoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list) //给对应type的list添加内容
          this.goods[type].page+=1 //添加完后页码加一
          /*console.log(res.data.data.keywords.list);*/
        })
      }
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
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
}
</style>
```

# 13 首页商品数据的展示

**新建supermall/src/components/content/goods/GoodsList.vue和supermall/src/components/content/goods/GoodsListItem.vue作为商品数据展示的组件**

GoodsList.vue

```vue
<template>
<div class="goods-list">
  <goods-list-item v-for="item in goods" :goods-item="item"
  class="item"
  ></goods-list-item> //遍历goods 
</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return [] //导入Home.vue的goods
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
```

GoodListItem.vue

```vue
<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{ //导入GoodsList的goods
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
```

Home.vue

```vue
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banners"></home-swiper>
    <recommend-view :recommend="recommends"></recommend-view>
    <feature-view/>
    <tab-control :title="title" class="tab-control"></tab-control>
    <goods-list :goods="goods['pop'].list" ></goods-list>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata,getHomegoods} from "network/home";
  export default {　
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data(){
      return{
        banners:[],
        recommends: [],
        title:['流行','新款','精选'],
         goods:{ //用于存储axios传来的page和list
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        }
      }
    },
    created() {
      this._getHomeMultidata()
      this._getHomegoods('pop')
      this._getHomegoods('new')
      this._getHomegoods('sell')
    },
    methods:{
      _getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      _getHomegoods(type){
        const page=this.goods[type].page+1 //每使用一次page+1
        getHomegoods(type,page).then(res=>{
          console.log(res);
          this.goods[type].list.push(...res.data.list) //把res.data.list的数组内容一个一个传给vue里的goods[type].list
          this.goods[type].page+=1 //传完后page+1
        })
      }
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
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
</style>
```

# 14 TabbarControl点击切换商品

**既然要点击切换商品，我们就得监听点击，首先，我们在TabbarControl.vue里添加如下代码**

```vue
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
      this.$emit('tabClick', index) //子传父 传index参数 
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
```

Home.vue

```vue
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banners"></home-swiper>
    <recommend-view :recommend="recommends"></recommend-view>
    <feature-view/>
    <tab-control :title="title" class="tab-control"
                 @tabClick="tabClick"> 
    </tab-control> //添加tabClick点击事件
    <goods-list :goods="goods[currentType].list" ></goods-list> //展示不同的goods[type].list 
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata,getHomegoods} from "network/home";
  export default {　
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
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
        currentType:'pop'//新建data属性，赋初始值'pop'
      }
    },
    created() {
      this._getHomeMultidata()
      this._getHomegoods('pop')
      this._getHomegoods('new')
      this._getHomegoods('sell')
    },
    methods:{
      /*
      * 监听事件的方法
      * */
      tabClick(index){ //添加方法，通过对应的index改变currentType的值
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
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      }
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
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
</style>

```

# 15 Better-Scroll的安装和使用

## **安装**

```
npm install better-scroll --save
```

## **初步使用**

```vue
<template>
  <div class="wrapper">
    <ul class="scroll">
      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
      <li>分类列表33</li>
      <li>分类列表34</li>
      <li>分类列表35</li>
      <li>分类列表36</li>
      <li>分类列表37</li>
      <li>分类列表38</li>
      <li>分类列表39</li>
      <li>分类列表40</li>
      <li>分类列表41</li>
      <li>分类列表42</li>
      <li>分类列表43</li>
      <li>分类列表44</li>
      <li>分类列表45</li>
      <li>分类列表46</li>
      <li>分类列表47</li>
      <li>分类列表48</li>
      <li>分类列表49</li>
      <li>分类列表50</li>
      <li>分类列表51</li>
      <li>分类列表52</li>
      <li>分类列表53</li>
      <li>分类列表54</li>
      <li>分类列表55</li>
      <li>分类列表56</li>
      <li>分类列表57</li>
      <li>分类列表58</li>
      <li>分类列表59</li>
      <li>分类列表60</li>
      <li>分类列表61</li>
      <li>分类列表62</li>
      <li>分类列表63</li>
      <li>分类列表64</li>
      <li>分类列表65</li>
      <li>分类列表66</li>
      <li>分类列表67</li>
      <li>分类列表68</li>
      <li>分类列表69</li>
      <li>分类列表70</li>
      <li>分类列表71</li>
      <li>分类列表72</li>
      <li>分类列表73</li>
      <li>分类列表74</li>
      <li>分类列表75</li>
      <li>分类列表76</li>
      <li>分类列表77</li>
      <li>分类列表78</li>
      <li>分类列表79</li>
      <li>分类列表80</li>
      <li>分类列表81</li>
      <li>分类列表82</li>
      <li>分类列表83</li>
      <li>分类列表84</li>
      <li>分类列表85</li>
      <li>分类列表86</li>
      <li>分类列表87</li>
      <li>分类列表88</li>
      <li>分类列表89</li>
      <li>分类列表90</li>
      <li>分类列表91</li>
      <li>分类列表92</li>
      <li>分类列表93</li>
      <li>分类列表94</li>
      <li>分类列表95</li>
      <li>分类列表96</li>
      <li>分类列表97</li>
      <li>分类列表98</li>
      <li>分类列表99</li>
      <li>分类列表100</li>
    </ul>
  </div>
</template>

<script>
import Bscroll from 'better-scroll' //导入包
  export default {
    name: "Category",
    mounted() { //组件挂在时启用
      new Bscroll(document.querySelector('.wrapper'),{//第一个参数传指定类，第二个传对象

      })
    },
  }
</script>

<style scoped>
.wrapper{
  height: 150px;
  overflow: hidden;
}
</style>
```

## betterscroll在vue里的使用和封装

**新建supermall/src/components/common/scroll/Scroll.vue**

```vue
<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
      pullUpLoad:true,
      click:true

    })
  }
}
</script>

<style scoped>

</style>
```

在Home.vue应用

```vue
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <Scroll class="content"> //里面的内容代替插槽
      <home-swiper :banner="banners"></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view/>
      <tab-control :title="title" class="tab-control"
                   @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="goods[currentType].list" class="goods-list"></goods-list>
    </Scroll>
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


  import {getHomeMultidata,getHomegoods} from "network/home";
  export default {　
    name: "Home",
    components:{
      Scroll,
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
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
        currentType:'pop'
      }
    },
    created() {
      this._getHomeMultidata()
      this._getHomegoods('pop')
      this._getHomegoods('new')
      this._getHomegoods('sell')
    },
    methods:{
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
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      }
    }
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
  position: absolute; //设置绝对定位
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>
```

# 16 BackTop组件的封装和使用

back-top组件

```vue
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
}
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 8px;
  bottom: 55px;
}
.back-top img{
  width: 43px;
  height: 43px;
}
</style>
```

scroll.vue

```vue
mounted() {
  this.scroll=new BScroll(this.$refs.wrapper,{
    pullUpLoad:true,
    click:true,
    probeType:this.probeType
  })
  this.scroll.on('scroll',(position)=>{
    this.$emit('scroll',position) //发射给父组件position
  })
},
```

```
methods:{
  scrollto(x,y,time){
    this.scroll.scrollTo(x,y,time);
  }
}
```





Home.vue

```vue
 <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll">
      <home-swiper :banner="banners"></home-swiper>
      <recommend-view :recommend="recommends"></recommend-view>
      <feature-view/>
      <tab-control :title="title" class="tab-control"
                   @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="goods[currentType].list" class="goods-list"></goods-list>
    </Scroll>
    <back-top @click.native="backclick" v-show="isshow"></back-top>
```

```vue
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
    isshow:false//初始值设为false
  }
},
```

```vue
backclick() {
        this.$refs.scroll.scrollto(0,0,500)//调用scroll组件里的方法scrollto()
      },
```

```
methods:{
  /*
  * backtop显示和隐藏
  * */
  contentscroll(position){
    this.isshow=(-position.y)>1000//当下拉高度超过1000 this.isshow为true
  },


  /*
  * 回到顶部方法
  * */
  backclick() {
    this.$refs.scroll.scrollto(0,0,500)
  },

  
}
```

# 17 解决滑动下拉图片下拉不动的bug

## 产生bug原因

**在网络请求不是特别快的时候，better-scroll会根据图片的加载情况来设定好我们的初始值高度，也就是能够下拉的高度，故而有些时候我们不能及时下拉**

## 解决bug

**在main.js添加原型**

```js
Vue.prototype.$bus=new Vue()//$bus为事件总线，用法和vuex类型，不过一个是传递数据，一个是传递事件
```

**在GoodListItem.vue添加方法用来监听图片加载**

```vue
<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">//@load代表图片加载时执行
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      this.$bus.$emit('ItemImgLoad')//没加载完一张图片执行一次发射指令
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
```

****

**GoodListItem.vue的发射指令在Home.vue接收**

```vue
created() {
  this._getHomeMultidata()
  this._getHomegoods('pop')
  this._getHomegoods('new')
  this._getHomegoods('sell')
  this.$bus.$on('ItemImgLoad',()=>{
    this.$refs.scroll.scroll.refresh()接收指令，每接受一次指令就执行一次betterscroll的更新函数，保证图片加载一张就及时更新一次下拉高度
  })
},
```

# 18 首页上拉加载更多

**在scroll.vue里设置下拉至最底部函数**

```vue
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: this.pullUpLoad,
      click: true,
      probeType: this.probeType
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')//发射出这个下拉函数
        }
    )
  },
  methods: {
    scrollto(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
```

**在Home.vue使用**

```
<Scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll"
        :pullUpLoad="true" @pullingUp="itemmore"//接收下拉函数
>
```

**在Home.vue里的methods**

```vue
itemmore(){
  this._getHomegoods(this.currentType)//调用商品函数，改变page从而增加push的数据
  this.$refs.scroll.scroll.finishPullUp()//使用一次下拉函数再finishpullUp，才能重复使用
},
```

# 19 刷新频繁的防抖函数处理

**防抖函数**：函数防抖，是指防止函数在极短的时间内反复调用，造成资源的浪费

首先我们在Home.vue中创建防抖函数

在methods里添加

```vue
/*
*防抖函数的处理
*
* */
debounce(func,delay){
  let timer=null
  return function (){
    if (timer) clearTimeout(timer) //如果timer存在，清除定时器，也就是每次delay事件为完成之前，不执行func函数
    timer=setTimeout(()=>{
      func.apply(this)
    },delay)
  }
},
```



```
mounted() {
  const refresh=this.debounce(this.$refs.scroll.refresh,200)//这里的refresh指的是debounce里的return值
  this.$bus.$on('ItemImgLoad',()=>{
      refresh()//执行定时器函数
  })
},
```

防抖函数很多地方肯能会使用到，最好做一个封装，我选择封装在src/common中

debounce.vue

```
export function debounce(func,delay){
    let timer=null
    return function (...args){
        if (timer) clearTimeout(timer)
        timer=setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}
```

# 20 tabbar-control的offsetTop获取加位置固定

**在之前的使用中，我们会发现tabbar-control因为better-scroll的加入我们的position:sticky失效了，以下是解决办法**

Home.vue

```vue
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="title" class="tab-control"
                 @tabClick="tabClick" ref="tabcontrol1" v-show="isTabFixed">//新增加一个tab-control 默认不显示
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
        isTabFixed:false
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
         this.TabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop//获取当前tabcontrol的offsetTop
        },
      /*
      * tabcontrol的显示和隐藏
      * */
      /*
      * backtop显示和隐藏
      * */
      contentscroll(position){
        this.isshow=(-position.y)>1000
        this.isTabFixed=(-position.y)>this.TabOffsetTop //当达到指定高度时候，显示class=tabcontrol1的组件
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
        this.$refs.tabcontrol1.curretindex=index//让两个组件的状态统一
        this.$refs.tabcontrol2.curretindex=index//让两个组件的状态统一
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
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          /*this.goods[type].page+=1*/
        })
      }
    }
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
```

# 21 Home离开时记录状态和位置

## 方式一：keep-alive

App.vue

```vue
<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>
<script>
import MainTabBar from 'components/content/tabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
@import "assets/css/base.css";
</style>
```

## 方式二：记录离开时的位置。返回时回到该位置(activtive deactivtive)

```
activated() {
  this.$refs.scroll.scrollto(0,this.saveY,0)
},
deactivated() {
  this.saveY=this.$refs.scroll.scroll.y
  console.log(this.saveY)
}
```

# 22 跳转到详情页并且携带id

## 创建一个新的路由detail

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail =() =>import('views/detail/Detail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component:Detail
    }
  ],
  mode: 'history'
})

export default router
```

给GoodsListItem添加点击事件

```vue
<template>
  <div class="goods-item" @click="ItemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
import Detail from "../../../views/detail/Detail";

export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      this.$bus.$emit('ItemImgLoad')
    },
    ItemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
```

Detail.vue的实现

```vue
<template>
  <div>
    <h1>{{ iid }}</h1>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data(){
    return{
      iid:null
    }
  },
  created() {
    this.iid=this.$route.params.iid//获取当前iid
  }
}
</script>

<style scoped>

</style>
```

# 23 Detail导航栏的封装

新建supermall/src/views/detail/ChildComp/DetailNavBar.vue

```vue
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backactive">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="detail">
        <div v-for="(item,index) in Titles" class="title-item"
             :class="{active:index===currentindex}"
             @click="colorrange(index)"
        >
          <div >{{item}}</div>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data(){
    return{
      Titles:['商品','参数','评论','推荐'],
      currentindex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    colorrange(index){
      this.currentindex=index
    },
    backactive(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.detail{
  display: flex;
}
.title-item{
  flex: 1;
  margin-top: 10px;
}
.active{
  color: var(--color-high-text);
}

.back img{
  margin-top: 9px;
  width: 20px;
}
</style>
```

把DetailNavBar.vue导入Detail.vue中即可

# 24 Detail数据请求以及轮播图展示

新建supermall/src/views/detail/ChildComp/DetailSwiper.vue

```vue
<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topimage" > //遍历轮播图
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper' //导入轮播图框架
export default {
  name: "DetailSwiper",
  components:{
    SwiperItem,
    Swiper
  },
  props:{
    topimage:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
```

应用组件

```vue
<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :topimage="TopImage"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import {GetDetail} from "network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      TopImage:[]
    }
  },
  components:{
    DetailNavBar,
    GetDetail,
    DetailSwiper
  },
  created() {
    this.iid=this.$route.params.iid
    GetDetail(this.iid).then(res=>{
      this.TopImage=res.result.itemInfo.topImages//存储轮播图图片
    })
  }
}
</script>

<style scoped>

</style>
```

# 25 Detail商品基本信息的展示

## 整合数据的思想

因为基本信心很多。所以我们需要把数据都整合在一起成为一个对象，当组件使用时就从这个对象里取数据即可，如下

在supermall/src/network/detail.js添加如下代码

```js
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
```

新建supermall/src/views/detail/ChildComp/DetailBaseInfo.vue 我们可以使用来自对象的数据

```vue
<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
 export default {
  name: "DetailBaseInfo",
    props: {
    goods: {
      type: Object,
        default() {
        return {}
        }
      }
    }
 }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>
```

在Detail.vue里使用

```vue
<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :topimage="TopImage"></detail-swiper>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import {GetDetail,Goods} from "network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      TopImage:[],
      goods: {}
    }
  },
  components:{
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo
  },
  created() {
    //保存传入的iid
    this.iid=this.$route.params.iid
    //获取顶部轮播图
    GetDetail(this.iid).then(res=>{
      const data=res.result
      this.TopImage=data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)//给对象传入数据
    })

  }
}
</script>

<style scoped>

</style>
```

# 26 店铺信息的解析和展示

与商品信息同理 代码如下

detail.js

```js
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}
```

新建supermall/src/views/detail/ChildComp/DetailShopInfo.vue

```vue
<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>、
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
 export default {
  name: "DetailShopInfo",
    props: {
    shop: {
      type: Object,
        default() {
        return {}
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
 }
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }

  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }

  .shop-top .title {
    margin-left: 10px;
    vertical-align: center;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }

  .sells-count, .goods-count {
    font-size: 18px;
  }

  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
```

应用在detail.vue

```vue
<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :topimage="TopImage"></detail-swiper>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import DetailShopInfo from "./ChildComp/DetailShopInfo";
import {GetDetail,Goods,Shop} from "network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      TopImage:[],
      goods: {},
      shop:{},
    }
  },
  components:{
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  created() {
    //保存传入的iid
    this.iid=this.$route.params.iid
    //获取顶部轮播图
    GetDetail(this.iid).then(res=>{
      const data=res.result
      this.TopImage=data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商铺信息
      this.shop=new Shop(data.shopInfo)
    })

  }
}
</script>

<style scoped>

</style>
```

# 27 给Detail添加滚动效果

导入better-scroll

```vue
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" :pullUpLoad="true">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import DetailShopInfo from "./ChildComp/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImage: [],
      goods: {},
      shop: {},
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
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
    })

  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px)
}
</style>
```

## 解决滚动bug

```vue
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" :pullUpLoad="true" ref="scroll" @click.native="clickscroll">//添加点击事件
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import DetailShopInfo from "./ChildComp/DetailShopInfo";
import DetailGoodsInfo from "./ChildComp/DetailGoodsInfo";
import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImage: [],
      goods: {},
      shop: {},
      detailInfo:{}
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
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
      this.detailInfo=data.detailInfo
    })
  },
  updated() {
    //解决滚动bug 每次更新后执行refresh 保证高度及时更新 能够滚动
    setTimeout(()=>{
      this.clickscroll()
    },1000)
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh()
      console.log(this.$refs.scroll)
    },
    clickscroll(){
      this.$refs.scroll.refresh()//进行一次更新让高度变化
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
  height: calc(100% - 44px);
}
</style>
```

# 28  商品详情数据展示

和商品基本信息展示同理

新建supermall/src/views/detail/ChildComp/DetailGoodsInfo.vue

```vue
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
 export default {
  name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
   return {
    counter: 0,
        imagesLength: 0
      }
    },
    methods: {
     imgLoad() {
        // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad');
        }
     }
    },
    watch: {
     detailInfo() {
       // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
     }
    }
 }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
```

运用在Detail.vue中

```vue
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" :pullUpLoad="true" ref="scroll" @click.native="clickscroll">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import DetailShopInfo from "./ChildComp/DetailShopInfo";
import DetailGoodsInfo from "./ChildComp/DetailGoodsInfo";
import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImage: [],
      goods: {},
      shop: {},
      detailInfo:{}
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
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
      this.detailInfo=data.detailInfo
    })
  },
  updated() {
    //解决滚动bug
    setTimeout(()=>{
      this.clickscroll()
    },1000)
    if (!a){
      console.log('aa')
      return a
    }
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh()
      console.log(this.$refs.scroll)
    },
    clickscroll(){
      this.$refs.scroll.refresh()
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
  height: calc(100% - 44px);
}
</style>
```

# 29 商品参数的展示

detail.js

```js
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
```

新建supermall/src/views/detail/ChildComp/DetailParamsInfo.vue

```vue
<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table, index) in paramInfo.sizes"
           class="info-size" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
 export default {
  name: "DetailParamInfo",
    props: {
    paramInfo: {
      type: Object,
        default() {
        return {}
        }
      }
    }
 }
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
```

应用在Detail.vue

```vue
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" :pullUpLoad="true" ref="scroll">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComp/DetailNavBar";
import DetailSwiper from "./ChildComp/DetailSwiper";
import DetailBaseInfo from "./ChildComp/DetailBaseInfo";
import DetailShopInfo from "./ChildComp/DetailShopInfo";
import DetailGoodsInfo from "./ChildComp/DetailGoodsInfo";
import DetailParamInfo from "./ChildComp/DetailParamInfo";
import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop,GoodsParam} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{}
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
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
      //获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })
  },
  updated() {
    //解决滚动bug
    setTimeout(() => {
      this.$refs.scroll.refresh()
    }, 1500)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    },
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
  height: calc(100% - 44px);
}
</style>
```

# 30 商品评论信息的展示(时间 格式化)

正则表达式规定年月日格式

supermall/src/common/utils.js

```js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
```

新建评论组件supermall/src/views/detail/ChildComp/DetailCommentInfo.vue 导入until.js

```vue
<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
        </div>
      </div>
    </div>
</template>

<script>
  import {formatDate} from "common/utils";
  
  export default {
  name: "DetailCommentInfo",
    props: {
    commentInfo: {
      type: Object,
        default() {
       return {}
        }
      }
    },
    filters: {
    showDate: function (value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
 }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
```

最后导入到Detail.vue

```vue
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" :pullUpLoad="true" ref="scroll" @click.native="clickscroll">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
    </scroll>
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
import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop,GoodsParam} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{}
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
      //获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      this.commentInfo=data.rate.list[0]
    })
  },
  updated() {
    //解决滚动bug
    setTimeout(() => {
      this.clickscroll()
    }, 1500)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    clickscroll() {
      this.$refs.scroll.refresh()
      console.log(this.$refs.scroll)
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
  height: calc(100% - 44px);
}
</style>
```

# 31 商品推荐数据的展示

**其实可以套用之前的goodsitem 但是我这里有bug**

所以我重新封装了一个![image-20201020162953398](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201020162953398.png)

List.vue

```vue
<template>
  <div class="goods-item" @click="ItemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>

export default {
  name: "DetailGoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      this.$bus.$emit('ItemImgLoad')
    },
    ItemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
```

lists.vue

```vue
<template>
  <div class="goods-item" >
    <img :src="this.goodsItem.image" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>

export default {
  name: "DetailGoodsLists",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
```

**其实和goodsItem写法一样**

最后运用到Detail.vue

```vue
<template>
  <div id="detail"  >
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content"  ref="scroll" :pullUpLoad="true">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <detail-goods-list :goods="recommends"/>
    </scroll>
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
import DetailGoodsList from "./ChildComp/DetailGoodsList";

import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

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
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
    }, 1500)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    },
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
  height: calc(100% - 44px);
}
</style>
```

# 32  首页和详情页监听全局事件和mixin的使用

这种问题我已经在31解决，这里可以看一下vue官网对mixin的使用

https://cn.vuejs.org/v2/api/#mixins

# 33 点击标题滚动到对应位置

 设定一个data数据用于存储位置y坐标  ThemesTopYs:[]

我们在DetailNavBar中的获取每个标题对应index中发射出此事件

```vue
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backactive">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="detail">
        <div v-for="(item,index) in Titles" class="title-item"
             :class="{active:index===currentindex}"
             @click="colorrange(index)"
        >
          <div >{{item}}</div>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data(){
    return{
      Titles:['商品','参数','评论','推荐'],
      currentindex:0
    }
  },
  components:{
    NavBar,

  },
  methods:{
    colorrange(index){
      this.currentindex=index
      this.$emit('titleClick',index) //发射事件
    },
    backactive(){
      this.$router.go(-1)

    }
  }
}
</script>

<style scoped>
.detail{
  display: flex;
}
.title-item{
  flex: 1;
  margin-top: 10px;
}
.active{
  color: var(--color-high-text);
}

.back img{
  margin-top: 9px;
  width: 20px;
}
</style>
```

我们在Detail.vue中监听这个事件，然后获取到对应的index

```vue
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :pullUpLoad="true">
      <detail-swiper :topimage="TopImage"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-goods-list :goods="recommends" ref="goodslist"/>
    </scroll>
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
import DetailGoodsList from "./ChildComp/DetailGoodsList";

import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import {debounce} from "common/debounce";

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
      ThemesTopYs: [],//存储标题对应的y坐标
    }
  },
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
    }, 1500)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(index) {//对对应的标题做对应的处理
      this.ThemesTopYs[0] = 0//给存储y坐标的数组赋值
      this.ThemesTopYs[1] = this.$refs.param.$el.offsetTop - 44
      this.ThemesTopYs[2] = this.$refs.comment.$el.offsetTop - 44
      this.ThemesTopYs[3] = this.$refs.goodslist.$el.offsetTop - 44
      this.$refs.scroll.scrollto(0, -this.ThemesTopYs[index], 500)//betterscroll切换到对应的位置
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
  height: calc(100% - 44px);
}
</style>
```

# 34 滚动内容显示对应标题

这里修改了前面33的代码位置 如果在titleClick里面给this.ThemesTopYs赋值的话，这里会有问题，会导致每次进入新的detail不惦记标题就没法滚动内容显示标题，显然这是不合理的

```vue
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
import DetailGoodsList from "./ChildComp/DetailGoodsList";

import Scroll from "components/common/scroll/Scroll";
import {GetDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import {debounce} from "common/debounce";

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
  components: {
    DetailNavBar,
    GetDetail,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(index) {
      this.$refs.scroll.scrollto(0, -this.ThemesTopYs[index], 500)
    },
    contentScroll(position){
        const positionY=-position.y //获取滚动y坐标
        for (let i=0;i<this.ThemesTopYs.length;i++) {
          if ((i<this.ThemesTopYs.length-1&&positionY>=this.ThemesTopYs[i]&&positionY<this.ThemesTopYs[i+1])||(i===this.ThemesTopYs.length-1&&positionY>=this.ThemesTopYs[i])){
            this.currentindex=i
            this.$refs.detailnav.currentindex=this.currentindex //赋值给nav的currentindex 就能改变对应颜色
          }
        }
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
  height: calc(100% - 44px);
}
</style>
```

# 35 detail底部工具栏的封装

新建supermall/src/views/detail/ChildComp/DetailBottomBar.vue

```vue
<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!--<sport-ball ref="ball" class="sport-ball"></sport-ball>-->
  </div>
</template>

<script>
/* import SportBall from 'components/content/sportBall/SportBall'*/

 export default {
  name: "DetailBottomBar",
    /*components: {
   SportBall
    },*/
    methods: {
      addToCart(event) {
       // this.$refs.ball.run(event.target)
        this.$emit('addToCart')
      }
    }
 }
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -54px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }
</style>
```

应用在Detail.vue

```vue
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
    <detail-bottom-bar/>
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
import {debounce} from "common/debounce";

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
  components: {
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
```

# 36 back-top的混入封装

抽取公共混入组件mixin.js

```js
import BackTop from "components/content/backtop/BackTop";

export const backTopmixin={
  data(){
    return{
      isshow:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollto(0,0,500)
    },
    ListerBackTop(position){
      this.isshow=(-position.y)>1000
    },
  }
}
```

在Detail.vue应用混入组件mixin.js

```vue
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
    <detail-bottom-bar/>
    <back-top @click.native="backTop" v-show="isshow"/> //应用mixin.js
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
import {debounce} from "common/debounce";

import {backTopmixin} from "common/mixin"; //导入mixin.js
import BackTop from "../../components/content/backtop/BackTop";

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
        this.ListerBackTop(position) //应用mixin.js方法
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
```

# 37 商品添加购物车

## 获取购物车需要展示的信息

Detail.vue

```vue
addToCart(){
  //获取展示信息
  const product={
    image:this.TopImage[0],
    title:this.goods.title,
    desc:this.goods.desc,
    price:parseInt(this.goods.realPrice),
    iid:this.iid
  }
  this.$store.commit('addCart',product)//向vuex提交product
}
```

store接收product

```js
mutations: {
  addCart(state,payload){
    let oldProduct=state.cartList.find(item=>item.iid===payload.iid)//前后点击购物车是否为同一商品
    console.log(oldProduct)
    if (oldProduct){
      oldProduct.count+=1//如果为同一商品,count+1
    }else {
      payload.count=1//如果为新商品，新商品数量+1
      state.cartList.push(payload)//上传新商品数据
    }
  }
},
```

# 38 vuex代码重构

****

**我们知道，在vuex中，一般有异步操作我们需要先经过actions,然后在提交到mutatioins，最后在改变state中的状态，其实，对于一些逻辑中的判断我们最好也像这样做**

Detail.vue

```vue
addToCart(){
  //获取展示信息
  const product={
    image:this.TopImage[0],
    title:this.goods.title,
    desc:this.goods.desc,
    price:parseInt(this.goods.realPrice),
    iid:this.iid
  }
  this.$store.dispatch('addCart',product)//发送给vuex中的actions
}
```

我们队vuex中代码进行重构，方便后期维护和修改，如图添加

![image-20201023131506836](https://gitee.com/zpfzpf123/vuemallimg/raw/master/image-20201023131506836.png)

首先定义常量

```js
export const ADD_OLD='addOldCart'
export const ADD_NEW='addNewCart'
```

然后actions.js用于接收Detail.vue

```js
import {ADD_NEW,ADD_OLD} from "./mutation-types";
export default {
  addCart: function (context, payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      context.commit(ADD_OLD, oldProduct)//提交给mutations.js方便后期监听
    } else {
      payload.count = 1
      context.commit(ADD_NEW, payload)
    }
  }
}
```

mutations.js

```js
import {ADD_NEW,ADD_OLD} from "./mutation-types";

export default {
  [ADD_OLD](state,payload){
    payload.count+=1
  },
  [ADD_NEW](state,payload){
    state.cartList.push(payload)
  }
}
```

# 39 购物车导航栏的实现

mapgetters的使用

可以把vuex中的getters方法在其它地方的计算属性使用

如下

getters.js

```js
export default {
  cartLength(state){
    return state.cartList.length
  }
}
```

Cart.vue

```vue
<template>
  <nav-bar class="cart-navvar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar
    },
    computed:{
      //直接用getters里的名字
      /*...mapGetters(['cartLength'])*/
      //自定义名字
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
.cart-navvar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
```

# 40 底部统计栏的封装和商品列表的实现

## 商品列表的实现

新建supermall/src/views/cart/childComps/cartList.vue

```vue
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
```

新建supermall/src/views/cart/childComps/CartListItem.vue

```vue
<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" :value="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  export default {
    name: "CartListItem",
    props: {
      itemInfo: Object
    },
    components: {
      CheckButton
    },
    methods: {
      checkedChange: function () {
        this.itemInfo.checked = !this.itemInfo.checked;//点击选择框就取反 itemInfo.checked在mutations.js中定义
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
```

mutations.js

```js
import {ADD_NEW,ADD_OLD} from "./mutation-types";

export default {
  [ADD_OLD](state,payload){
    payload.count+=1
  },
  [ADD_NEW](state,payload){
    payload.checked=false//默认checked为false
    state.cartList.push(payload)
  },
}
```

封装supermall/src/views/cart/childComps/CheckButton.vue

```vue
<template>
    <div>
      <div class="icon-selector" :class="{'selector-active':checked}" @click="selectItem">
        <img src="~assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
 export default {
  name: "CheckButton",
    props: {
    value: {
      type: Boolean,
        default: true
      }
    },
    data: function () {
    return {
      checked: this.value
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
    value: function (newValue) {
        this.checked = newValue;//value改变更新最新值
      }
    }
 }
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
```

## 底部统计栏封装

新建supermall/src/views/cart/childComps/CheckButtonBar.vue

```vue
<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :value="isSelectAll" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <span class="span2">合计:¥{{TotalPrice}}</span>
    <span class="span3">去计算     ({{length}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CheckButtonBar",
  components:{
    CheckButton
  },
  computed:{
    TotalPrice(){
      return this.$store.state.cartList.filter(item=>{//过滤返回选中的checked=true的item,然后进行价格相加
        return item.checked
      }).reduce((pre,item)=>{
        return pre+item.price*item.count
      },0)
    },
    length(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).length//返回选中的数量
    },
    isSelectAll(){
      if (this.$store.state.cartList.length===0) return false
      return !this.$store.state.cartList.find(item=>!item.checked)//只要有没有选中的就返回false
    },
  },
  methods:{
    selectAll(){
      if (this.isSelectAll){
        this.$store.state.cartList.forEach(item=>item.checked=false)//如果全部选中，就全部返回false
      }else {
        this.$store.state.cartList.forEach(item=>item.checked=true)//如果又没选中的，就全部返回true
      }
    }
  }
}
</script>

<style scoped>
.check-button{
  line-height: 20px;
  margin-right: 5px;
}
.check-all{
  display: flex;
  align-items: center;
  line-height: 40px;
  margin-left: 10px;
  flex: 1;
}
.bottom-bar{
  background-color: #eeeeee;
  display: flex;
  align-items: center;
}
.span2{
  flex: 1;
}
.span3{
  background-color: pink;
  color: white;
  flex: 1;
  line-height: 40px;

}
</style>
```

# 41 vuex-actions返回Promise-mapactions

如果我们在组件里想使用vuex中的一些方法，我们需要给vuex中的方法返回一个promise，如下

```vue
import {ADD_NEW,ADD_OLD} from "./mutation-types";
export default {
  addCart: function (context, payload) {
    return new Promise((resolve, reject) =>{//返回promise
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_OLD, oldProduct)
        resolve('当前数量加1')
      } else {
        payload.count = 1
        context.commit(ADD_NEW, payload)
        resolve('添加新的商品')
      }
    })

  }
}
```

在Detail.vue使用

```vue
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


import {mapActions} from 'vuex' //导入mapActions方法
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
    ...mapActions(['addCart']),//导入actions.js中的addCart方法
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
        console.log(res)
      }) //这里可以直接使用此方法，不需要dispatch，这也是该方法的好处
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
```

# 42 Toast的封装(弹窗的封装)

新建supermall/src/components/common/toast/Toast.vue

```vue
<template>
  <div v-show="isShow" class="toast">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return{
      isShow:false,
      message:''
    }
  },
  methods:{
    show(res,time){
      this.isShow=true
      this.message=res
      setTimeout(()=>{
        this.isShow=false
        this.message=''
      },time)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  background-color: rgba(0,0,0,.6);
  color: #EEEEEE;
}
</style>
```

新建supermall/src/components/common/toast/index.js

```js
import Toast from "./Toast";
const obj={}
obj.install=function (Vue){
  //1创建组件构造器
  const ToastContrustor=Vue.extend(Toast)
  //2根据组件构造器，创建出来一个组件对象
  const toast=new ToastContrustor()
  //3将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'))
  //toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast=toast
}
export default obj
```

在main.js中安装插件

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "components/common/toast";
Vue.use(Toast)//安装插件
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

一旦我们封装好这个插件，使用的时候就非常简单，只需要使用this.$toast.show(message,time)即可

如下

Detail.vue

```vue
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
        this.$toast.show(res,2000)//message为res,time为2s
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
```

CheckButtonBar.vue

```vue
<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :value="isSelectAll" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <span class="span2">合计:¥{{TotalPrice}}</span>
    <span class="span3" @click="toasts">去计算     ({{length}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CheckButtonBar",
  components:{
    CheckButton
  },
  computed:{
    TotalPrice(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((pre,item)=>{
        return pre+item.price*item.count
      },0)
    },
    length(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).length
    },
    isSelectAll(){
      if (this.$store.state.cartList.length===0) return false
      return !this.$store.state.cartList.find(item=>!item.checked)
    },
  },
  methods:{
    selectAll(){
      if (this.isSelectAll){
        this.$store.state.cartList.forEach(item=>item.checked=false)
      }else {
        this.$store.state.cartList.forEach(item=>item.checked=true)
      }
    },
    toasts(){
      if (this.$store.state.cartList.filter(item=>item.checked).length===0){
        this.$toast.show('请添加商品',2000) //展示弹窗
      }
    }
  }
}
</script>

<style scoped>
.check-button{
  line-height: 20px;
  margin-right: 5px;
}
.check-all{
  display: flex;
  align-items: center;
  line-height: 40px;
  margin-left: 10px;
  flex: 1;
}
.bottom-bar{
  background-color: #eeeeee;
  display: flex;
  align-items: center;
}
.span2{
  flex: 1;
}
.span3{
  background-color: pink;
  color: white;
  flex: 1;
  line-height: 40px;

}
</style>
```

# 43 fastclick解决移动端300ms延迟

## fastclick安装

```
npm install fastclick --save
```

在main.js应用

```js
import FastClick from 'fastclick' //导入包
FastClick.attach(document.body) //应用到整个body上
```

# 44 图片懒加载vue lazyload框架

## vue-lazyload安装

```
npm install vue-lazyload --save
```

官网https://github.com/hilongjw/vue-lazyload

## 在main.js导入使用

```js
//图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload)
```

## 最后应用

```vue
<img v-lazy="goodsItem.show.img" alt="" @load="imgLoad">
```

使用v-lazy进行运用

# 45 px2vw-css单位转化插件

## 安装

```
npm install postcss-px-to-viewport --save-dev
```

新建supermall/postcss.config.js

```js
module.exports = {
  plugins: {
    autoprefixer: {},
     "postcss-px-to-viewport": {
        viewportWidth: 375,  // 视窗的宽度，对应的是我们设计稿的宽度.
        viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
        unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        selectorBlackList: [], // 指定不需要转换的类,后面再讲.
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
        mediaQuery: false // 允许在媒体查询中转换`px`
     },
  }
}
```

这样我们就可以根据对应屏幕的大小自适应的改变我们的布局。，不需要手动转化px为vw，特别方便

当然，如果我们想把px转化为rem也是有插件的



