"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import Spinner from "./Spinner";
import { SetLoading } from "@/redux/loadersSlice";

const LayoutProvider = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  //dispatch to state
  const dispatch = useDispatch();

  //access the state
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");

      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  //logout
  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/logout");
      message.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
    dispatch(SetLoading(false));
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      getCurrentUser();
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {loading && <Spinner />}
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#ac0101",
              borderRadius: 2,

              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          {pathname !== "/login" && pathname !== "/register" && (
            <div className="header bg-primary flex p-3 items-center justify-between">
              <h1
                className="text-xl text-white uppercase"
                onClick={() => router.push("/")}
              >
                GemTunde-Cars
              </h1>
              <div className="flex gap-5 items-center">
                <h1
                  className="text-md text-white underline"
                  onClick={() => router.push("/profile")}
                >
                  {currentUser?.name}
                </h1>
                <i
                  onClick={onLogout}
                  className="ri-logout-box-r-line text-white"
                ></i>
              </div>
            </div>
          )}

          <div>{children}</div>
        </ConfigProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
