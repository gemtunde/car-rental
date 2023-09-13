"use client";
import { Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const CarInformation = ({ car }: any) => {
  const router = useRouter();
  return (
    <div>
      <Row justify="center">
        <Col span={16} className="card p-5 flex flex-col gap-5">
          <h1 className="text-xl">{car?.name}</h1>
          <img src={car.carImage} alt="" height="500" width="100%" />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>
                <b>Brand:</b>
              </span>
              <span>{car?.brand}</span>
            </div>

            <div className="flex justify-between">
              <span>
                <b>Fuel Type:</b>
              </span>
              <span>{car?.fuelType}</span>
            </div>

            <div className="flex justify-between">
              <span>
                <b>Seating Capacity:</b>
              </span>
              <span>{car?.seatingCapacity}</span>
            </div>

            <div className="flex justify-between">
              <span>
                <b>Rent Per Hour:</b>
              </span>
              <span>{car?.rentPerHour}</span>
            </div>

            <div className="flex justify-end gap-5 my-10">
              <Button
                type="default"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </Button>
              <Button type="primary">Book Now</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CarInformation;
