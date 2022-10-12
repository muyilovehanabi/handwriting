import { request } from "./request";


export function requesthighquality(limit) {
    return request({
        // url: '/playlist/hot', //用于获取歌单分类

        url: '/top/playlist/highquality',
        params: {
            limit
        }
        // params: {
        //     type
        // }
    })

    return instance(config)
}