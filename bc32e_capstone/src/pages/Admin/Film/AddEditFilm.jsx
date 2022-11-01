import React, { useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Form,
  Input,
  Rate,
  Upload,
  DatePicker,
  Switch,
} from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import {
  getMovieDetail,
  themPhimUploadHinh,
  updateMovie,
  useQuanLyPhim,
} from "../../../store/quanLyPhim";
import { capNhatThongTinNguoiDung } from "../../../store/quanLyNguoiDung";

const AddEditFilm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { movieDetail } = useQuanLyPhim();
  console.log("movieDetail: ", movieDetail);

  const defaultValues = {
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP13",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: true,
    hot: true,
    danhGia: 5,
    hinhAnh: null,
  };

  // Get movie's id by useParams
  const params = useParams();
  console.log("params: ", params.id);

  if (!params.id) {
    movieDetail = [];
  }

  // getmovieDetail
  useEffect(() => {
    if (params.id) {
      dispatch(getMovieDetail(params.id));
    }
  }, []);

  // Display movie'info if edit
  useEffect(() => {
    form.setFieldsValue(
      params.id
        ? {
            ...movieDetail,
            ngayKhoiChieu: moment(movieDetail?.ngayKhoiChieu),
            hinhAnh: null,
          }
        : defaultValues
    );
  }, [movieDetail]);

  // Select
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // Rate
  const handleRate = (value) => {
    console.log(`selected ${value} *`);
  };

  // Upload
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Datepicker
  const onChangeDate = (value, dateString) => {};
  const onOk = (value) => {};

  // Form submit
  const onFinish = (data) => {
    data.ngayKhoiChieu = moment(data.ngayKhoiChieu).format("DD-MM-YYYY");
    // data.danhGia = data.danhGia * 2;
    console.log("Success:", data);

    // Tạo đối tượng formdata
    let formData = new FormData();
    for (let key in data) {
      if (key !== "hinhAnh") {
        formData.append(key, data[key]);
      } else {
        if (data.hinhAnh !== null) {
          formData.append(
            "FILE",
            data.hinhAnh[0].originFileObj,
            data.hinhAnh[0].name
          );
        }
      }
    }
    if (!params.id) {
      dispatch(themPhimUploadHinh(formData));
    } else {
      dispatch(updateMovie(formData));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
        label="Tên Phim"
        name="tenPhim"
        rules={[
          {
            required: true,
            message: "Vui lòng không để trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Trailer"
        name="trailer"
        rules={[
          {
            required: true,
            message: "Vui lòng không để trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="moTa"
        rules={[
          {
            required: true,
            message: "Vui lòng không để trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Mã Nhóm" name="maNhom">
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

      <Form.Item label="Đánh Giá" name="danhGia">
        <Rate onChange={handleRate} allowHalf />
      </Form.Item>

      <Form.Item
        name="hinhAnh"
        label="Hình Ảnh"
        accept="image/jpeg, image/png"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          name="logo"
          action=""
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Ngày Khởi chiếu"
        name="ngayKhoiChieu"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày chiếu và giờ chiếu!",
          },
        ]}
      >
        <DatePicker
          label="ngayChieu"
          format="DD/MM/YYYY"
          onChange={onChangeDate}
          onOk={onOk}
          placeholder="Chọn ngày khởi chiếu"
        />
      </Form.Item>

      <Form.Item name="dangChieu" label="Đang Chiếu" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="sapChieu" label="Sắp Chiếu" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="hot" label="Hot" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEditFilm;
