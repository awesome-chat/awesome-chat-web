import React, { Component, PropTypes } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import CompanyEdit from '@client/page/company/Edit.jsx';
import CompanyDetail from '@client/page/company/Detail.jsx';
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
        pathName: '/company/detail'
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
        id: 21,
        name: '新增组织架构',
        pathName: '/'
      },
      {
        id: 22,
        name: '组织架构修改',
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
      },
      {
        id: 32,
        name: '考勤修改',
      }
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
            {`Nchat内部管理系统 —— XX公司`}
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
                <Route exact path="/company/detail" component={CompanyDetail} />
                <Route path="/company/edit" component={CompanyEdit} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App;