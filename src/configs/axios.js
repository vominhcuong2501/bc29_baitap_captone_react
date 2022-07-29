import axios from 'axios'
import { BASE_URL, TOKEN_CYBERSOFT } from '../constans/common'

const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        TokenCybersoft: TOKEN_CYBERSOFT
    }
})

export {request}