import { request } from "./request";


export function requestsongs(id, br) {
    return request({
        url: '/song/url',
        params: {
            id,
            br //br:这里是用来设置请求过来的音乐的码率的
        }
    })

    return instance(config)
}