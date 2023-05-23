import axios from "axios";
const base64 = require("base-64");

export const paypalbaseUrl = "https://api-m.sandbox.paypal.com";

const clientId =
  "AR_5-gaKY86p2EEM1drW4hOs3YlQ8A0ugKJaSn6mno6S7V_LwdqL-NZ1oOSNzk3d9bLsXfzCHX5fCUYM";
const secretKey =
  "EAOlY1fTOA8eT0cP4JacXz7tY9xF-O4Yd5cAB9v-1kcPjK8CFR7FhHR_Mq9-Da1G1u5fStmBcatLCZ8l";

// const orderDetails = {
//   intent: "CAPTURE",
//   purchase_units: [
//     {
//       items: [
//         {
//           name: "Seat Booking",
//           description: "Booking ID  TBAXH85TWN",
//           quantity: "1",
//           unit_amount: {
//             currency_code: "USD",
//             value: "2",
//           },
//         },
//       ],
//       amount: {
//         currency_code: "USD",
//         value: "2",
//         breakdown: {
//           item_total: {
//             currency_code: "USD",
//             value: "2",
//           },
//         },
//       },
//     },
//   ],
//   application_context: {
//     return_url: "https://example.com/return",
//     cancel_url: "https://example.com/cancel",
//   },
// };

export const generateToken = () => {
  const credentials = base64.encode(`${clientId}:${secretKey}`);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${credentials}`,
  };

  const requestBody = "grant_type=client_credentials";

  return new Promise((resolve, reject) => {
    axios
      .post(`${paypalbaseUrl}/v1/oauth2/token`, requestBody, { headers })
      .then((response) => response.data)
      .then((result) => {
        // console.log("result is ", result);
        const { access_token } = result;
        resolve(access_token);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const createOrder = (token, orderDetails) => {
  // const credentials = base64.encode(`${clientId}:${secretKey}`);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestBody = JSON.stringify(orderDetails);

  return new Promise((resolve, reject) => {
    axios
      .post(`${paypalbaseUrl}/v2/checkout/orders`, requestBody, { headers })
      .then((response) => response.data)
      .then((result) => {
        console.log("result is ", result);
        // const { access_t } = result;
        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const captureOrder = (id, token) => {
  // const credentials = base64.encode(`${clientId}:${secretKey}`);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestBody = "grant_type=client_credentials";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${paypalbaseUrl}/v2/checkout/orders/${id}/capture`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // const { access_t } = result;
        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
