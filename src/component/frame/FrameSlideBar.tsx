import React, { SFC, ReactNode, useImperativeHandle, useState } from 'react';
import './frameStyle.less';

/**
 * 左侧导航栏滑动组件
 */
type FrameSlideBarTypes = {
    title?: string | ReactNode
    footer?: string | ReactNode
    cref: any
}
const FrameSlideBar: SFC<FrameSlideBarTypes> = ({ title, footer, cref, children }) => {
    const [collapse, setCollapse] = useState(false);
    useImperativeHandle(
        cref,
        () => ({
            changeVal: () => {
                setCollapse(!collapse);
            }
        }),
    )
    return (
        <div className={`slide-bar-view ${collapse ? 'slide-bar-ani' : ''}`}>
            <div className="slide-bar-header">
                {title}
            </div>
            <div className="slide-bar-main">
                {children}
            </div>
            {
                footer &&
                <div className="slide-bar-footer">
                    {footer}
                </div>
            }
        </div>
    );
}

export default FrameSlideBar;