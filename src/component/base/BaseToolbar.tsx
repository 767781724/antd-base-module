import React, { ReactNode } from 'react';
import './baseStyle.less';

/**
 * 工具栏
 */
interface IBaseToolbarProps {
    children?: ReactNode
  }
const BaseToolbar = (props: IBaseToolbarProps) => {
  return (
    <div className="toolbar-view">
      <div className="toolbar-main">
        {props.children}
      </div>
      {/* <div className="BaseToolbar-other">
        {props.other}
      </div> */}
    </div>
  )
}

export default BaseToolbar;
