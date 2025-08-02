// src/components/StoreList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await axios.get("/data/store_data.csv", {
          responseType: "blob", // ensures proper handling of file
        });

        const reader = new FileReader();
        reader.onload = () => {
          const csvText = reader.result;
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              setStores(result.data);
            },
          });
        };         
        reader.readAsText(response.data);
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    loadCSV();
  }, []);
 console.log(stores);
  return (
    <div>
      <h2>Store List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>City</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Google Maps</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr key={index}>
              <td>{store.city}</td>
              <td>{store.store_location}</td>
              <td>{store.Phone}</td>
              <td>
                <a href={store.direction} target="_blank" rel="noopener noreferrer">
                  View Map
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
