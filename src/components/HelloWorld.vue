<template>
  <div class="hello">
    <div>{{count1}}</div>
    <div>{{set}}</div>
    <div>{{b|fn}}</div>
    <div>
      <button @click="add">+</button>
      <button @click="reduction">-</button>
      <button @click="changeNum">改变b</button>
      <button @click="changeNum1">改变b</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      a:121
    }
  },
  computed:{
    ...mapState({
      count1:state=>state.count
    }),
    ...mapGetters(['set']),
    b:{
      get:function () {
        console.log(11)
        return this.a+1
      },
      set:function (val) {
        this.a=val+3
        console.log(val)
      }
    }

  },
  methods:{
    ...mapActions([
      'addFun',
      'reductionFun'
    ]),
    changeNum(){
      this.b=2
    },
    changeNum1(){
      this.b++
    },
    add:function () {
      let n=20
      this.addFun(n)
    },
    reduction:function () {
      this.reductionFun()
    }
  },
  filters:{
    fn:function (value) {
      return value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
