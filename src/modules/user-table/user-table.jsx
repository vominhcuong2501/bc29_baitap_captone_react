import React, { useState } from "react";
import { Button, Input, notification, Space, Table } from "antd";
import { useAsync } from "hooks/useAsync";
import { useNavigate } from "react-router-dom";
import "./user-table.scss";
import { fetchDeleteUserApi, fetchUserListApi } from "services/user";

export default function UserTable() {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState([]);

  const { Search } = Input;

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
          <a
          title="Update user"
          style={{fontSize: 20}}

            className="text-warning"
            onClick={() =>
              navigate(`/admin/user-management/${record.taiKhoan}/update-user`)
            }
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
          <a
          title="Delete user"
          style={{fontSize: 20}}
            className="text-danger"
            onClick={() => fetchDeleteUser(record.taiKhoan)}
          >
            <i className="fa-solid fa-trash"></i>
          </a>
        </Space>
      ),
    },
  ];

  const { state: data = [] } = useAsync({
    service: () => fetchUserListApi(),
  });

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

  const onSearch = (value) => {
    let searchData = data.filter((ele) => {
      return (
        ele.hoTen.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !==
        -1
      );
    });
    if(searchData) {
      setSearchState(searchData);

    } else {
      notification.warning({
        message: "Kết quả tìm kiếm không tồn tại !!!!"
      })
    }
  };

  return (
    <div className="container">
        <div>
          <Space direction="vertical">
            <Search
              placeholder="Nhập họ tên cần tìm"
              onSearch={onSearch}
              enterButton
              name="keyword"
              allowClear
            />
          </Space>
        </div>
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
        dataSource={searchState.length > 0 ? searchState : data}
        rowKey="taiKhoan"
        style={{
          fontFamily: "Times New Roman', Times, serif",
        }}
      />
    </div>
  );
}
