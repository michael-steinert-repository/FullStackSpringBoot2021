import {useState, useEffect} from 'react'
import {getAllStudents} from './client';
import {Table, Layout, Menu, Breadcrumb, Spin, Empty} from 'antd';
import {DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import './App.css';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    }
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [students, setStudents] = useState([]);

    const fetchStudents = () => {
        getAllStudents()
            .then(response => response.json())
            .then(dataFromJsonFunction => {
                setStudents(dataFromJsonFunction);
                setFetching(false);
            });
    }

    useEffect(() => {
        /* This Piece of Code is run ones as soon as the Component is mounted */
        console.log("Component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if(fetching) {
            return <Spin />;
        }
        if (students.length <= 0) {
            return <Empty />;
        }
        return <Table
            dataSource={students}
            columns={columns}
            rowKey={(student) => {return student.id}}
            bordered title={()=>{return 'Students'}} />;
    }

    return (
        <div className="App">
            {students &&
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                            {students.map((student, index) => {
                                return <Menu.Item key={'sub1'+index}>{student.name}</Menu.Item>;
                            })}
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                            <Menu.Item key="3">Team 1</Menu.Item>
                            <Menu.Item key="4">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5" icon={<FileOutlined/>}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>List of all Students</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {renderStudents()}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Full Stack Project</Footer>
                </Layout>
            </Layout>}
        </div>
    );
}

export default App;
