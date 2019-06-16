import ajax from './ajax'

const BASE=''

export function reqLogin(username, password){
    return ajax(BASE+'/login',{username, password},'POST') 
}


reqLogin('admin' , 'admin').then((result)=>{
    console.log(result)
})