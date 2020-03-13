import { Component, ChangeEvent } from 'react';
import { InputProps } from 'antd/lib/input';
/**
*数字输入组件，限制
*@param 继承Input接口
*@param isInt 是否是整数 整数true  带小数false
*/
interface INumberInputProps extends InputProps {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    isInt?: boolean;
}
interface INumberInputState {
}
declare class NumberInput extends Component<INumberInputProps, INumberInputState> {
    onChange: (e: any) => void;
    render(): JSX.Element;
}
export default NumberInput;
