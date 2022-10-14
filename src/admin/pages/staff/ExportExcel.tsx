import { Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React from "react";
import axios from "axios";
import base_url from "../../service/BaseApi";
const ExportExcel = () => {

    const handleUpload = () => {
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = "staff"
        axios
            .get(`${base_url}/staffs/download`, {
                responseType: "blob",
            })
            .then((res) => {
                link.href = URL.createObjectURL(
                    new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", })
                );
                link.click();
            });
    }
    return (
        <div>
            <Button onClick={handleUpload} style={{ width: "120px", fontSize: '14px' }} type="primary">
                <Space>
                    <DownloadOutlined />
                    Xuất excel
                </Space>
            </Button>

        </div>
    )
}
export default ExportExcel