import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Radio, Select, Password } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAddUserApi,
  fetchInfomationApi,
  fetchUpdateAdminApi,
} from "services/user";
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

  // hàm submit
  const handleSave = async (values) => {
    if (params.taiKhoan) {
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
      <Form.Item
        label="Tài khoản"
        name="taiKhoan"
        validateTrigger={["onChange"]}
        rules={[
          { required: true, message: "Tài khoản không được bỏ trống" },
          {
            validator: (rules, value) => {
              if (value.length < 6 || value.length > 10) {
                return Promise.reject("Tài khoản phải từ 6 - 10 ký tự");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Họ tên"
        name="hoTen"
        validateTrigger={["onChange"]}
        rules={[
          { required: true, message: "Họ tên không được bỏ trống" },
          {
            pattern:
              "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
              "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
              "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            message: "Họ tên không đúng định dạng",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        validateTrigger={["onChange"]}
        rules={[
          { required: true, message: "Email không được bỏ trống" },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email không đúng dịnh dạng",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="soDT"
        validateTrigger={["onChange"]}
        rules={[
          { required: true, message: "Số điện thoại không được bỏ trống" },
          {
            pattern: /^[0-9]+$/,
            message: "Số điện thoại không đúng định dạng",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="matKhau"
        validateTrigger={["onChange"]}
        type="password"
        rules={[
          { required: true, message: "Mật khẩu không được bỏ trống" },
          {
            pattern:
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
            message:
              "Mật khẩu cần ít nhất 1 chữ viết hoa và 1 ký tự đặc biệt và số",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="maNhom"
        label="Mã nhóm"
        validateTrigger={["onChange"]}
        rules={[{ required: true, message: "Vui lòng chọn mã nhóm" }]}
      >
        <Select>
          <Option value="GP01">GP01</Option>
          <Option value="GP02">GP02</Option>
          <Option value="GP03">GP03</Option>
          <Option value="GP04">GP04</Option>
          <Option value="GP05">GP05</Option>
          <Option value="GP06">GP06</Option>
          <Option value="GP07">GP07</Option>
          <Option value="GP08">GP08</Option>
          <Option value="GP09">GP09</Option>
          <Option value="GP10">GP10</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="maLoaiNguoiDung"
        label="Loại người dùng"
        validateTrigger={["onChange"]}
        rules={[{ required: true, message: "Vui lòng chọn loại người dùng" }]}
      >
        <Select>
          <Option value="QuanTri">QuanTri</Option>
          <Option value="KhachHang">KhachHang</Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ marginLeft: 150 }} className="mt-3" shouldUpdate>
        {() => {
          return (
            <Button
              htmlType="submit"
              type="primary"
              disabled={
                !form.isFieldsTouched() ||
                form.getFieldsError().some((ele) => ele.errors.length > 0)
              }
            >
              SAVE
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
}
