"use client";
import React from "react";
import { ConfigProvider } from "antd";

const LayoutProvider = ({ children }: any) => {
  return (
    <html lang="en">
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
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
