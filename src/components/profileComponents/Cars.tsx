"use client";
import { Button, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import CarForm from "./CarForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

const Cars = () => {
  const [showCarFormModal, setShowCarFormModal] = useState<any>(false);
  const [cars, setCars] = useState<any>([]);

  const dispatch = useDispatch();

  const getCars = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/cars");
      setCars(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getCars();
  }, []);

  //table
  const columns = [
    {
      title: "Car Image",
      dataIndex: "carImage",
      render: (carImage: any) => (
        <img src={carImage} alt="car image" width="50" height="50" />
      ),
    },
    { title: "Car Name", dataIndex: "name" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Fuel Type", dataIndex: "fuelType" },
    { title: "Rent Per Hour", dataIndex: "rentPerHour" },
    { title: "Seating Capacity", dataIndex: "seatingCapacity" },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <i className="ri-pencil-line"></i>
          <i className="ri-delete-bin-line"></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowCarFormModal(true)}>
          Add Car
        </Button>
      </div>
      <Table dataSource={cars} columns={columns} rowKey="_id" />
      {showCarFormModal && (
        <CarForm
          setShowCarFormModal={setShowCarFormModal}
          showCarFormModal={showCarFormModal}
        />
      )}
    </div>
  );
};

export default Cars;
