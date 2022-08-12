// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   notification,
//   Radio,
//   Select,
// } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { GROUP_ID, maHeThongRap } from "constans/common";

// import { useAsync } from "hooks/useAsync";
// import { Option } from "antd/lib/mentions";
// import { fetchMovieDetailApi } from "services/movie";
// import { fetchAddShowTimeApi } from "services/booking";
// import { format } from "utils/common";

// export default function MovieShowTime() {
//   // chuyển trang
//   const navigate = useNavigate();

//   // lấy id trên url
//   const params = useParams();

//   // set kích thước của form
//   const [componentSize, setComponentSize] = useState("default");
//   const onFormLayoutChange = (e) => {
//     setComponentSize(e.target.value);
//   };

//   // lấy thông tin movie
//   const { state: movieDetail = [] } = useAsync({
//     service: () => fetchMovieDetailApi(params.movieId),
//   });

//   // // đặt biến render theo maHeThongRap
//   // const [cumRap, setCumRap] = useState()

//   const handleChange = (event) => {
//     const result = event.target.value;
//     console.log(result);
//   }

//   // hàm submit thêm phim
//   const handleSave = async (values) => {
//     const create = {
//       maPhim: movieDetail.maPhim,
//       ngayKhoiChieu: format(values.ngayKhoiChieu, "DD/MM/yyyy hh:mm:ss"),
//       giaVe: Number(values.giaVe),
//       maRap: values.cumRap
//     };
//     console.log(create);

//     await fetchAddShowTimeApi(create)
//     notification.success({
//       description: "Successfully !!!"
//     })
//     navigate('/admin/movie-management')
//   };

//   return (
//     <div className="container ">
//       <h2 className="my-5">Tạo lịch chiếu - {movieDetail.tenPhim}</h2>
//       <div className="row">
//         <div className="col-3">
//           <img src={movieDetail.hinhAnh} alt={movieDetail.hinhAnh} />
//         </div>
//         <div className="col-9">
//           <Form
//             labelCol={{
//               span: 4,
//             }}
//             wrapperCol={{
//               span: 14,
//             }}
//             layout="horizontal"
//             initialValues={{
//               maHeThongRap: "",
//               cumRap: "",
//               ngayKhoiChieu: "",
//               giaVe: "",
//             }}
//             // onValuesChange={onFormLayoutChange}
//             size={componentSize}
//             onFinish={handleSave}
//           >
//             <Form.Item label="Form Size">
//               <Radio.Group
//                 onChange={onFormLayoutChange}
//                 defaultValue={componentSize}
//               >
//                 <Radio.Button value="small">Small</Radio.Button>
//                 <Radio.Button value="default">Default</Radio.Button>
//                 <Radio.Button value="large">Large</Radio.Button>
//               </Radio.Group>
//             </Form.Item>
//             <Form.Item name="maHeThongRap" label="Chọn hệ thống rạp"  >
//               <Select onChange={handleChange}>
//                 {maHeThongRap.map((ele, index) => {
//                   return <Option key={index} value={ele[index]}>{ele}</Option>;
//                 })}
//               </Select>
//             </Form.Item>
//             <Form.Item name="cumRap" label="Chọn cụm rạp">
//               <Select placeholder="Chọn loại người dùng">
//                 <Option value="QuanTri">QuanTri</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
//               <DatePicker />
//             </Form.Item>
//             <Form.Item label="Giá vé" name="giaVe">
//               <Input />
//             </Form.Item>
//             <Form.Item style={{ marginLeft: 70 }}>
//               <Button htmlType="submit" type="primary">
//                 SAVE
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { notification } from "antd";
import { maHeThongRap } from "constans/common";
import { useAsync } from "hooks/useAsync";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddShowTimeApi } from "services/booking";
import { fetchCumRapApi } from "services/cinema";
import { fetchMovieDetailApi } from "services/movie";
import { format } from "utils/common";

export default function MovieShowTime() {
  // chuyển trang
  const navigate = useNavigate();

  // lấy thông tin url
  const params = useParams();

  // dùng để lấy event.target trong form
  const formRef = useRef();

  // đặt state
  const [state, setState] = useState({
    maHeThongRap: "",
    maRap: "",
    ngayKhoiChieu: "",
    giaVe: "",
  });

  // lấy thông tin phim
  const { state: movieDetail = [] } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
  });

  // setState khi nhập dữ liệu
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // setCumRAp khi có maHeThongRap
  const { state: cumRap } = useAsync({
    service: () => fetchCumRapApi(state.maHeThongRap),
    dependencies: [state.maHeThongRap],
    condition: !!state.maHeThongRap,
  });

  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const create = {
      maPhim: movieDetail.maPhim,
      ngayChieuGioChieu: format(state.ngayChieuGioChieu, "DD/MM/YYYY hh:mm:ss"),
      giaVe: Number(state.giaVe),
      maRap: state.maRap,
    };
    try {
      await fetchAddShowTimeApi(create);
      notification.success({
        description: "Thành công !!!",
      });
      navigate("/admin/movie-management");
    } catch (errors) {
      notification.warning({
        message: errors.response.data.content,
      });
    }
  };

  // render hệ thống rạp
  const renderHethongRap = () => {
    return maHeThongRap.map((ele, index) => {
      return <option key={index}>{ele}</option>;
    });
  };

  // renderCumRap
  const renderCumRap = () => {
    return cumRap?.map((ele, index) => {
      return <option key={index} value={ele.maCumRap}>{ele.tenCumRap}</option>;
    });
  };

  return (
    <div className="container">
      <h2>Tạo lịch chiếu - {movieDetail.tenPhim}</h2>
      <div className="row mt-5">
        <div className="col-4">
          <img src={movieDetail.hinhAnh} alt={movieDetail.hinhAnh} width={300} height={360} />
        </div>
        <div className="col-8">
          <div className="card p-0">
            <div className="card-body">
              <form ref={formRef} noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-film"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        onChange={handleChange}
                        name="maHeThongRap"
                      >
                        <option>Chọn hệ thống rạp</option>
                        {renderHethongRap()}
                      </select>
                    </div>
                  </div>
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-tv"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        onChange={handleChange}
                        name="maRap"
                      >
                        <option>Chọn cụm rạp</option>
                        {renderCumRap()}
                      </select>
                    </div>
                  </div>
                  <div className=" col-12 form-group my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-calendar"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="date"
                        className="form-control"
                        placeholder="Ngày khởi chiếu"
                        onChange={handleChange}
                        name="ngayChieuGioChieu"
                      />
                    </div>
                  </div>
                  <div className="form-group col-12 my-3">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-money-bill"></i>
                        </span>
                      </div>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Giá vé"
                        name="giaVe"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-warning mr-2">
                    CREATE SHOW-TIME
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
