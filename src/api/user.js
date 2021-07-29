import request from '@/utils/request.js'

/* 用户登录 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data: data
  })
}

/* 用户登录信息 */
export const loginData = (data) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // data 用来设置 POST 请求体
    // headers: {
    //   // 'Content-Type': 'application/json',
    //   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc3MjQzMzEsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.HYcpMcOFhLS24QaZRwbb1o3o6wFXRLVzJScL7IiSess'
    // }
  })
}

// 修改用户头像
// 注意：data 必须传递 FormData 对象
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 修改用户基本信息
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
