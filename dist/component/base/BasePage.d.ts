import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
/**
 * 基础页面类
 * 包含 url查询参数的 处理逻辑
 */
declare class BasePage<P extends RouteComponentProps = RouteComponentProps, S = {}, QP = any> extends Component<P, S> {
    /**
     * 默认query-string参数，(url查询参数)
     * 必须给每个参数设定合理的默认值
     * 如果没设置默认值，将不会获取此参数
     */
    protected defaultQueryParams: QP;
    /**
     * url查询参数
     */
    protected queryParams: QP;
    UNSAFE_componentWillMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: P): void;
    /**
     * push Url查询参数
     */
    protected pushQueryParams(params?: any, merge?: boolean): void;
    /** url查询参数发生改变后 */
    protected queryParamsChanged: () => void;
    /**
     * 处理url查询参数字符串
     */
    private processSearchString;
}
export default BasePage;
