import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Radio, DatePicker } from 'antd';
import "antd/dist/antd.css";
import ToastCustom from "../../features/toast/Toast";
import AddAddress from "../../components/AddAddress";
import { createStaff } from "../../service/StaffApi";
import { TypeStaff } from "../../type/StaffType";
import { PlusOutlined } from '@ant-design/icons';


type StaffProps = {
    reload: () => void
}
type Account = {
    id: number
    employee: [
        {
            fullName: string
        }
    ]
}





const StaffCreate = ({ reload }: StaffProps) => {
    const { Option } = Select;

    const [accountId, setAccountId] = useState<number>();
    const [accounts, setAccounts] = useState<Account[]>([]);


    const [form] = Form.useForm();
    const onFormSubmit = (staff: TypeStaff) => {
        staff.accountId = accountId as number
        createStaff(staff).then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Thêm nhân viên thành công'
            }).then()
            setVisible(false);
            form.resetFields();
            reload()
            handleKeyChange()
        }).catch((err) => {
            const error = err.response.data.message
            ToastCustom.fire({
                icon: 'error',
                title: "Thêm nhân viên thất bại",
                html: `${error}`
            }).then()
        })
    }
    const [visible, setVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);


    const showModal = () => {
        setVisible(true);

    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        handleKeyChange()
    };


    const [fullAddress, setFullAddress] = useState("")
    const [keyChange, setKeyChange] = useState(0);

    const handleKeyChange = () => {
        setKeyChange(current => current + 1);
    };
    useEffect(() => {
        form.setFieldsValue({
            address: fullAddress
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullAddress])


    function onChange(value: number) {
        setAccountId(value)
    }

    const [value, setValue] = useState(1);
    const onChangeRadio = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (


        <div>

            <Button onClick={showModal} style={{ width: "180px", fontSize: '14px' }} type="primary">
                <Space>
                    <PlusOutlined />
                    Thêm mới
                </Space>
            </Button>
            {visible && <Modal
                title="Thêm mới nhân viên"
                visible={visible}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={700}
                footer={[]}

            >
                <div style={{ background: "white", padding: 24 }}>
                    <Form
                        form={form}
                        onFinish={onFormSubmit}
                        layout="vertical"
                    >
                        <Form.Item label="Tên nhân viên" name="name" rules={[{ required: true, message: "Tên không được để trống" }]}>
                            <Input placeholder="Nhập tên nhân viên" />
                        </Form.Item>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username không được để trống" }]}>
                                    <Input placeholder="Nhập Username nhân viên" />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ height: '100%'}}>
                                <Space direction="vertical" >
                                    <Form.Item label="Ngày sinh" name="dob" rules={[{ required: true, message: "Ngày sinh không được để trống" }]}>
                                        <DatePicker format={'YYYY/MM/DD'} placeholder="Nhập Ngày sinh" style={{width: '290px'}}/>
                                    </Form.Item>
                                </Space>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Mã nhân viên " name="code">
                                    <Input placeholder="Nhập mã nhân viên" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone" name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "SĐT không được để trống"
                                        },
                                        {
                                            pattern: (/((09|03|07|08|05)+([0-9]{8})\b)/g),
                                            message: "SĐT không hợp lệ!"
                                        }
                                    ]}>
                                    <Input placeholder="Nhập SĐT" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không được để trống" }]}>
                                    <Input placeholder="Nhập email" />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ height: '100%' }}>
                                <Form.Item label="Giới tính" name="gender">
                                    <Radio.Group>
                                        <Radio value="true"> Nam </Radio>
                                        <Radio value="false"> Nữ </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/*add address*/}

                        <AddAddress onChange={setFullAddress} keyChange={keyChange} />

                        {/*-------------------*/}

                        <Row gutter={24}>
                            <Col span={12}>
                            <Form.Item label="Chức vụ" name="roleId">
                                    <Radio.Group>
                                        <Radio value="1"> STAFF </Radio>
                                        <Radio value="2"> ADMIN </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input disabled placeholder="địa chỉ nhân viên" />
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không được để trống" }]}>
                                    <Input placeholder="Nhập email" />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ height: '100%' }}>
                                <Radio.Group onChange={onChangeRadio} value={value}>
                                    <Radio value={true}>Nam</Radio>
                                    <Radio value={false}>Nữ</Radio>
                                </Radio.Group>
                            </Col> */}
                        </Row>


                        <Row>
                            <Col span={4}>
                                <Form.Item>
                                    <Button onClick={handleCancel}>Huỷ</Button>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button htmlType="submit" type="primary">Xác nhận</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>}

        </div>
    )
}



export default StaffCreate;