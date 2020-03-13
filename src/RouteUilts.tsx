import _ from 'lodash'

const convertInner = (defaultValue: any, paramValue: any) => {
  // TODO:暂不支持数组
  if (paramValue != null) {
    if (_.isString(defaultValue)) {
      return paramValue
    }
    if (_.isBoolean(defaultValue)) {
      if (paramValue === '1' || paramValue === 'true') {
        return true
      }
      if (paramValue === '0' || paramValue === 'false') {
        return false
      }
      return defaultValue
    }
    if (_.isInteger(defaultValue)) {
      try {
        let val = parseInt(paramValue)
        return isNaN(val) ? defaultValue : val
      }
      catch (err) {
        return defaultValue
      }
    }
    if (_.isNumber(defaultValue)) {
      try {
        return parseFloat(paramValue)
      }
      catch (err) {
        return defaultValue
      }
    }
    if (_.isFunction(defaultValue)) {
      return defaultValue(paramValue)
    }
    if (_.isObject(defaultValue)) {
      let params: any = {}
      try {
        params = JSON.parse(paramValue)
      }
      catch (err) { }
      _.forEach(defaultValue, (value, key) => {
        if (params[key]) {
          params[key] = convertInner(value, params[key])
        } else {
          params[key] = value
        }
      })
      return params
    }
  } else {
    if (_.isFunction(defaultValue)) {
      return defaultValue()
    } else {
      return defaultValue
    }
  }
  return paramValue
}

/**
 * 路由工具
 */
export const routeUtils = {

  /**
   * url查询字符串转对象
   * @param locationSearch url查询字符串
   * @param defaultValue 默认值，支持对象
   */
  searchStringToObject: (locationSearch: string, defaultValue: any): any => {
    let result: any = {}
    let params = new URLSearchParams(locationSearch)
    _.forEach(defaultValue, (value, key) => {
      result[key] = convertInner(value, params.get(key))
    })
    return result
  },

  /**
   * 对象转url查询字符串
   * @param queryParams 对象
   */
  objectToSearchString: (queryParams: any): string => {
    let params = new URLSearchParams()
    for (const key in queryParams) {
      if (_.isObject(queryParams[key]) || _.isArray(queryParams[key])) {
        params.set(key, JSON.stringify(queryParams[key]))
        continue
      }
      params.set(key, queryParams[key])
    }
    let str = params.toString()
    return str ? `?${str}` : ''
  }

}
