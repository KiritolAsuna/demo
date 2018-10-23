import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import huiyuan from '@/components/huiyuan'
import gouwuche from '@/components/gouwuche'
import chazhao from '@/components/chazhao'
import lianxi from '@/components/lianxi'
import liuyan from '@/components/liuyan'
import tupian from '@/components/tupian'
import xinwen from '@/components/xinwen'
import jingpin from '@/components/jingpin'
import news from '@/components/news'
import tpxq from '@/components/tpxq'
import jpxq from '@/components/jpxq'
import gpl from '@/components/gpl'
import gcontent from '@/components/gcontent'
import zhuce from '@/components/zhuce'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'Home' } },
    { name: 'Home', path: '/home', component: Home },
    { name: 'huiyuan', path: '/huiyuan', component: huiyuan },
    { name: 'gouwuche', path: '/gouwuche', component: gouwuche },
    { name: 'chazhao', path: '/chazhao', component: chazhao },
    { name: 'lianxi', path: '/lianxi', component: lianxi },
    { name: 'liuyan', path: '/liuyan', component: liuyan },
    { name: 'tupian', path: '/tupian/:id', component: tupian },
    { name: 'xinwen', path: '/xinwen/list', component: xinwen },
    { name: 'jingpin', path: '/jingpin', component: jingpin },
    { name: 'news', path: '/xinwen/list/news', component: news },
    { name: 'tpxq', path: '/tupian/tpxq/:id/:ids/:name', component: tpxq },
    { name: 'jpxq', path: '/jingpin/jpxq/:id', component: jpxq },
    { name: 'gpl', path: '/jingpin/jpxq/:id/gpl', component: gpl },
    { name: 'gcontent', path: '/jingpin/jpxq/:id/gcontent', component: gcontent },
    { name: 'zhuce', path: '/huiyuan/zhuce', component: zhuce },
  ]
})
