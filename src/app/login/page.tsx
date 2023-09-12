"use client";
import React from "react";
import { Form, Button, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

const Login = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    // console.log(values);
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/login", values);
      message.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div className="flex bg-danger justify-center items-center h-screen">
      <div className="w-450 card p-5 bg-white">
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className="text-xl uppercase">Gemtunde-Cars</h1>
          <div className="divider"></div>
          <div className="flex flex-col gap-5">
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
            <Button type="default" block htmlType="submit">
              Login
            </Button>

            <Link href="/register">Don't have a account? Register</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
