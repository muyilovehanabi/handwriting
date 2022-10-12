import { request } from "./request";


export function requestDetailSongs(id) {
    return request({
        url: '/playlist/track/all',
        params: {
            id
        }
    })

    return instance(config)
}