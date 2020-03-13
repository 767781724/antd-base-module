import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { IMenuItem } from '../../BaseTypes';
import { ClickParam } from 'antd/lib/menu';
interface IMenusProps extends RouteComponentProps {
    menus: IMenuItem[];
}
interface IMenusState {
    openKeys: string[];
    selectKey: string[];
}
declare class FrameMenus extends Component<IMenusProps, IMenusState> {
    rootSubmenuKeys: any[];
    constructor(props: IMenusProps);
    onOpenChange: (openKeys: string[]) => void;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IMenusProps): void;
    initMenuKey: (path: string) => void;
    findKeys: (menus: IMenuItem[], path: string, arr: string[]) => true | never[] | undefined;
    render(): JSX.Element;
    protected menuClick: (e: ClickParam) => void;
    private findMenuByKey;
    private buildMenu;
    private buildMenuTitle;
}
declare const _default: React.ComponentClass<Pick<IMenusProps, "menus">, any> & import("react-router").WithRouterStatics<typeof FrameMenus>;
export default _default;
