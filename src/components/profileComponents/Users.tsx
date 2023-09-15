"use client";
import { SetLoading } from "@/redux/loadersSlice";
import { Table, message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);

  //state
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(SetLoading(true));
      let url = "/api/users";
      const response = await axios.get(url);
      setUsers(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //columns
  const columns = [
    // { title: "Booking Id", dataIndex: "_id" },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: any, record: any) => (
        <select
          value={isActive}
          onChange={(e) => onUserUpdate(e.target.value, record._id)}
        >
          <option value={true}> Active</option>
          <option value={false}> In-Active</option>
        </select>
      ),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean) => (isAdmin ? "Admin" : "User"),
    },

    {
      title: "Date Joined",
      dataIndex: "createdAt",
      render: (createdAt: Date) =>
        moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
  ];

  //on User Update Active status
  const onUserUpdate = async (isActive: any, id: any) => {
    try {
      dispatch(SetLoading(true));
      const payload = {
        isActive: isActive,
      };
      const response = await axios.put(`/api/users/${id}`, payload);
      message.success(response.data.message);
      getUsers();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default Users;
