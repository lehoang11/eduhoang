export const APP_VERSION = "19900206"
const env = process.env.MY_ENV == "production" ? "production" : "development"
const SwitchAPI = {
    production: "http://eduonline.topica.vn",
    //development: "http://118.70.223.167:8080"
    development: "http://localhost:3030"
}
const API_BASE = SwitchAPI[env]

console.log(`API: ${API_BASE}, MODE: ${env}, APP_VERSION: ${APP_VERSION}`)

const API_URL = {
    GET_USER_LOGIN: API_BASE + "/api/mobile/user/login",

}

export default API_URL
