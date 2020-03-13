import React, { Component, ChangeEvent } from 'react';
import { Input, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

/**
 * 验证码输入框 
 * @param form antd form表单字段
 * @param telKey 获取电话字段
 * @param apiQuery 短信请求接口
 */

interface ICodeInputProps {
  form: WrappedFormUtils
  telKey: string
  apiQuery:((data: any) => Promise<any>)|null
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

interface ICodeInputState {
  disabled: boolean,
  phone: string,
  second: number,
}

let timer: any = null;

class CodeInput extends Component<ICodeInputProps, ICodeInputState> {

  constructor(props: ICodeInputProps) {
    super(props);
    this.state = {
      disabled: false, second: 60, phone: ''
    }
  }
  codeClick = () => {
    const { disabled } = this.state;
    const { telKey } = this.props
    const tel = this.props.form.getFieldValue(telKey);
    if (!tel || tel.length !== 11) {
      this.props.form.setFields({
        [telKey]: {
          errors: [new Error('请输入正确的手机号')]
        }
      })
      return;
    }
    if (!disabled) {
      this.setState({ disabled: true });
      if(this.props.apiQuery){
        this.props.apiQuery(tel);
      }
      timer = setInterval(() => {
        if (this.state.second > 0) {
          this.setState({
            second: this.state.second - 1
          })
        } else {
          this.setState({
            second: 60,
            disabled: false
          });
          clearInterval(timer);
          timer = null;
        }
      }, 1000)
    }

  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  render() {
    return (
      <Input size="small" value={this.props.value} onChange={this.props.onChange} placeholder="请输入验证码" maxLength={6} suffix={
        <Button style={{ padding: 0 }} onClick={this.codeClick} type={'link'}>
          {this.state.disabled ? `${this.state.second}s后重试` : '获取验证码'}
        </Button>} />
    );
  }
}

export default CodeInput;
