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