import React, { useState } from 'react';
import {
    Layout,
    Menu,
    Button,
    Modal,
    Form,
    Input,
    List,
    Avatar,
    Typography,
    message,
} from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    PlusOutlined,
    InfoCircleOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type Employee = {
    id: number;
    name: string;
    position: string;
    email: string;
};

const initialEmployees: Employee[] = [
    { id: 1, name: 'Иван Иванов', position: 'Frontend Developer', email: 'ivanov@example.com' },
    { id: 2, name: 'Мария Петрова', position: 'Backend Developer', email: 'petrova@example.com' },
];

const AntExample: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const [form] = Form.useForm();

    const showAddModal = () => setIsModalOpen(true);
    const hideAddModal = () => setIsModalOpen(false);

    const showInfoModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsInfoModalOpen(true);
    };
    const hideInfoModal = () => setIsInfoModalOpen(false);

    const onFinish = (values: Omit<Employee, 'id'>) => {
        setEmployees([
            ...employees,
            { id: Date.now(), ...values },
        ]);
        message.success('Сотрудник добавлен!');
        form.resetFields();
        hideAddModal();
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 6, textAlign: 'center', color: '#fff', lineHeight: '32px' }}>
                    LOGO
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<TeamOutlined />}>
                        Сотрудники
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        Профиль
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Title level={3} style={{ margin: 0 }}>Список сотрудников</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                        Добавить сотрудника
                    </Button>
                </Header>
                <Content style={{ margin: '24px', background: '#fff', padding: 24, borderRadius: 8 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={employees}
                        bordered
                        header={<b>Сотрудники компании</b>}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button
                                        icon={<InfoCircleOutlined />}
                                        onClick={() => showInfoModal(item)}
                                    >
                                        Подробнее
                                    </Button>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    title={item.name}
                                    description={item.position}
                                />
                                <span>
                  <MailOutlined /> {item.email}
                </span>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>

            {/* Модалка добавления сотрудника */}
            <Modal
                title="Добавить сотрудника"
                open={isModalOpen}
                onCancel={hideAddModal}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark="optional"
                >
                    <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: 'Введите имя сотрудника' }]}
                    >
                        <Input placeholder="Имя" />
                    </Form.Item>
                    <Form.Item
                        label="Должность"
                        name="position"
                        rules={[{ required: true, message: 'Введите должность' }]}
                    >
                        <Input placeholder="Должность" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Введите email' },
                            { type: 'email', message: 'Некорректный email' },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Модалка информации о сотруднике */}
            <Modal
                title="Информация о сотруднике"
                open={isInfoModalOpen}
                onCancel={hideInfoModal}
                footer={[
                    <Button key="close" onClick={hideInfoModal}>
                        Закрыть
                    </Button>
                ]}
            >
                {selectedEmployee && (
                    <div>
                        <p><b>Имя:</b> {selectedEmployee.name}</p>
                        <p><b>Должность:</b> {selectedEmployee.position}</p>
                        <p><b>Email:</b> {selectedEmployee.email}</p>
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default AntExample;
