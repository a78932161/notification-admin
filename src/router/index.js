import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router);

/* Layout */
import Layout from 'components/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('errorPage/404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'user',
    meta: {title: '角色', icon: 'example'},
    children: [
      {
        path: 'user',
        component: _import('user/index'),
        meta: {title: '角色', icon: '店铺'}
      },
    ]
  },
  {
    path: '/msg',
    component: Layout,
    redirect: '/msg',
    name: 'msg',
    meta: {title: '消息', icon: 'example'},
    children: [
      {
        path: 'msg',
        component: _import('msg/index'),
        meta: {title: '发消息', icon: '店铺'}
      },
      {
        path: 'receiveMsg',
        component: _import('msg/receive'),
        meta: {title: '收消息', icon: '店铺'}
      },
    ]
  },


  // {
  //   path: '/qx',
  //   component: Layout,
  //   redirect: '/qx/index',
  //   name: 'qx',
  //   meta: {title: '权限', icon: 'example'},
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'storeAdminTest',
  //       component: _import('permission/index'),
  //       meta: {title: '权限', icon: '店铺'}
  //     },
  //     {
  //       path: 'store',
  //       name: 'store',
  //       component: _import('permission/role'),
  //       meta: {title: '角色', icon: 'table'},
  //     },
  //   ]
  // },


  {path: '*', redirect: '/404', hidden: true}
];


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

