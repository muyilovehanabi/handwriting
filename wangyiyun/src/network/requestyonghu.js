import { request } from "./request";


export function requestyonghu(phone, password) {
    return request({
        url: '/login/cellphone',
        params: {
            phone,
            password
        }
    })

    return instance(config)
}