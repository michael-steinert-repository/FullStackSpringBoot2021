import {useState} from 'react';
import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {successNotification, errorNotification} from './Notification';
import {addNewStudent} from './client';

const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const [submitting, setSubmitting] = useState(false);
    const onClose = () => setShowDrawer(false);

    const onFinish = student => {
        setSubmitting(true);
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student).then(() => {
            console.log("Student added");
            onClose();
            successNotification("Student successfully added", `${student.name} was added`);
            fetchStudents();
        }).catch(error => {
            console.log(error);
            error.response.json().then(res => {
                console.log(res);
                errorNotification("There was an Issue",`${res.message} [${res.status}] [${res.error}]`,"bottomLeft");
            });
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    }

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin/>}
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;