import React, { Component } from 'react';
import { IBaseTablePageProps, IBaseTablePageState } from '../../BaseTypes';
import _ from 'lodash';
import BaseTable from './BaseTable';



type IQueryPage={
  page:number,
  size:number
}
class BaseTablePage<P extends IBaseTablePageProps=IBaseTablePageProps,S extends IBaseTablePageState=IBaseTablePageState> extends Component<P, S> {

  UNSAFE_componentWillMount=()=>{
    let state:IBaseTablePageState = {
      queryApi:null,
      dataSource:[],
      columns:[],
      rowKey: 'id',
      loading:false,
      pagination:{
        current: 1,
        pageSize: 10,
        showTotal: (total: number, range: [number, number]) => `共 ${total} 项, 当前 ${range[0]}-${range[1]}`,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '40', '60', '100', '150', '200'],
        onChange: this.onPageChange,
        onShowSizeChange: this.onPageShowSizeChange,
        size:'small'
      }
    }
    state = _.extend({}, state,  this.state)
    this.setState(state);
  }
  query=(page:IQueryPage)=>{
    const {queryApi}=this.state;
    if (!queryApi) return;
    this.setState({loading:true});
    queryApi(page).then(res=>{
      let pagination = this.state.pagination;
      if (pagination) {
        pagination.current = res.data.number;
        pagination.pageSize = res.data.size;
        pagination.total = res.data.totalElements * 1;
      }
      this.setState({
        dataSource: res.data.content,
        pagination
      });
    })
  }
  onPageChange = (page: number, pageSize?: number) => {
    let obj: any = {
      page: page
    }
    if (pageSize) {
      obj.size = pageSize
    }
    this.query(obj);
  }
  onPageShowSizeChange = (page: number, pageSize: number) => {
    this.onPageChange(1, pageSize)
  }
  render() {
    const {pagination,columns,dataSource,loading,rowKey}=this.state;
    return (
      <div>
        <BaseTable loading={loading} rowKey={rowKey} pagination={pagination}  columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

export default BaseTablePage;
