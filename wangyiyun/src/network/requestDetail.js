import { request } from "./request";


export function requestDetail(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })

    return instance(config)
}