"use client";
import React from "react";
import { Form, Button } from "antd";
import Link from "next/link";
import { message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/users/register", values);
      message.success(response.data.message);
      // router.push("/login");
    } catch (error: any) {
      message.error(
        error.reponse.data.message || error.message || "something went wrong"
      );
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
            <Button type="primary" block htmlType="submit">
              Register
            </Button>

            <Link href="/login">Already have a account? Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
