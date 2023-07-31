import React, { useState, useEffect } from "react";
import { baseurl } from "../../../configurations";
import { useLocation, useNavigate } from "react-router-dom";
import video from "../../assets/video.svg";
import pdf from "../../assets/pdf.svg";
import audio from "../../assets/audio.svg";

export default function CourseTypes() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // New state for submit loading
  const [isLoadingFetch, setIsLoadingFetch] = useState(true); // New state for fetch loading

  // Function to fetch data from the endpoint
  useEffect(() => {
    fetchData();
  }, []);

  const location = useLocation();
  const courseID = location.state.data.courseid;

  const navigate = useNavigate();

  const handleTypesClick = (typesID) => {
    const data = {
      typesid: typesID,
    };
    navigate("/course_categories", {
      state: { data },
    });
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedType) {
      alert("Please select a type before submitting.");
      return;
    }

    setIsLoadingSubmit(true); // Set loading state when submitting
    // Perform the post request here using 'selectedType'
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL for the post request
    const data = {
      contenttype: selectedType,
      course: courseID,
    };

    fetch(baseurl + "admin/insert_types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post request success:", data);
        // Refresh the page after successful post request
        fetchData();
      })
      .catch((error) => console.error("Error sending post request:", error))
      .finally(() => {
        setIsLoadingSubmit(false); // Reset loading state when submit request is complete
      });
  };

  const fetchData = () => {
    setIsLoadingFetch(true); // Set loading state when fetching data
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
    fetch(baseurl + "admin/list_types/" + courseID)
      .then((response) => response.json())
      .then((data) => setTypes(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        setIsLoadingFetch(false); // Reset loading state when fetch request is complete
      });
  };

  return (
    <div className="container">
      <h1 className="color-main">Course Types</h1>
      <div className="row mt-3">
        <div className="col-4">
          {/* Select option div */}
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">Select a type</option>
            <option value="1">Video</option>
            <option value="2">PDF</option>
            <option value="3">Audio</option>
          </select>
          <button
            className="btn-green-go"
            onClick={handleSubmit}
            disabled={isLoadingSubmit}
          >
            {isLoadingSubmit ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
      {isLoadingFetch ? (
        <div>Loading...</div>
      ) : (
        <div className="row mt-3">
          {types.map((type) => (
            <div key={type.id} className="col-3 user-item">
              <div className="container">
                <div className="row">
                  <div className="col-5">
                    <div>
                      {type.contenttype == 1 ? (
                        <img
                          className="img-width-type"
                          src={video}
                          alt="Video"
                        ></img>
                      ) : type.contenttype == 2 ? (
                        <img
                          className="img-width-type"
                          src={pdf}
                          alt="PDF"
                        ></img>
                      ) : (
                        <img
                          className="img-width-type"
                          src={audio}
                          alt="Audio"
                        ></img>
                      )}
                    </div>
                  </div>
                  <div className="col-7 color-title">
                    {type.contenttype == 1 ? (
                      <>Video</>
                    ) : type.contenttype == 2 ? (
                      <>PDF</>
                    ) : (
                      <>Audio</>
                    )}
                    <div className="mt-2">
                      <button
                        className="btn-green-go"
                        onClick={() => handleTypesClick(type.id)}
                      >
                        Categories
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
