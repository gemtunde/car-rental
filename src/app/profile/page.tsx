"use client";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.users);
  return <div>Profile : {currentUser?.email}</div>;
};

export default Profile;
