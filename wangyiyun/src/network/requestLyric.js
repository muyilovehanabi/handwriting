import { request } from "./request";


export function requestLyric(id) {
    return request({
        url: '/lyric',
        params: {
            id
        }
    })

    return instance(config)
}