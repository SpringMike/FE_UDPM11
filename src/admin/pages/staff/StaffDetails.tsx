import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Col, Dropdown, Menu, MenuProps, Row, Space, Table, Tabs } from "antd";
import Moment from "react-moment";
import { DeleteOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { IStaff, IStaff2 } from "../../type/StaffType";
import { getStaffById } from "../../service/StaffApi";
import StaffUpdate from "./StaffUpdate";


type Account = {
    id: number,
    fullName: string
}

const StaffDetails = () => {

    const { id } = useParams();
    console.log('123123123', id);
    const [staff, setStaff] = useState({} as IStaff);

    const [account, setAccount] = useState({} as Account)
    useEffect(() => {
        getStaffById(parseInt(id as string)).then(staff => {
            setStaff(staff.data)
        })

        console.log("_----------------", staff);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [isLoadModal, setIsLoadModal] = useState(false)


    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                // onUpdateTrueStatus(selectedRowKeys);
                break
            case '2':
                // setIsLoadModal(true)
                break
        }
    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: <Link to="#">Xóa nhân viên</Link>,
                    key: 1,
                    icon: <DeleteOutlined />,
                },
                {
                    label: <Link to="#" onClick={() => setIsLoadModal(true)}>Sửa nhân viên</Link>,
                    key: 2,
                    icon: <InfoCircleOutlined />,

                },
            ]}
        />
    );


    return (
        <div className='p-5'>

            {
                staff && (
                    <div>
                        <h2 style={{ fontSize: '15px', marginBottom: 20 }} >
                            <Link to="/admin/staff/">
                                <LeftOutlined /> Danh sách nhân viên
                            </Link>
                        </h2>
                        <div style={{ background: "white" }}>
                            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', paddingBottom: 0 }}>
                                <div>
                                    Thông tin khác
                                </div>
                                <div>
                                    <Dropdown overlay={menu}>
                                        <div style={{ width: "190px", fontSize: '14px', textAlign: 'center' }}>
                                            <Space>
                                                Thao tác khác
                                                <DownOutlined />
                                            </Space>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                            <hr />
                            <div style={{ padding: '20px' }}>
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={8}>
                                                <p>Tên nhà nhân viên: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{staff.full_name}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Mã nhân viên: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{staff.code}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>SĐT nhân viên: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{staff.phone}</b>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col span={8}>
                                                <p>Người tạo: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>Comming</b>
                                            </Col>
                                        </Row> */}
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={8}>
                                                <p>Email nhân viên: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{staff.email}</b>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col span={8}>
                                                <p>Giới tính: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{staff.gender ? 'Nam' : 'Nữ'}</b>
                                            </Col>
                                            <Col span={8}>
                                                <p>Địa chỉ nhân viên: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{staff.address}</b>
                                            </Col>
                                        </Row>


                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={8}>
                                                <p>Thời giạn tạo: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>
                                                    <Moment format="DD/MM/YYYY HH:mm:ss">
                                                        {staff.create_at}
                                                    </Moment>
                                                </b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Thời gian cập nhập: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>
                                                    <Moment format="DD/MM/YYYY HH:mm:ss">
                                                        {staff.update_at}
                                                    </Moment>
                                                </b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Chức vụ: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>
                                                    {staff.role_id == 1 ? 'Nhân viên' : 'Quản lý'}
                                                </b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <p>Trạng thái tài khoản: </p>
                                            </Col>
                                            <Col span={12}>
                                                <b>{
                                                    staff._delete ? (
                                                        <p style={{ color: 'red' }}>Khoá</p>
                                                    ) : (
                                                        <p style={{ color: 'blue' }}>Hoạt động</p>
                                                    )
                                                }</b>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {isLoadModal && <StaffUpdate staff={staff} isVisible={isLoadModal}
                            setIsVisible={() => setIsLoadModal(false)} />}
                    </div>
                )
            }
        </div>
    )
}



export default StaffDetails;