import React, { SFC } from 'react';
import './baseStyle.less';
import { Tabs } from 'antd';
import { IBaseTabs } from '../../BaseTypes';
import { TabsProps } from 'antd/lib/tabs';
import _ from 'lodash';
/**
 * tab切换
 */

const { TabPane } = Tabs;
type BaseTabsTypes={
  tabsList:IBaseTabs[]
  style?: React.CSSProperties
  tabsProps?:TabsProps
}

const BaseTabs:SFC<BaseTabsTypes>=({tabsList,style,tabsProps})=>{
  return (
    <div  className="tabs-view" style={style}>
      <Tabs size="small" {...tabsProps} defaultActiveKey="0">
        {tabsList.map((val:IBaseTabs,index:number)=>(
          <TabPane tab={val.title} key={val.key?val.key:index.toString()} forceRender={val.forceRender}>
            {_.isFunction(val.item)?val.item():val.item}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default BaseTabs;