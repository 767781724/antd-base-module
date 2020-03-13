import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ReactNode } from 'react';
import { IBaseListPageProps, IBaseListPageState } from '../../BaseTypes';
import BasePage from './BasePage';
import './baseStyle.less';
/**
 * 基础列表页面
 */
interface IListQueryParams {
    page: number;
    size: number;
    conditions: {
        [key: string]: any;
    };
    v: number;
}
declare class BaseListPage<P extends IBaseListPageProps = IBaseListPageProps, S extends IBaseListPageState = IBaseListPageState, QP extends IListQueryParams = IListQueryParams> extends BasePage<P, S, QP> {
    protected baseTableHeight: number;
    protected baseTabsHeight: number;
    protected defaultQueryParams: QP;
    protected filterForm: WrappedFormUtils;
    protected tableRef: any;
    UNSAFE_componentWillMount(otherState?: Partial<S>): void;
    componentDidRecover: () => void;
    componentDidMount(): void;
    protected initTableHeight: () => void;
    protected onPageChange: (page: number, pageSize?: number | undefined) => void;
    protected onPageShowSizeChange: (page: number, pageSize: number) => void;
    protected getQueryParams: () => any;
    protected query: () => void;
    protected handleSearch: (values: any) => void;
    render(other?: {
        footer?: ReactNode;
    }): JSX.Element;
    protected baseShrink: () => JSX.Element;
    private buildToolbarBtns;
}
export default BaseListPage;
