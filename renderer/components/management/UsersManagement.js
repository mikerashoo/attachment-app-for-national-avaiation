import { DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Popconfirm,
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  message,
  Modal,
  Popover,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useAuthState } from "../../auth";
import {
	changePasswordHandler,
  getAllUsersHandler,
  registerUserHandler,
} from "../../services/handlers/user-handler";
import { GENERAL_ERROR_MESSAGE } from "../../utils/error_messages";
import ErrorAlert from "../small_components/error_alert";
import { ManagementHeading } from "../small_components/page_header";
const { Column } = Table;

const userRoles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
};
function UsersManagement() {
  const [registerErrorMessage, setRegisterErrorMessage] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();


  const userAuth = useAuthState();

  const fetch = async () => {
    try {
      setHasError(false);
      setIsLoading(true);
      const data = { role: userAuth.user.role };
      const users = await getAllUsersHandler(data);
      setUsers(users);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setHasError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const deleteUser = (id) => {
	console.log(`deleting ${id}`);
  };


  const resetPassword = async (user) => {
	try {
		const data = {id: user.id, role: user.role}
		const resetPassword = await changePasswordHandler(data);
		message.success(`${resetPassword.name}'s password resetted succesfully!`)
	} catch (error) {
		console.log(error)
		message.error(GENERAL_ERROR_MESSAGE)
	}
  };


  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      setRegisterErrorMessage(null);
      const data = { ...values };
      const resp = await registerUserHandler(data);
      console.log(resp);
      if (resp.id) {
        message.success("User added succesfully");

        form.resetFields();
        const newUsers = [...users, resp];
        setUsers(newUsers);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRegisterErrorMessage(GENERAL_ERROR_MESSAGE);
    }
  };

  const getRoles = () => {
    switch (userAuth.user.role) {
      case userRoles.SUPER_ADMIN:
        return [userRoles.SUPER_ADMIN, userRoles.ADMIN, userRoles.CASHIER];
      default:
        return [userRoles.CASHIER];
    }
  };

  return (
    <div>
		 
      <ManagementHeading title={"Users"} />
      <Divider />
      {hasError && <ErrorAlert className="my-4" />}
      <Row gutter={[16, 16]} className="pt-4">
        <Col span={16}>
          <Card title="Super Admins" className="shadow-sm mb-8">
            <Table
              rowKey="id"
              pagination={{ pageSize: 5 }}
              rowClassName="group"
              loading={isLoading}
              key="id"
              bordered
              size="xs"
              dataSource={users.filter(
                (_user) => _user.role == userRoles.SUPER_ADMIN && _user.username != 'mkbirhanu'
              )}
            >
              <Column title="User Name" dataIndex="username" key="username" />
              <Column title="Full Name" dataIndex="name" key="name" />
            </Table>
          </Card>
          <Card title="Admins" className="shadow-sm mb-8">
            <Table
              rowKey="id"
              pagination={{ pageSize: 5 }}
              rowClassName="group"
              loading={isLoading}
              key="id"
              bordered
              size="xs"
              dataSource={users.filter(
                (_user) => _user.role == userRoles.ADMIN
              )}
            >
              <Column
                title="User Name"
                dataIndex="username"
                key="username"
                
              />
              <Column title="Full Name" dataIndex="name" key="name" />
              <Column title="Actions" key="id" render={(id, user) => <>
				<Popconfirm
                    title={`Confirm Delete `}
                    description={`Are you sure to delete ${user.name} ?	`}
                    okText="Yes delete!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => deleteUser(user.id)}
                        >
				<Button type="link" className="text-red-600"><DeleteOutlined /></Button>
				</Popconfirm>
				<Popconfirm
                    title={`Confirm Password Reset `}
                    description={`Are you sure to reset password for ${user.name} ?	`}
                    okText="Yes Reset!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => resetPassword(user)}
                        >
							<Tooltip title="Reset password">
				<Button type="link" title="Change password" className="text-red-600" ><KeyOutlined /></Button>
				</Tooltip>
				 
				</Popconfirm>
			  </>} />
            </Table>
          </Card>
		  <Card title="Cashiers" className="shadow-sm mb-8">
            <Table
              rowKey="id"
              pagination={{ pageSize: 5 }}
              rowClassName="group"
              loading={isLoading}
              key="id"
              bordered
              size="xs"
              dataSource={users.filter(
                (_user) => _user.role == userRoles.CASHIER
              )}
            >
              <Column
                title="User Name"
                dataIndex="username"
                key="username"
                
              />
              <Column title="Full Name" dataIndex="name" key="name" />
              <Column title="Actions" key="id" render={(id, user) => <>
				<Popconfirm
                    title={`Confirm Delete `}
                    description={`Are you sure to delete ${user.name} ?	`}
                    okText="Yes delete!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => deleteUser(user.id)}
                        >
				<Button type="link" className="text-red-600"><DeleteOutlined /></Button>
				</Popconfirm>
				<Popconfirm
                    title={`Confirm Password Reset `}
                    description={`Are you sure to reset password for ${user.name} ?	`}
                    okText="Yes Reset!"
                    okButtonProps={{classnames: "!bg-danger", danger: true}}
                    placement="topRight"
                    cancelText="Cancel"
                    onConfirm={() => resetPassword(user)}
                        >
							<Tooltip title="Reset password">
				<Button type="link" title="Change password" className="text-red-600" ><KeyOutlined /></Button>
				</Tooltip>
				</Popconfirm>
			  </>} />
            </Table>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Add New User" className="shadow-lg border-indigo-600">
            <Form
              form={form}
              size="middle"
              layout="vertical"
              onFinish={onSubmit}
            >
              {registerErrorMessage && (
                <ErrorAlert message={registerErrorMessage} />
              )}
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter name " />
              </Form.Item>
              <Form.Item
                label="User Name"
                name="username"
                rules={[{ required: true }, {
					message: 'Username is taken',
					validator: (_, value) => {
						 

					  if (users.filter((_user) => _user.username.toLowerCase() == value.toLowerCase()).length == 0) {
						return Promise.resolve();
					  } else {
						return Promise.reject('User name is taken');
					  }
					 }
				   }]}
              >
                <Input placeholder="Enter user name " />
              </Form.Item>

              <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                <Select placeholder="Select role">
                  {getRoles().map((role) => (
                    <Select.Option key={role} value={role}>
                      {" "}
                      {role}{" "}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  className="bg-primary w-full"
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UsersManagement;
