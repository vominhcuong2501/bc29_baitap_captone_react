import React from "react";
import { Button, notification, Space, Table } from "antd";
import { useAsync } from "hooks/useAsync";
import { useNavigate } from "react-router-dom";
import "./user-table.scss";
import { fetchDeleteUserApi, fetchUserListApi } from "services/user";

export default function UserTable() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số ĐT",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại ND",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() =>
              navigate(`/admin/user-management/${record.taiKhoan}/update-user`)
            }
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button
            type="danger"
            onClick={() => fetchDeleteUser(record.taiKhoan)}
          >
            <i className="fa-solid fa-trash"></i>
          </Button>
        </Space>
      ),
    },
  ];

  // lấy danh sách phim
  const { state: data = [] } = useAsync({
    service: () => fetchUserListApi(),
  });

  // xóa phim
  const fetchDeleteUser = async (taiKhoan) => {
    try {
      await fetchDeleteUserApi(taiKhoan);
      notification.success({
        description: "Thành công !!!",
      });
      navigate("/admin");
    } catch (errors) {
      notification.warning({
        message: (errors.response.data.content),
      });
    }
  };

  return (
    <div className="container">
      <div className="text-right mb-3">
        <Button
          type="primary"
          onClick={() => navigate("/admin/user-management/create-user")}
        >
          ADD USER
        </Button>
      </div>
      <Table
        className="table"
        columns={columns}
        dataSource={data}
        rowKey="taiKhoan"
        style={{
          fontFamily: "Times New Roman', Times, serif",
        }}
      />
    </div>
  );
}
