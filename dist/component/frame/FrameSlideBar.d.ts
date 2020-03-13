import { SFC, ReactNode } from 'react';
import './frameStyle.less';
/**
 * 左侧导航栏滑动组件
 */
declare type FrameSlideBarTypes = {
    title?: string | ReactNode;
    footer?: string | ReactNode;
    cref: any;
};
declare const FrameSlideBar: SFC<FrameSlideBarTypes>;
export default FrameSlideBar;
