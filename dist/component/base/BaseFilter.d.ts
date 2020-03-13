import { Component } from 'react';
import { IFormItem } from '../../BaseTypes';
import './baseStyle.less';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
/**
 * 筛选组件
 */
interface IBaseFilterProps extends FormComponentProps {
    items: IFormItem[];
    getForm?: (form: WrappedFormUtils) => void;
    onSearch: (values: {
        [key: string]: any;
    }) => void;
    loading?: boolean;
}
interface IBaseFilterState {
    expand: boolean;
    threshold: number;
}
declare class BaseFilter extends Component<IBaseFilterProps, IBaseFilterState> {
    filterRow: any;
    constructor(props: IBaseFilterProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    InitThreshold: () => void;
    render(): JSX.Element;
    private handleSubmit;
    private handleReset;
    private buildFields;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof BaseFilter, Pick<IBaseFilterProps, "items" | "getForm" | "onSearch" | "loading" | "wrappedComponentRef">>;
export default _default;
