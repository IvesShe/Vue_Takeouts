/**
 * 包含n個接口請求函數的模塊
 * 函數的返回值：promise對象
 */

import ajax from './ajax'

const BASE_URL = '/api'

//  1、根據經緯度獲取位置詳情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
//  2、獲取食品分類列表
export const reqFoodTypes = () => ajax(BASE_URL+'/index_category')
//  3、根據經緯度獲取商舖列表
export const reqShops = (longitude,latitude) => ajax(BASE_URL+'/shops',{longitude,latitude})


