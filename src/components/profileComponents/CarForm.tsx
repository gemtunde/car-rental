import { SetLoading } from "@/redux/loadersSlice";
import { Col, Form, Modal, Row, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const CarForm = ({ showCarFormModal, setShowCarFormModal }: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //submit form
  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/cars", values);
      message.success(response.data.message);
      setShowCarFormModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <Modal
      open={showCarFormModal}
      onCancel={() => setShowCarFormModal(false)}
      centered
      okText="Save"
      onOk={() => {
        form.submit();
      }}
    >
      <h1 className="text-center text-xl uppercase">Add a new Car</h1>
      <Form
        layout="vertical"
        className="flex flex-col gap-5"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Car Name"
          name="name"
          rules={[{ required: true, message: "Car Name is required" }]}
        >
          <input type="text" />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Brand Name"
              name="brand"
              rules={[{ required: true, message: "Brand Name is required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Fuel Type"
              name="fuelType"
              rules={[{ required: true, message: "Fuel type is required" }]}
            >
              <select>
                <option>Please Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Rent Per Hour"
              name="rentPerHour"
              rules={[{ required: true, message: "Rent Per Hour is required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Seating Capacity"
              name="seatingCapacity"
              rules={[
                { required: true, message: "Seating Capacity is required" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Car Image"
          name="carImage"
          rules={[{ required: true, message: "Car Image is required" }]}
        >
          <input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CarForm;
