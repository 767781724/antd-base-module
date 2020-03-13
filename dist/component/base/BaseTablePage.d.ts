import { Component } from 'react';
import { IBaseTablePageProps, IBaseTablePageState } from '../../BaseTypes';
declare type IQueryPage = {
    page: number;
    size: number;
};
declare class BaseTablePage<P extends IBaseTablePageProps = IBaseTablePageProps, S extends IBaseTablePageState = IBaseTablePageState> extends Component<P, S> {
    UNSAFE_componentWillMount: () => void;
    query: (page: IQueryPage) => void;
    onPageChange: (page: number, pageSize?: number | undefined) => void;
    onPageShowSizeChange: (page: number, pageSize: number) => void;
    render(): JSX.Element;
}
export default BaseTablePage;
