/**
 * 通過mutation間接更新state的多個方法的對象
 */
 import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops
} from '../api'

export default {
  // 異步獲取地址
  async getAddress ({commit,state}) {
    // 發送異步ajax請求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一個mutation
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },

  // 異步獲取食品分類列表
  async getCategorys ({commit}) {
    // 發送異步ajax請求
    const result = await reqFoodCategorys()
    // 提交一個mutation
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },

  // 異步獲取商家列表
  async getShops ({commit,state}) {
    // 發送異步ajax請求
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    // 提交一個mutation
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },

}