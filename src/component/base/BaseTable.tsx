import React, { Component } from 'react';
import './baseStyle.less'
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { ITableProps } from '../../BaseTypes';
import { Resizable } from 'react-resizable';
import _ from 'lodash';

interface IBaseTableState<T> {
  columns: ColumnProps<T>[]
}


/**
 * 表格组件
 */


const ResizeableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class BaseTable<T = any> extends Component<ITableProps<T>, IBaseTableState<T>> {
  private finalProps: ITableProps<T> = {height:0}
  constructor(props: ITableProps<T>) {
    super(props);
    this.state = {
      columns: [],
    }
  }
  UNSAFE_componentWillMount() {
    this.processProps(this.props)
  }
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<ITableProps<T>>) {
    // if (!_.isEqual(nextProps, this.props)) {
    this.processProps(nextProps)
    // }
  }

  private components = {
    header: {
      cell: ResizeableTitle,
    },
  };
  private tableResize = (index: number) => (e: any, { size }: any) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  render() {
    const columns = this.state.columns!.map((col, index) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: this.tableResize(index),
      }),
    }));
    return (
      <div className='base-tables-view'  style={{height:this.props.height}}>
       <Table {...this.finalProps} components={this.components} columns={columns} />
      </div>
    );
  }
  private processProps(props: Readonly<ITableProps<T>>): void {
    this.finalProps = _.cloneDeep(props)
    if (this.finalProps.bordered == null) {
      this.finalProps.bordered = true
    }
    this.processRowSelection()
    this.processColumns()

  }

  private processRowSelection(): void {
    if (!this.props.rowSelection) {
      return
    }

  }

  private processColumns(): void {
    if (this.finalProps.columns) {
      const screenWidth=window.innerWidth-240;
      const num=this.finalProps.columns.length;
      const colWidth:number=screenWidth/num>100?Math.round(screenWidth/num):100;

      this.finalProps.columns.forEach((col, index, arr) => {
        if (col.align === undefined) {
          col.align = 'center'
        }
        if (col.ellipsis === undefined) {
          col.ellipsis = true
        }
        if (col.width === undefined&&index<arr.length-1) {
          col.width = colWidth;
        }
      })
      if(this.finalProps.scroll){
        if(!this.finalProps.scroll.y){
          this.finalProps.scroll.y=this.finalProps.height!-110;
        }
        
      }else{
        let scrollX=num*colWidth;
        if(this.finalProps.rowSelection){
          scrollX=num*colWidth+60;
        }
        this.finalProps.scroll={y:this.finalProps.height!-110,x:scrollX}
      }
      this.setState({ columns: this.finalProps.columns! })
    }
  }
}

export default BaseTable;
