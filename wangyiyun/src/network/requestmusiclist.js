import { request } from "./request";


export function requestmusiclist(cat, limit, order) {
    return request({
        // url: '/playlist/hot', //用于获取歌单分类

        url: '/top/playlist',
        params: {
            cat,
            limit,
            order
        }
        // params: {
        //     type
        // }
    })

    return instance(config)
}