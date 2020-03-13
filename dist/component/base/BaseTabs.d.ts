import React, { SFC } from 'react';
import './baseStyle.less';
import { IBaseTabs } from '../../BaseTypes';
import { TabsProps } from 'antd/lib/tabs';
declare type BaseTabsTypes = {
    tabsList: IBaseTabs[];
    style?: React.CSSProperties;
    tabsProps?: TabsProps;
};
declare const BaseTabs: SFC<BaseTabsTypes>;
export default BaseTabs;
