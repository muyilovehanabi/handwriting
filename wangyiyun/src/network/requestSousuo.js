import { request } from "./request";


export function requestSousuo(keywords, type) {
    return request({
        url: '/search',
        params: {
            keywords,
            type
        }
    })

    return instance(config)
}