import React, { useState } from "react";
import "./CarRegister.scss";
import { LeftOutlined } from "@ant-design/icons";
import {
  MdAirlineSeatReclineExtra,
  MdBluetoothSearching,
  MdCameraRear,
  MdGpsFixed,
  MdOutlineSensors,
  MdTireRepair,
  MdVideoCameraBack,
} from "react-icons/md";
import { Card, Form, Button, Input, Image, Flex } from "antd";
import ToggleButton from "../../common/components/Button/toggleButtonProps";
import { FaCamera, FaMapMarkedAlt, FaTruckPickup } from "react-icons/fa";
import { TbView360Number } from "react-icons/tb";
import { IoIosSpeedometer } from "react-icons/io";
import { GiFlatTire, GiTripleGate } from "react-icons/gi";
import { CgUsb } from "react-icons/cg";
import { LuMonitorPlay } from "react-icons/lu";
import { FaCarBurst } from "react-icons/fa6";

interface ToggleButton {
  id: string;
  icon: React.ReactNode;
  name: string;
}

const toggleButtons: ToggleButton[] = [
  {
    id: "map",
    icon: <FaMapMarkedAlt />,
    name: "Bản đồ",
  },
  {
    id: "bluetooth",
    icon: <MdBluetoothSearching />,
    name: "Bluetooth",
  },
  {
    id: "camera360",
    icon: <TbView360Number />,
    name: "Camera 360",
  },
  {
    id: "sideCamera",
    icon: <FaCamera />,
    name: "Camera cập lề",
  },
  {
    id: "dashCamera",
    icon: <MdVideoCameraBack />,
    name: "Camera hành trình",
  },
  {
    id: "rearCamera",
    icon: <MdCameraRear />,
    name: "Camera lùi",
  },
  {
    id: "tireSensor",
    icon: <MdTireRepair />,
    name: "Cảm biến lốp",
  },
  {
    id: "collisionSensor",
    icon: <MdOutlineSensors />,
    name: "Cảm biến va chạm",
  },
  {
    id: "speedWarning",
    icon: <IoIosSpeedometer />,
    name: "Cảnh báo tốc độ",
  },
  // {
  //   id: "5",
  //   icon: <GiRaceCar />,
  //   name: "Cửa sổ trời",
  // },
  {
    id: "gps",
    icon: <MdGpsFixed />,
    name: "Định vị GPS",
  },
  {
    id: "childSeat",
    icon: <MdAirlineSeatReclineExtra />,
    name: "Ghế trẻ em",
  },
  {
    id: "usb",
    icon: <CgUsb />,
    name: "Khe cắm USB",
  },
  {
    id: "spareTire",
    icon: <GiFlatTire />,
    name: "Lốp dự phòng",
  },
  {
    id: "dvdScreen",
    icon: <LuMonitorPlay />,
    name: "Màn hình DVD",
  },
  {
    id: "truckCover",
    icon: <FaTruckPickup />,
    name: "Lắp thùng xe bán tải",
  },
  {
    id: "etc",
    icon: <GiTripleGate />,
    name: "ETC",
  },
  {
    id: "airbags",
    icon: <FaCarBurst />,
    name: "Túi khí an toàn",
  },
];

