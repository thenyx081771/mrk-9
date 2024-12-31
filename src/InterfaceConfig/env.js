
// const env = 'development' // 开发环境 
const env = 'test' // 测试环境
// const env = 'production' // 生产环境    

let baseURL = '' // 接口地址
let socketLink = ''


switch (env) {
  case 'development':         
    baseURL = 'http://192.168.1.126:9998'
    break
  case 'test': 
    baseURL = 'http://192.168.1.145:9998'
    socketLink = 'ws://192.168.1.145:4447/websocket'
    break
  case 'production': 
    baseURL = 'https://api.singmap.com'
    socketLink = 'ws://47.88.212.170:4447/websocket'
    break
}

export { baseURL , socketLink}

