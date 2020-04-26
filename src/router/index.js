import Vue from 'vue'
import VueRouter from 'vue-router'
import task from '@/views/task.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'board',
    component:()=> import('../views/board.vue'),
    children:[
      {
      path:'task/:id',
      name:'task',
      component:task
      },
      {
        path:'createColumn',
        name:'column',
        component:()=> import('../views/column.vue'),
      }
    ] 
  },
  
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
