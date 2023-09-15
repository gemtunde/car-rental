"use client";
import React from "react";
import { Form, Button } from "antd";
import Link from "next/link";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

const General = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      if (values.password === values.confirmPassword) {
        const response = await axios.put(
          `/api/users/${currentUser._id}`,
          values
        );
        message.success(response.data.message);
      } else {
        message.error("Password does not match");
      }
      //router.push("/login");
    } catch (error: any) {
      message.error(
        error.reponse.data.message || error.message || "something went wrong"
      );
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-450 card p-5 bg-white">
        <Form layout="vertical" onFinish={onFinish} initialValues={currentUser}>
          <h1 className="text-md uppercase">
            Update User - {currentUser.name}
          </h1>
          <div className="divider"></div>
          <div className="flex flex-col gap-5">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <input type="password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Confirm Password is required" },
              ]}
            >
              <input type="password" />
            </Form.Item>
            <Button type="primary" block htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default General;
