import ajax from './ajax'

import jsonp from 'jsonp'

import {message} from 'antd'

const BASE=''

export function reqLogin(username, password){
    return ajax(BASE+'/login',{username, password},'POST') 
}


reqLogin('admin' , 'admin').then((result)=>{
    console.log(result)
})

// 获取分类列表(一级/二级)
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 发送天气的请求

export function reqWeather(location){
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
    
        // 执行请求
        setTimeout(() => {
          jsonp(url, {}, (error, data) => {
            if (!error && data.status === 'success') {
              const {
                dayPictureUrl,
                weather
              } = data.results[0].weather_data[0]

              resolve({
                dayPictureUrl,
                weather
              })
            } else {
              message.error('获取天气信息失败!')
            }
          })
        }, 2000)
      })
      
    }
    
   // 更新分类的名称
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST') 

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')