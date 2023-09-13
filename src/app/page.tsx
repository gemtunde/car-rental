import React from "react";

import axios from "axios";
import { cookies } from "next/headers";
import CarsGrid from "@/components/homeComponents/CarsGrid";

//server side rendring is used here because not hooks is used here
export async function getCars() {
  try {
    const cookeStore = cookies();
    const token = cookeStore.get("token")?.value;

    const response = await axios.get(`${process.env.domain}/api/cars`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
}

export default async function Home() {
  //server side calling
  const cars = await getCars();
  return (
    <div className="p-5">
      {/* pass the value to a child component */}
      <CarsGrid cars={cars} />
    </div>
  );
}
