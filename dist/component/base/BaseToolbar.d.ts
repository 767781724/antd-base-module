import { ReactNode } from 'react';
import './baseStyle.less';
/**
 * 工具栏
 */
interface IBaseToolbarProps {
    children?: ReactNode;
}
declare const BaseToolbar: (props: IBaseToolbarProps) => JSX.Element;
export default BaseToolbar;
