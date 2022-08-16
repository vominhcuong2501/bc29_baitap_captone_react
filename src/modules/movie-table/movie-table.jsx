import React, { useState } from "react";
import { Button, Input, notification, Space, Table } from "antd";
import { useAsync } from "hooks/useAsync";
import { fetchDeleteMovieApi, fetchMovieListApi } from "services/movie";
import { useNavigate } from "react-router-dom";
import { format } from "utils/common";
import "./movie-table.scss";

export default function MovieTable() {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState([]);

  const { Search } = Input;

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => {
        return <img src={text} alt={text} width={100} height={70} />;
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (text) => {
        return <span>{format(text)}</span>;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            title="Update movie"
            className="text-warning"
            style={{ fontSize: 20 }}
            onClick={() =>
              navigate(`/admin/movie-management/${record.maPhim}/update-movie`)
            }
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
          <a
            title="Delete movie"
            className="text-danger"
            style={{ fontSize: 20 }}
            onClick={() => fetchDeleteMovie(record.maPhim)}
          >
            <i className="fa-solid fa-trash"></i>
          </a>
          <a
            title="Create show-time"
            className="text-success"
            style={{ fontSize: 20 }}
            onClick={() =>
              navigate(`/admin/movie-management/show-time/${record.maPhim}`)
            }
          >
            <i className="fa-solid fa-calendar-days"></i>
          </a>
        </Space>
      ),
    },
  ];

  // lấy danh sách phim
  const { state: data = [] } = useAsync({
    service: () => fetchMovieListApi(),
  });

  // xóa phim
  const fetchDeleteMovie = async (taiKhoan) => {
    try {
      await fetchDeleteMovieApi(taiKhoan);
      notification.success({
        description: "Thành công !!!",
      });
      navigate("/admin");
    } catch (errors) {
      notification.warning({
        message: errors.response.data.content,
      });
    }
  };

  // tìm kiếm
  const onSearch = (value) => {
    let searchData = data.filter((ele) => {
      return (
        ele.tenPhim.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !==
        -1
      );
    });
    setSearchState(searchData);
  };

  return (
    <div className="container">
      <div>
          <Space direction="vertical">
            <Search
              placeholder="Nhập tên phim"
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
          onClick={() => navigate("/admin/movie-management/create-movie")}
        >
          CREATE MOVIE
        </Button>
      </div>
      <Table
        className="table"
        columns={columns}
        dataSource={searchState.length > 0 ? searchState : data}
        rowKey="maPhim"
        style={{
          fontFamily: "Times New Roman', Times, serif",
        }}
      />
    </div>
  );
}
