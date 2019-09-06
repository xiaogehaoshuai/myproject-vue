import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import chartSZ from '@/components/chartSZ'
import canvas from '@/components/canvasZT'
import imageCJ from '@/components/imageCJ'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:'chartSZ',
          name:'chartSZ',
          component:chartSZ
        },
        {
          path:'canvas',
          name:'canvas',
          component:canvas
        },
        {
          path:'imageCJ',
          name:'imageCJ',
          component:imageCJ
        }
      ]
    }
  ]
})
