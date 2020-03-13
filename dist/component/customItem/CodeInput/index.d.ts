import { Component, ChangeEvent } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
/**
 * 验证码输入框
 * @param form antd form表单字段
 * @param telKey 获取电话字段
 * @param apiQuery 短信请求接口
 */
interface ICodeInputProps {
    form: WrappedFormUtils;
    telKey: string;
    apiQuery: ((data: any) => Promise<any>) | null;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface ICodeInputState {
    disabled: boolean;
    phone: string;
    second: number;
}
declare class CodeInput extends Component<ICodeInputProps, ICodeInputState> {
    constructor(props: ICodeInputProps);
    codeClick: () => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default CodeInput;
