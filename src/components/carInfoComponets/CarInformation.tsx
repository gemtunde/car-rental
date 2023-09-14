"use client";
import { Button, Col, Row, DatePicker, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import axios from "axios";

//this works only for frontend
import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;

const CarInformation = ({ car }: any) => {
  //date or slot availability
  const [isSlotAvailable, setIsSlotAvailable] = useState<Boolean>(false);

  //date range picker values
  const [fromSlot, setFromSlot] = useState<any>(null);
  const [toSlot, setToSlot] = useState<any>(null);

  //navigation
  const router = useRouter();

  //state
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  //book now
  const bookNow = async (token: any) => {
    const payload = {
      car: car._id,
      user: currentUser._id,
      fromSlot,
      toSlot,
      totalHours: moment(toSlot).diff(moment(fromSlot), "hours"),
      totalAmount:
        moment(toSlot).diff(moment(fromSlot), "hours") *
        Number(car?.rentPerHour),
      token,
    };
    //console.log("payload", payload);
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/bookings", payload);
      message.success(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  //if the date changes, set is slot available to false to start recalculation again
  useEffect(() => {
    setIsSlotAvailable(false);
  }, [fromSlot, toSlot]);

  //date or slot availability
  const checkAvailability = async () => {
    const payload = {
      car: car._id,
      fromSlot,
      toSlot,
    };
    try {
      dispatch(SetLoading(true));
      const response: any = await axios.post("/api/checkAvailability", payload);
      if (response.data.success) {
        message.success("slot available");
        setIsSlotAvailable(true);
      } else {
        throw new Error("slot not available");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <Row justify="center">
        <Col span={16} className="card p-5 flex flex-col gap-5">
          <h1 className="text-xl">{car?.name}</h1>
          <img src={car.carImage} alt="" height="350" width="100%" />

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

            <hr />
            <div className="flex justify-center gap-5">
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value: any) => {
                  setFromSlot(value[0]?.toDate());
                  setToSlot(value[1]?.toDate());
                }}
                disabledDate={(current: any) => {
                  return current && current < moment().endOf("day");
                }}
              />
            </div>
            <hr />
            {fromSlot && toSlot && (
              <>
                <div className="flex flex-col items-center justify-between">
                  <h1 className="text-md">
                    Total Hours :{" "}
                    {moment(toSlot).diff(moment(fromSlot), "hours")}
                  </h1>
                  <h1 className="text-md">
                    Total Amount : N
                    {moment(toSlot).diff(moment(fromSlot), "hours") *
                      Number(car?.rentPerHour)}
                    .00
                  </h1>
                </div>
                <hr />
              </>
            )}

            <div className="flex justify-end gap-5 my-10">
              <Button
                type="primary"
                onClick={checkAvailability}
                disabled={!fromSlot && !toSlot}
              >
                Check Availability
              </Button>
              <Button
                type="default"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </Button>
              <StripeCheckout
                stripeKey="pk_test_51HyacDJi1PTzZZm5a50YAgBwOdPKDsJu3yZosvpfgAcu2wivromrWHPwgvT2OzeveW3cfx0xuTTTPqQRNTpGHzuT00hXsMPUes"
                token={bookNow}
                currency="USD"
                key={process.env.STRIPE_PUBLIC_KEY}
                amount={
                  moment(toSlot).diff(moment(fromSlot), "hours") *
                  Number(car?.rentPerHour) *
                  100
                }
                shippingAddress
              >
                <Button
                  type="primary"
                  disabled={!fromSlot || !toSlot || !isSlotAvailable}
                  // onClick={bookNow}
                >
                  Book Now
                </Button>
              </StripeCheckout>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CarInformation;
