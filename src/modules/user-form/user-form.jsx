import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Radio,
  Select,
} from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { fetchAddUserApi, fetchInfomationApi, fetchUpdateAdminApi } from "services/user";
import { Option } from "antd/lib/mentions";
import { useAsync } from "hooks/useAsync";

export default function UserForm() {
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

    //render dữ liệu khi edit
    const { state: infoUser = [] } = useAsync({
      service: () => fetchInfomationApi(params.taiKhoan),
      dependencies: [params.taiKhoan],
      condition: !!params.taiKhoan,
    });
    console.log(infoUser);

    useEffect(() => {
      if (infoUser) {
        form.setFieldsValue({
          ...infoUser,
        });
      }
    }, [infoUser]);

  // hàm submit thêm phim
  const handleSave = async (values) => {
    if(params.taiKhoan) {
        try {
            await fetchUpdateAdminApi(values);
            notification.success({
              description: "Thành công !!!",
            });
            navigate("/admin/user-management");
          } catch (errors) {
            notification.warning({
              description: errors.response.data.content,
            });
          }
    } else {
        try {
            await fetchAddUserApi(values);
            notification.success({
              description: "Thành công !!!",
            });
            navigate("/admin/user-management");
          } catch (errors) {
            notification.warning({
              description: errors.response.data.content,
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
        taiKhoan: "",
        hoTen: "",
        matKhau: "",
        email: "",
        soDT: "",
        maNhom: "",
        maLoaiNguoiDung: "",
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
      <Form.Item label="Tài khoản" name="taiKhoan">
        <Input />
      </Form.Item>
      <Form.Item label="Họ tên" name="hoTen">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="soDT">
        <Input />
      </Form.Item>
      <Form.Item label="Mật khẩu" name="matKhau">
        <Input />
      </Form.Item>
      <Form.Item label="Mã nhóm" name="maNhom">
        <Input />
      </Form.Item>
      <Form.Item name="maLoaiNguoiDung" label="Loại người dùng">
        <Select placeholder="Chọn loại người dùng">
          <Option value="QuanTri">QuanTri</Option>
          <Option value="KhachHang">KhachHang</Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ marginLeft: 150 }} className="mt-3">
        <Button htmlType="submit" type="primary">
          SAVE
        </Button>
      </Form.Item>
    </Form>
  );
}
