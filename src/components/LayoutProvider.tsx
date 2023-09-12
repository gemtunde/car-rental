"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

const LayoutProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      setUser(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
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
              <h1 className="text-xl text-white uppercase">GemTunde-Cars</h1>
              <div className="flex gap-5 items-center">
                <h1
                  className="text-md text-white underline"
                  onClick={() => router.push("/profile")}
                >
                  {user?.name}
                </h1>
                <i className="ri-logout-box-r-line text-white"></i>
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
