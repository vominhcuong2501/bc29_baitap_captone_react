import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Switch,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { GROUP_ID } from "constans/common";
import {
  fetchAddMovieUploadImageApi,
  fetchMovieDetailApi,
  fetchUpdateMovieApi,
} from "services/movie";
import { useAsync } from "hooks/useAsync";
import moment from "moment";

export default function MovieForm() {
  // chuyển trang
  const navigate = useNavigate();

  // lấy id trên url
  const params = useParams();

  // set kích thước của form
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = (e) => {
    setComponentSize(e.target.value);
  };

  // custom hook của form antd
  const [form] = Form.useForm();

  // đặt state gán cho handleChangeImage
  const [image, setImage] = useState();

  // đặt state gửi lên back-end
  const [file, setFile] = useState();

  // thay đổi dữ liệu sang dữ liệu back-end
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // mã hóa hình ảnh
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImage(e.target.result);
      setFile(file);
    };
  };

  //render dữ liệu khi edit
  const { state: movieDetail = [] } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
    dependencies: [params.movieId],
    condition: !!params.movieId,
  });

  useEffect(() => {
    if (movieDetail) {
      form.setFieldsValue({
        ...movieDetail,
        ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
      });
      setImage(movieDetail.hinhAnh);
    }
  }, [movieDetail]);

  // hàm submit thêm phim
  const handleSave = async (values) => {
    // gửi dữ liệu lên beck-end
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY"); // nếu đối tượng là moment mới dùng được (chuyển đổi dữ liệu)
    values.maNhom = GROUP_ID;
    const formData = new FormData();
    file && formData.append("File", file, file.name);
    for (let key in values) {
      formData.append(key, values[key]);
    }
    params.movieId && formData.append("maPhim", params.movieId);

    // submit
    if (params.movieId) {
      try {
        await fetchUpdateMovieApi(formData);
        notification.success({
          description: "Thành công !!!",
        });
        navigate("/admin");
      } catch (errors) {
        notification.warning({
          message: errors.response.data.content,
        });
      }
    } else {
      try {
        await fetchAddMovieUploadImageApi(formData);
        notification.success({
          description: "Thành công !!!",
        });
        navigate("/admin");
      } catch (errors) {
        notification.warning({
          message: errors.response.data.content,
        });
      }
    }
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        tenPhim: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        trailer: "",
        danhGia: "",
      }}
      // onValuesChange={onFormLayoutChange}
      size={componentSize}
      onFinish={handleSave}
    >
      <Form.Item label="Form Size">
        <Radio.Group onChange={onFormLayoutChange} defaultValue={componentSize}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim" name="tenPhim">
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={handleChangeImage} />
      </Form.Item>
      <Image src={image} />
      <Form.Item style={{ marginLeft: 150 }} className="mt-3">
        <Button htmlType="submit" type="primary">
          SAVE
        </Button>
      </Form.Item>
    </Form>
  );
}
