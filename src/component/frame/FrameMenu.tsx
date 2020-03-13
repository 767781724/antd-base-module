import React, { Component, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Menu, Icon } from 'antd';
import { IMenuItem} from '../../BaseTypes';
import _ from 'lodash';
import { ClickParam } from 'antd/lib/menu';

/**
 * 左侧菜单栏组件
 */

const {SubMenu}=Menu;

interface IMenusProps extends RouteComponentProps {
  menus:IMenuItem[]
}

interface IMenusState {
  openKeys:string[]
  selectKey:string[]
}


class FrameMenus extends Component<IMenusProps, IMenusState> {
  rootSubmenuKeys:any[];
  constructor(props: IMenusProps) {
    super(props);
    this.state = {
      openKeys:[],
      selectKey:[]
    }
    this.rootSubmenuKeys=this.props.menus.map(item=>item.key);
  }
  onOpenChange = (openKeys:string[])=> {
      this.setState({ openKeys });
    // const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //   this.setState({ openKeys });
    // } else {
    //   this.setState({
    //     openKeys: latestOpenKey ? [latestOpenKey] : [],
    //   });
    // }
  };
  componentDidMount(){
    this.initMenuKey(this.props.location.pathname);
  }
  UNSAFE_componentWillReceiveProps(nextProps: IMenusProps){
    if (this.props.location !== nextProps.location) {
      this.initMenuKey(nextProps.location.pathname);
    }
  }
  initMenuKey=(path:string)=>{
    let arr:string[]=[];
    this.findKeys(this.props.menus,path,arr);
    if(arr.length>0){
      const key=arr.pop();
      this.setState({openKeys:arr,selectKey:[(key as string)]});
    }
    
  }
  findKeys=(menus:IMenuItem[],path:string,arr:string[])=>{
    if(menus.length===0||!path){
        return arr=[];
    }
    for(let i=0;i<menus.length;i++){
      arr.push(menus[i].key);
      if(menus[i].path===path){
        return true;
      }
      if(menus[i].children){
        if(this.findKeys((menus[i].children as IMenuItem[]),path,arr)){
          return true;
        }else{
          arr.pop()
        }
      }else{
        arr.pop();
      }
    }
  }
  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={this.state.selectKey}
        onOpenChange={this.onOpenChange}
        style={{ width: 200 }}
        onClick={this.menuClick}
      >
        {this.buildMenu(this.props.menus)}
      </Menu>
    );
  }
  protected menuClick=(e:ClickParam)=>{
    const menu=this.findMenuByKey(e.key);
    this.setState({selectKey:[e.key]});
    if(menu){
      this.props.history.push(menu.path!)
    }
  }
  private findMenuByKey = (key: string): IMenuItem | null => {
    let result: IMenuItem | null = null
    const recursion = (items: IMenuItem[]) => {
      for (const item of items) {
        if (item.key === key) {
          result = item
        }
        if (result === null && item.children) {
          recursion(item.children)
        }
      }
    }
    recursion(this.props.menus)
    return result
  }
  private buildMenu = (items: IMenuItem[]) => {
    if (!_.isArray(items) || items.length === 0) {
      return null
    }
    let nodes = []
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        nodes.push(
          <SubMenu key={item.key} title={this.buildMenuTitle(item)}>
            {
              this.buildMenu(item.children)
            }
          </SubMenu>
        )
      } else {
        nodes.push(<Menu.Item key={item.key}>{this.buildMenuTitle(item)}</Menu.Item>)
      }
    }
    return nodes
  }

  private buildMenuTitle = (menu: IMenuItem): ReactNode => {
    let icon = menu.icon
    if (menu.icon) {
      if (_.isString(menu.icon)) {
        icon = <Icon type={menu.icon} />
      }
    } else {
      icon = <i className="def-icon"></i>
    }
    return <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>{icon}<span>{menu.text}</span></div>
  }
}

export default withRouter(FrameMenus);
