import { request } from "./request";


export function requestsearch(type) {
    return request({
        url: '/banner',
        params: {
            type
        }
    })

    return instance(config)
}