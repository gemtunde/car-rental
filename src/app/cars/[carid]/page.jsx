import CarInformation from "@/components/carInfoComponets/CarInformation";
import axios from "axios";
import { cookies } from "next/headers";
import React from "react";

export async function getCar(carid) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await axios.get(
      `${process.env.domain}/api/cars/${carid}`,
      {
        headers: {
          Cookie: `token = ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return error.message;
  }
}

export default async function CardInfo({ params }) {
  const car = await getCar(params?.carid);
  return (
    car && (
      <div className="p-5">
        {/* car infos - {car?.name} */}
        <CarInformation car={car} />
      </div>
    )
  );
}
