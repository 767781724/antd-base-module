import React, { Component, ChangeEvent } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

/** 
*数字输入组件，限制
*@param 继承Input接口
*@param isInt 是否是整数 整数true  带小数false
*/

interface INumberInputProps extends InputProps{
  value?:string
  onChange?:(event: ChangeEvent<HTMLInputElement>) => void
  isInt?:boolean
}

interface INumberInputState {

}

class NumberInput extends Component<INumberInputProps, INumberInputState> {
  onChange = (e:any) => {
    let { value } = e.target;
    const {isInt}=this.props;
    const reg = isInt?/^-?(0|[1-9][0-9]*)?$/:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange!(value);
    }
  };
  render() {
    let props={...this.props};
    if(props.isInt){delete props.isInt};
    return (
      <div>
        <Input
          {...props}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default NumberInput;
