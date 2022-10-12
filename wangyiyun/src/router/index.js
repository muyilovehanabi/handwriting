import VueRouter from "vue-router";
import find from '../components/LeftBar/LeftBarsComponents/find.vue'
import boke from '../components/LeftBar/LeftBarsComponents/boke.vue'
import FM from '../components/LeftBar/LeftBarsComponents/FM.vue'
import guanzhu from '../components/LeftBar/LeftBarsComponents/guanzhu.vue'
import shipin from '../components/LeftBar/LeftBarsComponents/shipin.vue'
import zhibo from '../components/LeftBar/LeftBarsComponents/zhibo.vue'
import gexingtuijian from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/gexingtuijian.vue'
import zhuanshudingzhi from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/zhuanshudingzhi.vue'
import gedan from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/gedan.vue'
import paihangbang from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/paihangbang.vue'
import geshou from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/geshou.vue'
import zuixinyinyue from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/zuixinyinyue.vue'
import Detail from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/DetailMusics/Detail.vue'

import DetailPinLun from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/DetailMusics/DetailChildren/DetailPinLun.vue'
import DetailShouCang from '../components/LeftBar/LeftBarsComponents/LeftBarsChildComponets/DetailMusics/DetailChildren/DetailShouCang.vue'
import search from '../components/LeftBar/Search/search.vue'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



export default new VueRouter({
    // linkActiveClass: 'active',
    routes: [{
        path: '/find',
        component: find,
        children: [{

            path: '/find/gexingtuijian',
            component: gexingtuijian
        }, {
            path: '/find/zhuanshudingzhi',
            component: zhuanshudingzhi
        }, {
            path: '/find/gedan',
            component: gedan,

        }, {
            path: '/find/paihangbang',
            component: paihangbang
        }, {
            path: '/find/geshou',
            component: geshou
        }, {
            path: '/find/zuixinyinyue',
            component: zuixinyinyue
        }, ]
    }, {
        path: '/boke',
        component: boke
    }, {
        path: '/FM',
        component: FM
    }, {
        path: '/guanzhu',
        component: guanzhu
    }, {
        path: '/shipin',
        component: shipin
    }, {
        path: '/zhibo',
        component: zhibo
    }, {
        path: '/Detail/:id', //动态传值
        component: Detail,
        children: [{
            path: '/Detail/DetailPinLun',
            component: DetailPinLun
        }, {
            path: '/Detail/DetailShouCang',
            component: DetailShouCang
        }]
    }, {
        path: '/search',
        component: search
    }]
})