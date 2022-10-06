import { IStaff, TypeStaff } from "../../type/StaffType"
import { Button, Col, Form, Input, Modal, Radio, RadioChangeEvent, Row, Select } from "antd";
import React, { useState } from "react";
import { updateSupplier } from "../../service/SupplierApi";
import ToastCustom from "../../features/toast/Toast";
import { updateStaffById } from "../../service/StaffApi";


type StaffProps = {
    staff: IStaff,
    isVisible: boolean,
    setIsVisible: () => void
}

const StaffUpdate = ({ staff, isVisible, setIsVisible }: StaffProps) => {

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    const { Option } = Select;
    const [form] = Form.useForm();
    form.setFieldsValue({
        id: staff.id,
        name: staff.name,
        code: staff.code,
        phone: staff.phone,
        email: staff.email,
        accountId: staff.accountId,
        address: staff.address,
        statusAccount: staff.statusAccount + '',
        roleId: staff.roleId + ''
    });
    const onFormSubmit = (staffForm: TypeStaff) => {
        staffForm.accountId = Number(1)
        staffForm.id = staff.id
        console.log(staffForm)
        updateStaffById(staffForm.statusAccount, staffForm.roleId, staff.id).then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: 'Sửa nhân viên thành công'
            }).then()
            window.location.reload()
        }).catch((err) => {
            const error = err.response.data.message
            ToastCustom.fire({
                icon: 'error',
                title: "Sửa nhân viên thất bại",
                html: `${error}`
            }).then()
        })
    }
    const [visible, setVisible] = useState(isVisible);
    // const [confirmLoading, setConfirmLoading] = useState(false);


    // const showModal = () => {
    //     setVisible(true);
    // };

    const handleCancel = () => {
        setVisible(false);
        setIsVisible();
        form.resetFields();
    };
    const [value, setValue] = useState();

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

    return (
        <>
            <Modal
                title="Sửa nhà nhân viên"
                visible={visible}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={700}
                forceRender
                footer={[]}
            >
                <div style={{ background: "white", padding: 24 }}>
                    <Form
                        form={form}
                        onFinish={onFormSubmit}
                        layout="vertical"
                    >
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item label="Tên nhân viên" name="name" rules={[{ required: true, message: "Tên không được để trống" }]}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Mã nhà nhân viên " name="code">
                                    <Input disabled placeholder="Nhập mã nhà cung cấp" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item label="SĐT" name="phone"
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
                                    <Input disabled placeholder="Nhập SĐT" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email không được để trống" }]}>
                                    <Input disabled placeholder="Nhập email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Trạng thái" name="statusAccount">
                                    <Select dropdownStyle={{height: 100, width: 300}}>
                                        <Option style={{width: 400}} value="true">Hoạt Động</Option>
                                        <Option value="false">Khoá</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Chức vụ" name="roleId">
                                    <Select dropdownStyle={{height: 100, width: 300}}>
                                        <Option style={{width: 400}} value="1">ADMIN</Option>
                                        <Option value="2">STAFF</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
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
            </Modal>

        </>
    )
}

export default StaffUpdate