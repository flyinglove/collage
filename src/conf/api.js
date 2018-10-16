let env = process.env.NODE_ENV
let API_DOMAIN
if (env === 'development') {
  API_DOMAIN = 'http://yapi.demo.qunar.com/mock/15250/'
}

export const PRODUCT_INFO = `${API_DOMAIN}group/products`
export const GROUP_GOING = `${API_DOMAIN}group/ongoingGroup`
