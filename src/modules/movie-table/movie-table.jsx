import React from "react";
import { Button, notification, Space, Table, Tag } from "antd";
import { useAsync } from "hooks/useAsync";
import { fetchDeleteMovieApi, fetchMovieListApi } from "services/movie";
import { useNavigate } from "react-router-dom";
import { format } from "utils/common";

export default function MovieTable() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => {
        return <img src={text} alt={text} width={70} height={70}/>;
      },
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
          <Button type="primary" onClick={() => navigate(`/admin/movie-management/${record.maPhim}/update-movie`)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button type="danger" onClick={() => fetchDeleteMovie(record.maPhim)}>
            <i className="fa-solid fa-trash"></i>
          </Button>
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
      await fetchDeleteMovieApi(taiKhoan)
      notification.success({
        description: "Thành công !!!"
      })
      navigate("/admin")
    } catch(errors) {
      notification.warning({
        message: errors
      })
    }
  }

  return (
    <div className="container">
      <div className="text-right mb-3">
        <Button type="primary" onClick={() => navigate("/admin/movie-management/create-movie")}>CREATE MOVIE</Button>
      </div>
      <Table className="table" columns={columns} dataSource={data} rowKey='maPhim'/>
    </div>
  );
}
