import store from 'store'


export function saveUser (user){
    // localStorage.setItem('USER-KEY',JSON.stringify(user))
    store.set('USER-KEY',user)
}

export function getUser(){
    // return JSON.parse(localStorage.getItem('USER-KEY')|| '{}')
    return store.get('USER-KEY') || {}
}


export function removeUser(){
    store.remove('user')
}
