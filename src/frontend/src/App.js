import {useState, useEffect} from 'react';
import {deleteStudent, getAllStudents} from './client';
import {Table, Layout, Menu, Breadcrumb, Spin, Empty, Button, Badge, Tag, Avatar, Radio, Popconfirm} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    PlusOutlined
} from '@ant-design/icons';
import StudentDrawerForm from './StudentDrawerForm';
import './App.css';
import {errorNotification, successNotification} from "./Notification";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>;
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>
}
const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification("Student deleted", `Student with ${studentId} was deleted`);
        /* Invoke the Method fetchStudents as a Callback Method */
        callback();
    }).catch(error => {
        error.response.json().then(res => {
            console.log(res);
            errorNotification("There was an Issue",`${res.message} [${res.status}] [${res.error}]`)
        });
    });
}
const columns = fetchStudents => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => {
            return <TheAvatar name={student.name}/>;
        }
    },
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
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>
    }
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [students, setStudents] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () => {
        getAllStudents().then(response => response.json())
            .then(dataFromJsonFunction => {
                console.log(dataFromJsonFunction);
                setStudents(dataFromJsonFunction);
            }).catch(error => {
            console.log(error.response);
            error.response().json().then(res => {
                console.log(res);
                errorNotification("There was an Issue", `${res.message} [StatusCode: ${res.status}]`);
            });
        }).finally(() => {
            setFetching(false);
        });
    }

    useEffect(() => {
        /* This Piece of Code is run ones as soon as the Component is mounted */
        console.log("Component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return (<Spin/>);
        }
        if (students.length <= 0) {
            return( <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>);
        }
        return( <>
            <StudentDrawerForm showDrawer={showDrawer} setShowDrawer={setShowDrawer} fetchStudents={fetchStudents}/>
            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                rowKey={(student) => {
                    return student.id
                }}
                bordered title={() => {
                <>
                    <Tag style={{marginLeft: "5px"}}>Number of Students</Tag>
                    <Badge count={students.length} className="site-badge-count-4"/>
                    <Button type="primary" shape="round" icon={<PlusOutlined/>} size="small"
                            onClick={() => setShowDrawer(!showDrawer)}>Add New Student</Button>
                </>
            }}/>
        </>);
    }

    return (
        <div className="App">
            {students &&
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>Option 1</Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>Option 2</Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                            {students.map((student, index) => {
                                return <Menu.Item key={'sub1' + index}>{student.name}</Menu.Item>;
                            })}
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                            <Menu.Item key="3">Team 1</Menu.Item>
                            <Menu.Item key="4">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5" icon={<FileOutlined/>}>Files</Menu.Item>
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
