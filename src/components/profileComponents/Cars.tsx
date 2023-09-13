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
  const [selectedCar, setSelectedCar] = useState<any>(null);

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

  //delete car
  const deleteCar = async (id: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/cars/${id}`);
      message.success(response.data.message);
      getCars();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
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
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedCar(record);
              setShowCarFormModal(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteCar(record._id)}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setSelectedCar(null);
            setShowCarFormModal(true);
          }}
        >
          Add Car
        </Button>
      </div>
      <Table dataSource={cars} columns={columns} rowKey="_id" />
      {showCarFormModal && (
        <CarForm
          setShowCarFormModal={setShowCarFormModal}
          showCarFormModal={showCarFormModal}
          selectedCar={selectedCar}
          reloadData={getCars}
        />
      )}
    </div>
  );
};

export default Cars;
