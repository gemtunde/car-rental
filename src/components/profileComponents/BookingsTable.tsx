"use client";
import { SetLoading } from "@/redux/loadersSlice";
import { Modal, Table, message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showCancelModel, setShowCancelModel] = useState<boolean>(false);

  //state
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      let url = "/api/bookings";
      if (!currentUser.isAdmin) {
        url = `/api/bookings?user=${currentUser._id}`;
      }
      const response = await axios.get(url);
      setBookings(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //columns
  const columns = [
    // { title: "Booking Id", dataIndex: "_id" },
    { title: "User", dataIndex: "user", render: (user: any) => user.name },
    { title: "Car", dataIndex: "car", render: (car: any) => car.name },
    { title: "Total Hours", dataIndex: "totalHours" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: "From (Date)",
      dataIndex: "fromSlot",
      render: (fromSlot: Date) => moment(fromSlot).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "To (Date)",
      dataIndex: "toSlot",
      render: (toSlot: Date) => moment(toSlot).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      render: (record: any) => (
        <div>
          {record.status === "approved" && (
            <span
              onClick={() => {
                setSelectedBooking(record);
                setShowCancelModel(true);
              }}
            >
              Cancel
            </span>
          )}
        </div>
      ),
    },
  ];

  //cancel booking
  const onCancelBooking = async () => {
    try {
      dispatch(SetLoading(true));
      const payload = {
        status: "rejected",
      };
      const response = await axios.put(
        `/api/bookings/${selectedBooking._id}`,
        payload
      );
      message.success(response.data.message);
      getData();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <Table columns={columns} dataSource={bookings} />

      {showCancelModel && (
        <Modal
          open={showCancelModel}
          onCancel={() => setShowCancelModel(false)}
          title={`Cancel Booking for ${selectedBooking?.car?.name}`}
          okText="Cancel Booking"
          cancelText="Close"
          onOk={onCancelBooking}
        >
          <span>
            Are you sure you want to cancel booking :{" "}
            {selectedBooking?.car?.name}
          </span>
        </Modal>
      )}
    </div>
  );
};

export default BookingsTable;
