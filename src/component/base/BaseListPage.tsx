import { WrappedFormUtils } from 'antd/lib/form/Form';
import _ from 'lodash';
import React, { ReactNode } from 'react';
import { IBaseListPageProps, IBaseListPageState, IFormItem, IBaseTabs } from '../../BaseTypes';
import BasePage from './BasePage';
import BaseTable from './BaseTable';
import Filter from './BaseFilter';
import BaseTabs from './BaseTabs';
import BaseToolbar from './BaseToolbar';
import './baseStyle.less';
import ReactDOM from 'react-dom';
import moment from 'moment';

/**
 * 基础列表页面
 */

interface IListQueryParams {
  page: number
  size: number
  conditions: {
    [key: string]: any
  },
  v: number
}
class BaseListPage<P extends IBaseListPageProps = IBaseListPageProps,
  S extends IBaseListPageState = IBaseListPageState,
  QP extends IListQueryParams = IListQueryParams> extends BasePage<P, S, QP> {
  protected baseTableHeight = window.innerHeight - 270 - window.innerHeight * 0.3;
  protected baseTabsHeight = window.innerHeight * 0.3;
  protected defaultQueryParams: QP = {
    page: 1,
    size: 30,
    conditions: {},
    v: 0
  } as any
  protected filterForm: WrappedFormUtils = {} as WrappedFormUtils
  protected tableRef: any = React.createRef();
  UNSAFE_componentWillMount(otherState?: Partial<S>) {
    super.UNSAFE_componentWillMount()
    let state: IBaseListPageState = {
      queryApi: null,
      rowKey: 'id',
      columns: [],
      pagination: {
        current: this.queryParams.page,
        pageSize: this.queryParams.size,
        showTotal: (total: number, range: [number, number]) => `共 ${total} 项, 当前 ${range[0]}-${range[1]}`,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['10', '30', '50', '70', '100'],
        onChange: this.onPageChange,
        onShowSizeChange: this.onPageShowSizeChange,
        size:'small'
      },
      dataSource: [],
      tableProps: {},
      modal: null
    }
    state = _.extend({}, state, otherState, this.state)
    if (state.toolBtns && state.toolBtns.length > 0 && state.tableProps) {
      state.tableProps.rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          let tableProps = this.state.tableProps;
          if (tableProps && tableProps.rowSelection) {
            tableProps.rowSelection.selectedRowKeys = selectedRowKeys
          }
          this.setState({ selectedRowKeys, selectedRows, tableProps })
        }
      }
    }
    this.setState(state);
    if (this.props.cacheLifecycles) {
      this.props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
  }
  componentDidRecover = () => {
    this.query()
  }
  componentDidMount() {
    this.query()
    if (this.filterForm && _.isFunction(this.filterForm.setFieldsValue)) {
      this.filterForm.setFieldsValue(this.queryParams.conditions)
    }
    this.initTableHeight();
    // window.addEventListener('resize', this.handleResize);
  }
  // protected handleResize=()=>{

  // }
  protected initTableHeight = () => {
    const _table: any = ReactDOM.findDOMNode(this.tableRef.current);
    let h = _table.getBoundingClientRect().top;
    if (this.state.tabsList) {
      this.baseTableHeight = window.innerHeight - h - window.innerHeight * 0.3 - 33;
    } else {
      this.baseTableHeight = window.innerHeight - h;
    }
    this.baseTabsHeight = window.innerHeight * 0.3;
    this.setState({ tableHeight: this.baseTableHeight, tabsHeight: this.baseTabsHeight })
  }
  protected onPageChange = (page: number, pageSize?: number) => {
    let obj: any = {
      page: page
    }
    if (pageSize) {
      obj.size = pageSize
    }
    this.pushQueryParams(obj)
  }

  protected onPageShowSizeChange = (page: number, pageSize: number) => {
    this.onPageChange(1, pageSize)
  }
  protected getQueryParams = () => {
    let params = JSON.parse(JSON.stringify(this.queryParams.conditions));
    const timeReg = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d.\d\d\dZ/;
    for (var key in params) {
      if (timeReg.test(params[key])) {
        params[key] = moment(params[key]).subtract(8, 'h').format('YYYY-MM-DD HH:mm:ss');
      }
    }
    if (this.state.pagination) {
      return {
        ...params,
        'page.size': this.queryParams.size,
        'page.page': this.queryParams.page
      }
    } else {
      return params
    }
  }
  protected query = () => {
    if (!this.state.queryApi) return;
    this.setState({ querying: true });
    let tableProps = this.state.tableProps;
    if (tableProps && tableProps.rowSelection && this.state.selectedRowKeys && this.state.selectedRowKeys.length > 0) {
      tableProps.rowSelection.selectedRowKeys = []
      this.setState({ tableProps, selectedRows: [], selectedRowKeys: [] })
    }
    this.state.queryApi(this.getQueryParams()).then(res => {
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
    }).finally(() => {
      this.setState({ querying: false });
    })
  }
  protected handleSearch = (values: any) => {
    let p: Partial<IListQueryParams> = {
      conditions: values,
      v: new Date().getTime()
    }
    if (this.state.pagination) {
      p.page = 1
    }
    this.pushQueryParams(p)
  }
  render(other?: { footer?: ReactNode }) {
    let { conditions, actionBtns, toolBtns, querying, rowKey, tabsProps,
      pagination, tableProps, columns, dataSource, tabsList, tableHeight, tabsHeight, modal } = this.state;
    return (
      <div className="base-list-page">
        {
          (_.isArray(conditions) && conditions.length > 0) && (
            <Filter loading={this.state.querying} items={conditions as IFormItem[]}
              getForm={(form) => { this.filterForm = form; }} onSearch={this.handleSearch} />
          )
        }
        {
          toolBtns && (
            <BaseToolbar>
              {this.buildToolbarBtns(toolBtns)}
            </BaseToolbar>
          )
        }
        {
          actionBtns && (
            <BaseToolbar>
              {this.buildToolbarBtns(actionBtns)}
            </BaseToolbar>
          )
        }
        <BaseTable ref={this.tableRef} style={{ marginTop: 15 }}
          height={tableHeight} bordered loading={querying} rowKey={rowKey}
          pagination={pagination} {...tableProps}
          columns={columns} dataSource={dataSource} />
        {other && other.footer}
        {tabsList && this.baseShrink()}
        {tabsList &&
          <BaseTabs style={{ height: tabsHeight }} {...tabsProps} tabsList={tabsList as IBaseTabs[]} />}
        {modal && modal()}
      </div>
    );
  }
  protected baseShrink = () => {
    const { tableHeight, tabsHeight } = this.state;
    return (<div className="base-shrink" onMouseDown={(e: any) => {
      e.preventDefault();
      let { clientY } = e;
      document.body.onmousemove = (e: any) => {
        let newHeight = (tableHeight as number) + (e.clientY - clientY);
        this.setState({ tableHeight: newHeight, tabsHeight: window.innerHeight - newHeight - 230 })
      }
      document.body.onmouseup = function () {
        document.body.onmousemove = null
      }
    }}>
      <div style={{ display: tableHeight === 0 ? 'none' : 'block' }} className="caret-up" onClick={() => {
        if (tabsHeight === 0) {
          this.setState({ tableHeight: this.baseTableHeight, tabsHeight: this.baseTabsHeight })
        } else {
          this.setState({ tableHeight: 0, tabsHeight: window.innerHeight - 230 })
        }
      }} />
      <div style={{ display: tabsHeight === 0 ? 'none' : 'block' }} className="caret-down"
        onClick={() => {
          if (tableHeight === 0) {
            this.setState({ tableHeight: this.baseTableHeight, tabsHeight: this.baseTabsHeight })
          } else {
            this.setState({ tableHeight: window.innerHeight - 230, tabsHeight: 0 })
          }
        }} />
    </div>)
  }
  private buildToolbarBtns = (btns?: (ReactNode | (() => ReactNode))[]) => {
    if (Array.isArray(btns) && btns.length > 0) {
      let nodes = []
      for (const btn of btns) {
        let Btn: any = null
        if (_.isFunction(btn)) {
          Btn = btn()
        } else {
          Btn = btn
        }
        nodes.push(React.cloneElement(Btn, { key: _.uniqueId('btn_') }));
      }
      return nodes;
    }
    return null;
  }
}

export default BaseListPage;
