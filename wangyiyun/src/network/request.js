import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://netease-cloud-music-api-sigma-henna.vercel.app',
        timeout: 20000
    })

    return instance(config)
}