const CarRegister = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [featureList, setFeatureList] = useState<string[]>([]);

  const handleToggle = (isOn: boolean, id: string) => {
    console.log(isOn, id);
    // kiểm tra xem isOn là true và id chưa có trong mảng featureList
    if (isOn && !featureList.includes(id)) {
      const newFeatureList = [...featureList]; // copy ra 1 mảng mới
      newFeatureList.push(id); // thêm id vào cuối mảng
      setFeatureList(newFeatureList); // set lại dữ liệu
    }

    if (!isOn) {
      const newFeatureList = featureList.filter((item) => item !== id);
      setFeatureList(newFeatureList); // set lại dữ liệu
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Object.values(event.target.files as FileList);
    setSelectedFiles(files);

    if (files.length) {
      files.forEach((item) => {
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onloadend = () => {
          setPreview((preState) => preState.concat(reader.result as string));
        };
      });
    } else {
      setPreview([]);
    }
  };

  const onFinish = (values: unknown) => {
    const body = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ...values,
      imagePath: selectedFiles.map((item) => item.name),
      featureList: featureList,
    };
    console.log("Received values of form: ", body);
    // call API here
  };

  return (
    <div className="carregister-page">
      <div className="title">
        <p className="register-title">
          <span className="back-button">
            <button
              style={{
                backgroundColor: "#e0f4ff",
                color: "black",
                fontSize: "16px",
                marginRight: "300px",
                marginLeft: "200px",
              }}
            >
              <LeftOutlined />
              Quay lại
            </button>
          </span>
          Đăng ký xe
        </p>
      </div>
      <div className="carregister-card">
        <Card style={{ width: 850, height: 1800 }}>
          <div className="carregister-input">
            <Form
              className="carregister-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <h2>Biển số xe</h2>

              <div className="warning">
                <p>Lưu ý: Biển số không thể thay đổi sau khi đăng ký</p>
              </div>
              <Form.Item
                name="licensePlate"
                rules={[
                  {
                    required: true,
                    message: "Xin mời nhập vào biển số xe!",
                  },
                ]}
              >
                <Input style={{ width: "450px" }} />
              </Form.Item>

              <h2>Thông tin cơ bản</h2>
              <div className="warning">
                <p>
                  Lưu ý: Thông tin cơ bản không thể thay đổi sau khi đăng ký
                </p>
              </div>
              <div className="info-grid-container">
                <div className="grid-item">
                  <p>Hãng xe</p>
                  <Form.Item
                    name="make"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy chọn hãng xe!",
                      },
                    ]}
                  >
                    <Input className="carinfo-input" />
                  </Form.Item>
                </div>

                <div className="grid-item">
                  <p>Mẫu xe</p>
                  <Form.Item
                    name="model"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền mẫu xe vào!",
                      },
                    ]}
                  >
                    <Input className="carinfo-input" />
                  </Form.Item>
                </div>

                <div className="grid-item">
                  <p>Số ghế</p>
                  <Form.Item
                    name="seat"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền số ghế vào!",
                      },
                    ]}
                  >
                    <Input className="carinfo-input" />
                  </Form.Item>
                </div>

                <div className="grid-item">
                  <p>Năm sản xuất</p>
                  <Form.Item
                    name="year"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền năm sản xuất vào!",
                      },
                    ]}
                  >
                    <Input className="carinfo-input" />
                  </Form.Item>
                </div>

                <div className="grid-item">
                  <p>Truyền động</p>
                  <Form.Item
                    name="transmission"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền loại truyền động vào!",
                      },
                    ]}
                  >
                    <Input className="carinfo-input" />
                  </Form.Item>
                </div>

                <div className="grid-item">
                  <p>Loại nhiên liệu</p>
                  <Form.Item
                    name="fuel"
                    rules={[
                      {
                        required: true,
                        message: "Xin hãy điền loại nhiên liệu vào!",
                      },
                    ]}
                  >
                    <Input className="carinfo-input" />
                  </Form.Item>
                </div>
              </div>

              <h2>Đơn giá thuê</h2>

              <div style={{ width: "250px" }}>
                <p>
                  Đơn giá áp dụng cho tất cả các ngày Có thể tuỳ chỉnh cho các
                  ngày đặc biệt (cuối tuần, lễ, tết,...)
                </p>
              </div>
              <Form.Item
                name="cost"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập đơn giá!",
                  },
                ]}
              >
                <Input style={{ width: "250px" }} />
              </Form.Item>

              <h2>Địa chỉ xe</h2>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập địa chỉ xe!",
                  },
                ]}
              >
                <Input style={{ width: "800px" }} />
              </Form.Item>

              <h2>Mô tả</h2>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập mô tả!",
                  },
                ]}
              >
                <Input style={{ width: "800px", height: "80px" }} />
              </Form.Item>

              <h2>Tính năng</h2>
              <Form.Item
                name="feature"
                rules={[
                  {
                    // required: true,
                    message: "Xin hãy chọn tính năng!",
                  },
                ]}
              >
                <div className="toggle-grid-container">
                  {toggleButtons.map((button) => (
                    <div key={button.id} className="grid-item">
                      <ToggleButton
                        icon={button.icon}
                        name={button.name}
                        onToggle={(isOn) => handleToggle(isOn, button.id)}
                      />
                    </div>
                  ))}
                </div>
              </Form.Item>

              <h2>Hình ảnh</h2>
              <Form.Item
                name="image"
                rules={[
                  {
                    // required: true,
                    message: "Xin hãy chọn ảnh!",
                  },
                ]}
              >
                <label htmlFor="file-upload">Upload an image:</label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <Flex gap={20}>
                  {preview?.map((item) => (
                    <Image
                      key={item}
                      src={item}
                      alt="Preview"
                      width={200}
                      height={200}
                    />
                  ))}
                </Flex>
              </Form.Item>

              <Form.Item>
                <div className="button-container">
                  <Button
                    type="primary"
                    htmlType="reset"
                    className="cancel-button"
                  >
                    Reset
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-button"
                  >
                    Đăng ký
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CarRegister;
