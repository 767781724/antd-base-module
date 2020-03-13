import { Component } from 'react';
import './baseStyle.less';
import { ColumnProps } from 'antd/lib/table';
import { ITableProps } from '../../BaseTypes';
interface IBaseTableState<T> {
    columns: ColumnProps<T>[];
}
declare class BaseTable<T = any> extends Component<ITableProps<T>, IBaseTableState<T>> {
    private finalProps;
    constructor(props: ITableProps<T>);
    UNSAFE_componentWillMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<ITableProps<T>>): void;
    private components;
    private tableResize;
    render(): JSX.Element;
    private processProps;
    private processRowSelection;
    private processColumns;
}
export default BaseTable;
