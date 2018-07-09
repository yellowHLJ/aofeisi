import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '勘查信息' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面 permission true时不能进入页面，false能进入页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: false }
                },
                {
                    // 勘察点详细信息
                    path: '/detailedData',
                    component: resolve => require(['../components/page/DetailedData.vue'], resolve),
                    meta: { title: '勘察点详细信息' }
                },
                 {
                    // 我的任务
                    path: '/MyTask',
                    component: resolve => require(['../components/page/MyTask.vue'], resolve),
                    meta: { title: '我的任务' }
                },
                {
                    // 我的任务详情
                    path: '/MyTaskDte',
                    component: resolve => require(['../components/page/MyTaskDte.vue'], resolve),
                    meta: { title: '我的任务详情' }
                },
                {
                    // 地图显示
                    path: '/MapProspect',
                    name: 'MapProspect',
                    component: resolve => require(['../components/page/MapProspect.vue'], resolve),
                    meta: { title: '地图显示' }
                },
                {
                    // 地图显示
                    path: '/ViewDetail',
                    name: 'ViewDetail',
                    component: resolve => require(['../components/page/ViewDetail.vue'], resolve),
                    meta: { title: '勘察点报告' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
