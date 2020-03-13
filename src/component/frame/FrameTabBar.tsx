import { Icon } from 'antd';
import React, { Component } from 'react';
import { dropByCacheKey } from 'react-router-cache-route';
import { RouteComponentProps,withRouter } from 'react-router';
import { IFrameTabModel, IMenuItem } from '../../BaseTypes';
import './frameStyle.less';

/**
 * tabs路由导航
 */

interface IFrameTabBarProps extends RouteComponentProps {
  menus: IMenuItem[]
}
interface IFrameTabBarState {
  tabs: IFrameTabModel[]
  active: string
  arrow: boolean
  scrollLeft: number
}
class FrameTabBar extends Component<IFrameTabBarProps, IFrameTabBarState> {
  tabsRef: any
  tabsWrapRef: any
  autoScroll: boolean = false
  constructor(props: IFrameTabBarProps) {
    super(props);
    this.tabsRef = React.createRef();
    this.tabsWrapRef = React.createRef();
    let _tabs: any = sessionStorage.getItem('TABS_DATA');
    if (_tabs) _tabs = JSON.parse(_tabs);
    this.state = {
      tabs: _tabs || [],
      active: '',
      arrow: false,
      scrollLeft: 0,
    }
  }
  componentDidMount() {
    const item = this.findKeys(this.props.menus, this.props.location.pathname);
    if (item) {
      this.pushData({ path: (item as IMenuItem).path!, name: (item as IMenuItem).text!, key: (item as IMenuItem).key })
    } else {
      const { tabs } = this.state;
      const index = tabs.findIndex(item => item.path === this.props.location.pathname)
      if (index > -1) {
        this.setState({ active: tabs[index].key })
      }
    }
    window.addEventListener('resize', this.onResize)
  }
  UNSAFE_componentWillReceiveProps(nextProps: IFrameTabBarProps) {
    if (this.props.location !== nextProps.location) {
      const item = this.findKeys(this.props.menus, nextProps.location.pathname);
      if (item) {
        this.pushData({
          path: (item as IMenuItem).path!,
          name: (item as IMenuItem).text!,
          key: (item as IMenuItem).key
        })
      } else {
        const { tabs, active } = this.state;
        const index = tabs.findIndex(item => item.key === active)
        if (index > -1) {
          tabs[index].path = nextProps.location.pathname;
          sessionStorage.setItem('TABS_DATA', JSON.stringify(tabs))
          this.setState({ tabs });
        }
      }
    }
  }
  componentDidUpdate(prevProps: IFrameTabBarProps, prevState: IFrameTabBarState) {
    if (this.state.tabs.length !== prevState.tabs.length) {
      this.onResize();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  pushData = (item: IFrameTabModel) => {
    let { tabs } = this.state;
    const index = tabs.findIndex(val => val.key === item.key)
    if (index === -1) {
      tabs = [...tabs, item];
      this.autoScroll = true;
      this.setState({ tabs, active: item.key })
    } else {
      if (item.path !== tabs[index].path) {
        tabs[index].path = item.path;
      }
      this.setState({ tabs, active: item.key })
    }
    sessionStorage.setItem('TABS_DATA', JSON.stringify(tabs))
  }

  onResize = () => {
    if (this.tabsRef.current.clientWidth > this.tabsWrapRef.current.clientWidth) {
      if (!this.state.arrow) {
        this.setState({ arrow: true })
      }
      if (this.autoScroll) {
        const left = this.tabsWrapRef.current.clientWidth - this.tabsRef.current.clientWidth;
        this.setState({ scrollLeft: left })
        this.autoScroll = false;
      }
    } else {
      if (this.state.arrow) {
        this.setState({ arrow: false, scrollLeft: 0 })
      }
    }
  }
  findKeys = (menus: IMenuItem[], path: string): boolean | IMenuItem => {
    if (menus.length === 0 || !path) {
      return false;
    }
    for (let i = 0; i < menus.length; i++) {
      const item = menus[i];
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const child = this.findKeys((item.children as IMenuItem[]), path);
        if (child) {
          return child;
        }
      }
    }
    return false;
  }
  scrollToStart = () => {
    this.setState({ scrollLeft: 0 })
  }
  scrollToEnd = () => {
    const scrollLeft = this.tabsWrapRef.current.clientWidth - this.tabsRef.current.clientWidth;
    this.setState({ scrollLeft })
  }
  onDelete = (e: any, index: number) => {
    e.stopPropagation();
    const { tabs, active } = this.state;
    if (tabs.length > 1) {
      dropByCacheKey(this.props.location.pathname.split('/')[2])
      if (tabs[index].key === active) {
        const sub = index === 0 ? index + 1 : index - 1;
        this.props.history.push(tabs[sub].path)
      }
      tabs.splice(index, 1);
      this.autoScroll = true;
      sessionStorage.setItem('TABS_DATA', JSON.stringify(tabs))
      this.setState({ tabs });
    }
  }

  render() {
    const { tabs, active, arrow, scrollLeft } = this.state;
    return (
      <div className="tabs-page">
        <span onClick={this.scrollToStart}
          className={`tabs-arrow ${arrow?'tabs-arrow-show':''}`}>
          <Icon type="left" />
        </span>
        <div ref={this.tabsWrapRef} className="tabs-main">
          <div ref={this.tabsRef} style={{ transform: `translateX(${scrollLeft}px)` }} className="tabs-content">
            {
              tabs.map((item: IFrameTabModel, index: number) => {
                return (
                  <div key={index} className="tabs-item" onClick={() => {
                    const _index = tabs.findIndex(e => e.key === active);
                    if (_index === -1) return;
                    tabs[_index].path = this.props.location.pathname;
                    tabs[_index].search = this.props.location.search;
                    let path = item.path;
                    if (item.search) path = `${item.path}${item.search}`;
                    this.setState({ tabs, active: item.key }, () => {
                      this.props.history.push(path);
                    })
                  }}>
                    <div className={`tabs-btn ${active === item.key ? 'active' : ''}`}>
                      <span>{item.name}</span>
                      {tabs.length > 1 ? <Icon type="close" onClick={(e) => {
                        this.onDelete(e, index)
                      }} /> : null}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <span onClick={this.scrollToEnd}
          className={`tabs-arrow ${arrow?'tabs-arrow-show':''}`}>
          <Icon type="right" />
        </span>
      </div>
    );
  }
}



export default withRouter(FrameTabBar);
