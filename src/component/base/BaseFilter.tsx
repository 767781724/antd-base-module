import React, { Component } from 'react';
import { IFormItem } from '../../BaseTypes';
import './baseStyle.less';
import { Button, Icon, Tooltip, Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';

/**
 * 筛选组件
 */

interface IBaseFilterProps extends FormComponentProps {
  items: IFormItem[]
  getForm?: (form: WrappedFormUtils) => void
  onSearch: (values: { [key: string]: any }) => void
  loading?: boolean
}

interface IBaseFilterState {
  expand: boolean
  threshold:number
}

const timeReg = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d.\d\d\dZ/;
class BaseFilter extends Component<IBaseFilterProps, IBaseFilterState> {
  filterRow:any;
  constructor(props: IBaseFilterProps) {
    super(props);
    this.filterRow=React.createRef();
    this.state = {
      expand: false,
      threshold:6
    }
  }
  componentDidMount() {
    if (_.isFunction(this.props.getForm)) {
      const {items}=this.props;
      let newItemsKey:string[]=[];
      for(const item of items){
        if (item.id.search('-') !== -1) {
          newItemsKey=[...newItemsKey,...item.id.split('-')]
        }else{
          newItemsKey.push(item.id)
        }
      }
      let setFun = this.props.form.setFieldsValue
      this.props.form.setFieldsValue = (obj: any, callback?: Function) => {
        for (const key of newItemsKey) {
          if (obj[key]&&timeReg.test(obj[key])) {
            const _time= moment(obj[key], 'YYYY-MM-DD HH:mm:ss');
            for(let i=0;i<items.length;i++){
              if(items[i].id.search(key)!==-1){
                delete obj[key];
                if(obj[items[i].id]&&_.isArray(obj[items[i].id])){
                  obj[items[i].id].push(_time);
                }else{
                  obj[items[i].id]=[_time]
                }
              }
            }
          }
        }
        setFun(obj, callback)
      }
      this.props.getForm(this.props.form);
    }
    this.InitThreshold();
    window.addEventListener('resize', this.InitThreshold);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.InitThreshold);
  }
  InitThreshold=()=>{
    const rowWidth=this.filterRow.current.offsetWidth;
    const num=Math.floor(rowWidth/263);
    this.setState({threshold:num*2})
  }
  render() {
    const { expand,threshold } = this.state;
    const showExpand = this.props.items.length > threshold;
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="filter-view">
          <div className="filter-left">
            <div className="filter-row" ref={this.filterRow}>
              {this.buildFields()}
            </div>

          </div>
          <div className="filter-right">
            <div className="filter-right-content">
              <Button type="primary" htmlType="submit" loading={this.props.loading} size="small" style={{ marginRight: 20 }}>查询
              </Button>
              <Button size="small" htmlType="reset" disabled={this.props.loading}
                onClick={this.handleReset} style={{ marginRight: 20 }}>重置
              </Button>
              {showExpand && <Button onClick={() => this.setState({ expand: !expand })} type="link" size="small" >
                <span className="btn-content">
                  {expand ? '收起' : '展开'}
                  <Icon type={expand ? 'up' : 'down'} />
                </span>
              </Button>}
            </div>
          </div>
        </div>
      </Form>
    );
  }
  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let result: any = {};
        for (const key in values) {
          if (values[key] !== undefined && values[key] !== '') {
            if (_.isArray(values[key])) {
              if (key.search('-') !== -1) {
                const keyArr = key.split('-');
                let index = 0;
                for (const val of keyArr) {
                  result[val] = values[key][index];
                  index++;
                }
              }else{
                result[key] = values[key];
              }
            } else {
              result[key] = values[key];
            }
          }
        }
        for(const key in result){
          if(moment.isMoment(result[key])){
            //iso时间转换会减去8小时 所以添加8小时 保证会写
            result[key]=moment(result[key]).add(8,'h').toISOString()
          }
        }
        this.props.onSearch(result);
      }
    });
  }
  private handleReset = () => {
    this.props.form.resetFields();
    this.props.onSearch({});
  }

  private buildFields = () => {
    const count = this.state.expand ? this.props.items.length : this.state.threshold
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];
      let options = item._options || {}
      if (item.initialValue !== undefined) {
        options.initialValue = item.initialValue
      }
      children.push(
        <div key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <div className="filter-col" >
            <span className="label"><Tooltip placement="top" title={item.label}>{item.label}</Tooltip></span>
            <Form.Item className="jr-form-item" key={item.id}>
              {
                getFieldDecorator(item.id, options)(item._node)
              }
            </Form.Item>
          </div>

        </div>
      )
    }
    return children;
  }
}

export default Form.create<IBaseFilterProps>({})(BaseFilter);
