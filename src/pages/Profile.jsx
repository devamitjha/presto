import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice"; // adjust path
import { getCustomerDetailsById } from "../services/userServices"; // adjust path

export default function Profile() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        if (customer?.customerUniqueId) {
          const response = await getCustomerDetailsById(customer.customerUniqueId);
          console.log(response);

          if (response.data) {
            dispatch(setCustomer(response.data)); // store in Redux & localStorage
          }
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [customer?.customerUniqueId, dispatch]);

  return (
    <div>
      <h1>Profile Page</h1>
      {customer ? (
        <div>
          <p>Name: {customer.firstName} {customer.lastName}</p>
          <p>Email: {customer.email}</p>
          <p>Mobile: {customer.mobile}</p>
        </div>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  );
}
