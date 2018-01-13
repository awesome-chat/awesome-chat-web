import React, { Component, PropTypes } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import OrgEdit from '@client/page/organization/Edit.jsx';
import OrgDepEdit from '@client/page/organization/dep/Edit.jsx';
import OrgUserEdit from '@client/page/organization/user/Edit.jsx';
import CompanyEdit from '@client/page/company/Edit.jsx';
import CompanyDetail from '@client/page/company/Detail.jsx';
import AttendanceList from '@client/page/attendance/List.jsx';
import AttendanceDetail from '@client/page/attendance/Detail.jsx';
import './Main.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const menuDataStruct = [
  {
    id: 1,
    name: '公司信息',
    type: 'solution',
    child: [
      {
        id: 11,
        name: '信息详情',
        pathName: '/'
      },
      {
        id: 12,
        name: '信息修改',
        pathName: '/company/edit'
      }
    ]
  },
  {
    id: 2,
    name: '组织架构',
    type: 'usergroup-add',
    child: [
      {
        id: 22,
        name: '组织架构修改',
        pathName: '/org/edit'
      }
    ]
  },
  {
    id: 3,
    name: '考勤',
    type: 'calendar',
    child: [
      {
        id: 31,
        name: '考勤查询',
        pathName: '/attendance/list'
      },
    ]
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1
    }
  }

  render() {
    const menuContent = menuDataStruct.map(d =>
      <SubMenu key={d.id} title={<span><Icon type={d.type || 'user'} />{d.name}</span>}>
        {d.child.map(t => (
          <Menu.Item key={t.id}>
            <Link to={t.pathName || '/'}>
              {t.name}
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>)

    return (
      <Layout className="layout">
        <Header className="header">
          <div className="title">
            {`Nchat内部管理系统 —— Test公司`}
          </div>
          <div className="user">
            <Icon type="user" />
            <span>管理员</span>
            <span className="status online" />
            <Icon type="logout" />
            <span>退出</span>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {menuContent}
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280
              }}
            >
              <Switch>
                <Route exact path="/" component={CompanyDetail} />
                <Route path="/company/edit" component={CompanyEdit} />
                <Route path="/attendance/list" component={AttendanceList} />
                <Route path="/attendance/detail" component={AttendanceDetail} />
                <Route path="/org/edit" component={OrgEdit} />
                <Route path="/org/dep/edit" component={OrgDepEdit} />
                <Route path="/org/user/edit" component={OrgUserEdit} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App;