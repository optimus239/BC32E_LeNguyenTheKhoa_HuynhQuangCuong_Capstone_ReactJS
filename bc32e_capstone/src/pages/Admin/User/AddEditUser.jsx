import React, { useEffect, useState } from "react";
import { Button, Select, Form, Input } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  capNhatThongTinNguoiDung,
  layThongTinNguoiDung,
  themNguoiDung,
  useQuanLyNguoiDung,
} from "../../../store/quanLyNguoiDung";
import { useNavigate, useParams } from "react-router-dom";
const AddEditUser = () => {
  const [form] = Form.useForm();

  const [maLoaiNguoiDung, setMaLoaiNguoiDung] = useState([]);

  const dispatch = useDispatch();

  // Get user's id by useParams
  const params = useParams();

  // declare defaultValues of Form
  const defaultValues = {
    maNhom: "GP13",
    maLoaiNguoiDung: "KhachHang",
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
  };

  let { userDetail } = useQuanLyNguoiDung();
  if (!params.iduser) {
    userDetail = [];
  }

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      try {
        let result = await axios({
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
          method: "GET",
          headers: {
            TokenCyberSoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
          },
        });
        setMaLoaiNguoiDung(result.data.content);
      } catch (error) {
        console.log("error: ", error.response.data);
      }
    };
    // call the function
    fetchData();

    // For edit user
    if (params.iduser) {
      dispatch(layThongTinNguoiDung(params.iduser));
    }
  }, []);

  // Display user'info if edit
  useEffect(() => {
    form.setFieldsValue(params.iduser ? userDetail : defaultValues);
  }, [userDetail]);

  // Select
  const { Option } = Select;
  const handleChange = (value) => {};

  // Submit
  const onFinish = (values) => {
    if (!params.iduser) {
      return dispatch(themNguoiDung(values));
    }
    return dispatch(capNhatThongTinNguoiDung(values));
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div>
      <h3>{params.iduser ? "C???p nh???t ng?????i d??ng:" : "Th??m ng?????i d??ng:"}</h3>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={defaultValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="T??i Kho???n"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??i kho???n!",
            },
          ]}
        >
          <Input disabled={params.iduser ? true : false} />
        </Form.Item>

        <Form.Item
          label="M???t Kh???u"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p m???t kh???u!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="H??? T??n"
          name="hoTen"
          rules={[
            {
              required: true,
              message: `H??? t??n kh??ng ???????c b??? tr???ng`,
            },
            {
              pattern:
                /^[a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s\W|_]+$/,
              message: "H??? t??n ph???i l?? ch???",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p Email!",
            },
            {
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email kh??ng ????ng ?????nh d???ng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="S??? ??i???n Tho???i"
          name="soDT"
          rules={[
            {
              required: true,
              message: `S?? ??i???n tho???i kh??ng ???????c b??? tr???ng`,
            },
            {
              pattern: /^[]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/,
              message: `S??? ??i???n tho???i ph???i l?? s??? v?? c?? 10 s???`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="M?? Nh??m" name="maNhom">
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="GP00">GP00</Option>
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
            <Option value="GP11">GP11</Option>
            <Option value="GP12">GP12</Option>
            <Option value="GP13">GP13</Option>
          </Select>
        </Form.Item>

        <Form.Item label="M?? Lo???i Ng?????i D??ng" name="maLoaiNguoiDung">
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {maLoaiNguoiDung.map((item, index) => (
              <Option key={index} value={item.maLoaiNguoiDung}>
                {item.tenLoai}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {params.iduser ? "C???p nh???t" : "Th??m"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditUser;
