import _ from 'lodash';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import {routeUtils} from '../base_router/RouteUilts';

/**
 * 基础页面类
 * 包含 url查询参数的 处理逻辑
 */
class BasePage<P extends RouteComponentProps = RouteComponentProps, S = {}, QP = any> extends Component<P, S> {

  /**
   * 默认query-string参数，(url查询参数)
   * 必须给每个参数设定合理的默认值
   * 如果没设置默认值，将不会获取此参数
   */
  protected defaultQueryParams: QP = {} as QP
  /**
   * url查询参数
   */
  protected queryParams: QP = {} as QP


  public UNSAFE_componentWillMount() {
    this.processSearchString(this.props.location.search)
  }

  public UNSAFE_componentWillReceiveProps(nextProps: P) {
    if (this.props.location.search !== nextProps.location.search) {
      this.processSearchString(nextProps.location.search)
      this.queryParamsChanged()
    }
  }

  /**
   * push Url查询参数
   */
  protected pushQueryParams(params?: any, merge: boolean = true): void {
    let query = this.queryParams
    if (params) {
      if (merge) {
        query = _.extend({}, this.queryParams, params)
      } else {
        query = params as QP
      }
    }
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: routeUtils.objectToSearchString(query)
    })
  }

  /** url查询参数发生改变后 */
  protected queryParamsChanged = () => { }


  /**
   * 处理url查询参数字符串
   */
  private processSearchString(searchString: string): void {
    this.queryParams = routeUtils.searchStringToObject(searchString, this.defaultQueryParams)
  }


}

export default BasePage;
