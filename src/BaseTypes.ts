import { ColumnProps, TableProps } from "antd/lib/table";
import { RouteComponentProps } from "react-router";
import { PaginationConfig } from "antd/lib/pagination";
import { ReactNode } from "react";
import { TabsProps } from "antd/lib/tabs";
import { GetFieldDecoratorOptions } from "antd/lib/form/Form";

export interface IBaseListPageProps extends RouteComponentProps {
    cacheLifecycles?: any
}
export interface IColumn<T = any> extends ColumnProps<T> {
}
export interface ITableProps<T> extends TableProps<T> {
    height?: number
}
export interface IBaseListPageState<T = any> {
    queryApi: ((data: any) => Promise<any>) | null
    querying?: boolean
    conditions?: IFormItem[]
    actionBtns?: (ReactNode | (() => ReactNode))[]
    toolBtns?: (ReactNode | (() => ReactNode))[]
    rowKey: string | ((record: T, index: number) => string)
    columns: IColumn<T>[]
    dataSource?: T[]
    tableProps?: ITableProps<T>
    pagination?:  PaginationConfig | false,
    tabsList?: IBaseTabs[]
    tabsProps?:TabsProps
    selectedRowKeys?: string[] | number[] | React.Key[]//table 表格勾选  id集合
    selectedRows?: T[]//table 表格勾选  数据
    tableHeight?: number
    tabsHeight?: number
    modal?: (() => ReactNode) | null //modal节点
}
export interface IBaseTablePageProps {

}
export interface IBaseTablePageState<T = any> {
  queryApi:((data: any) => Promise<any>) | null,
  pagination?:PaginationConfig,
  columns:IColumn[],
  rowKey: string | ((record: T, index: number) => string),
  dataSource?:any[],
  loading?:boolean
}
export interface IFormItem {
    id: string
    label: React.ReactNode
    initialValue?: any
    span?: number
    _options?: GetFieldDecoratorOptions
    _node?: React.ReactNode
    value?: any
    onChange?(value: any): void
}
export interface IBaseTabs {
    title: string
    item: ReactNode | (() => ReactNode)
    key?:string
    forceRender?:boolean//被隐藏式是否渲染dom结构
}
export interface IPageRes<T = any> {
    content: T[]
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
}
export interface IFrameTabModel {
    name: string,
    path: string,
    key: string,
    search?: string
}
export interface IMenuItem {
    /** Key，可使用customId */
    key: string
    text: string
    icon?: string | ReactNode
    path?: string
    children?: IMenuItem[]
}