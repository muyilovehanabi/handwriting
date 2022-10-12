import { request } from "./request";


export function requestGeShou(area, type, initial, offset) {
    return request({
        url: '/artist/list',
        params: {
            type,
            area,
            initial,
            offset
        }
    })

    return instance(config)
}