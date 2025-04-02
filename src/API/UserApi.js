import Api from './api'

export default {
    signUp:(data)=>Api.post('user/register/',data),
    signIn:(data)=>Api.post('user/login/',data),

}