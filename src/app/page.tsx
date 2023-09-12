import React from "react";

//import axios from "axios";
//import { cookies } from "next/headers";

//server side rendring ...its not needed here.. but this how you call it
// export async function getCurrentUser() {
//   try {
//     const cookeStore = cookies();
//     const token = cookeStore.get("token")?.value;

//     const response = await axios.get(
//       `${process.env.domain}/api/users/currentuser`,
//       {
//         headers: {
//           Cookie: `token=${token}`,
//         },
//       }
//     );
//     return response.data.data;
//   } catch (error: any) {
//     console.log(error);
//     return error.message;
//   }
// }

export default async function Home() {
  //server side calling
  //const currentUser = await getCurrentUser();
  return (
    <div>
      <h2>car rental</h2>
      {/* server side rendering.... not needed here for now */}
      {/* {currentUser && <h2>welcome : {currentUser.email}</h2>} */}
    </div>
  );
}
