import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineShopping,
} from "react-icons/ai";
import { baseurl } from "../../configurations";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = baseurl + "admin/gethomedash";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="color-main">Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-3 col-dash-001">
              <div className="container card-dash-001">
                <div className="row width-dash-001">
                  <div className="col-5">
                    <AiOutlineUser className="dash-ic-001" />
                  </div>
                  <div className="col-7 flx-dash-001">
                    <strong className="color-title">Total Users</strong>{" "}
                    <span className="color-main">{data.users}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 col-dash-001">
              <div className="container card-dash-001">
                <div className="row width-dash-001">
                  <div className="col-5 ">
                    <AiOutlineBook className="dash-ic-001" />
                  </div>
                  <div className="col-7 flx-dash-001">
                    <strong className="color-title">Total Courses</strong>
                    <span className="color-main">{data.courses}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 col-dash-001">
              <div className="container card-dash-001">
                <div className="row width-dash-001">
                  <div className="col-5">
                    <AiOutlineShopping className="dash-ic-001" />
                  </div>
                  <div className="col-7 flx-dash-001">
                    <strong className="color-title">Total Purchases</strong>{" "}
                    <span className="color-main">{data.purchases}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
