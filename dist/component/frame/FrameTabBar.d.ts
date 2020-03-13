import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { IFrameTabModel, IMenuItem } from '../../BaseTypes';
import './frameStyle.less';
/**
 * tabs路由导航
 */
interface IFrameTabBarProps extends RouteComponentProps {
    menus: IMenuItem[];
}
interface IFrameTabBarState {
    tabs: IFrameTabModel[];
    active: string;
    arrow: boolean;
    scrollLeft: number;
}
declare class FrameTabBar extends Component<IFrameTabBarProps, IFrameTabBarState> {
    tabsRef: any;
    tabsWrapRef: any;
    autoScroll: boolean;
    constructor(props: IFrameTabBarProps);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IFrameTabBarProps): void;
    componentDidUpdate(prevProps: IFrameTabBarProps, prevState: IFrameTabBarState): void;
    componentWillUnmount(): void;
    pushData: (item: IFrameTabModel) => void;
    onResize: () => void;
    findKeys: (menus: IMenuItem[], path: string) => boolean | IMenuItem;
    scrollToStart: () => void;
    scrollToEnd: () => void;
    onDelete: (e: any, index: number) => void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<IFrameTabBarProps, "menus">, any> & import("react-router").WithRouterStatics<typeof FrameTabBar>;
export default _default;
