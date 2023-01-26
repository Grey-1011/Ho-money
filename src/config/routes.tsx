import { RouteRecordRaw } from 'vue-router'
import { ItemCreate } from '../components/item/ItemCreate'
import { ItemList } from '../components/item/ItemList'
import { TagCreate } from '../components/tag/TagCreate'
import { TagEdit } from '../components/tag/tagEdit'
import { First } from '../components/welcome/First'
import { FirstAction } from '../components/welcome/FirstAction'
import { Forth } from '../components/welcome/Forth'
import { ForthAction } from '../components/welcome/ForthAction'
import { Second } from '../components/welcome/Second'
import { SecondAction } from '../components/welcome/SecondAction'
import { Third } from '../components/welcome/Third'
import { ThirdAction } from '../components/welcome/ThirdAction'
import { http } from '../shared/Http'
import { ItemPage } from '../views/ItemPage'
import { SignInPage } from '../views/SignInPage'
import { StartPage } from '../views/StartPage'
import { StatisticsPage } from '../views/StatisticsPage'
import { TagPage } from '../views/TagPage'
import { Welcome } from '../views/Welcome'

export const routes:Readonly<RouteRecordRaw[]> = [
  { path: '/', redirect: '/welcome'},
  { path: '/welcome', 
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') === 'yes' ? next('/start') : next()
    },
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'Welcome1', components: { main: First, footer: FirstAction } },
      { path: '2', name: 'Welcome2', components: { main: Second, footer: SecondAction } },
      { path: '3', name: 'Welcome3', components: { main: Third, footer: ThirdAction } },
      { path: '4', name: 'Welcome4', components: { main: Forth, footer: ForthAction } },
    ]
  },
  { path: '/start', component: StartPage },
  { path: '/items', component: ItemPage,
    // beforeEnter: async(to, form, next) => {
    //   await http.get('/me').catch(()=>{
    //     next('/sign_in?return_to=' + to.path )
    //   })
    //   next()
    // },
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate }
    ] 
  },
  { path: '/tags', component: TagPage,
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit }
    ]
  },
  {
    path:'/sign_in', component: SignInPage
  },
  {
    path: '/statistics', component: StatisticsPage
  }
]
