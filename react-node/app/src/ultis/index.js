import {createHashHistory} from "history"

export const history = createHashHistory(); 


export function getRiQi(shijian){
    let dateLocal = new Date(shijian)
    let year = dateLocal.getFullYear()
    let month = dateLocal.getMonth()+1
    if(month<10){
        month='0'+month
    }
    let ri = dateLocal.getDate()
    if(ri<10){
        ri='0'+ri
    }
    let hour = dateLocal.getHours()
    if(hour<10){
        hour='0'+hour
    }
    let minutes = dateLocal.getMinutes()
    if(minutes<10){
        minutes='0'+minutes
    }
    let week = dateLocal.getDay()
    let arr = ['周日','周一','周二','周三','周四','周五','周六']

    return {
        year,
        month,
        ri,
        hour,
        minutes,
        week:arr[week]
    }
}