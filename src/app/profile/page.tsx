"use client";
import BookingsTable from "@/components/profileComponents/BookingsTable";
import Cars from "@/components/profileComponents/Cars";
import General from "@/components/profileComponents/General";
import Users from "@/components/profileComponents/Users";
import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.users);
  return (
    currentUser && (
      <div className="p-5">
        <h1 className="text-md"> Profile : {currentUser?.email} </h1>
        <h1 className="text-md">
          Status : {currentUser?.isAdmin ? "Admin" : "User"}
        </h1>

        <Tabs defaultActiveKey="1">
          {/* tabs for normal users */}
          {!currentUser.isAdmin && (
            <>
              <Tabs.TabPane tab="General" key="1">
                <General />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Bookings" key="2">
                <BookingsTable />
              </Tabs.TabPane>
            </>
          )}

          {/* tabs for Admin */}
          {currentUser.isAdmin && (
            <>
              <Tabs.TabPane tab="General" key="1">
                <General />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cars" key="2">
                <Cars />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Users" key="3">
                <Users />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Bookings" key="4">
                <BookingsTable />
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    )
  );
};

export default Profile;
