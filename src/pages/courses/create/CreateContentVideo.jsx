import React, { useState } from "react";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../../../configurations";

export default function CreateContentVideo() {
  const location = useLocation();
  const categories = location.state.data.categories;

  const [formData, setFormData] = useState({
    title: "",
    length: "",
    visibility: 1,
    url: "",
    description: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleVisibilityChange = (e) => {
    const visibilityValue = parseInt(e.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      visibility: visibilityValue,
    }));
  };

  const handleThumbnailChange = (e) => {
    const url = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      url: url,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the form data to be sent
    const { title, length, visibility, url, description } = formData;
    const dataToSend = {
      title,
      length,
      visibility,
      url,
      description,
      categories: categories,
    };

    // Send the POST request
    axios
      .post(baseurl + "admin/create_video", dataToSend)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Reset the form and loading state after successful submission
        setFormData({
          title: "",
          length: "",
          visibility: 1,
          url: "",
          description: "",
        });
        setLoading(false);
        navigate("/courses");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2 className="color-main">Create Video Content</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mt-2">
            <div>
              {" "}
              <label className="color-title" htmlFor="title">
                Title
              </label>
            </div>
            <div>
              <input
                className="input-width input-data"
                type="text"
                autoComplete="off"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-6 mt-2">
            <div>
              {" "}
              <label className="color-title" htmlFor="length">
                Duration
              </label>
            </div>
            <div>
              <input
                className="input-width input-data"
                type="text"
                autoComplete="off"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            <div>
              <div>
                {" "}
                <label className="color-title" htmlFor="url">
                  URL
                </label>
              </div>
              <input
                className="input-width-100 input-data"
                type={"text"}
                autoComplete="off"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleThumbnailChange}
                required
              />
              {formData.url && (
                <video
                  controls
                  src={formData.url}
                  alt="Thumbnail Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              )}
            </div>
          </div>

          <div className="col-12 mt-2">
            <div>
              {" "}
              <label className="color-title" htmlFor="description">
                Description
              </label>
            </div>
            <SunEditor
              setOptions={{
                buttonList: [
                  ["font", "fontSize", "formatBlock"],
                  ["bold", "underline", "italic", "strike", "removeFormat"],
                  ["align", "horizontalRule", "list"],
                  ["link", "image", "video"],
                ],
              }}
              onChange={(value) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  description: value,
                }))
              }
            />
          </div>
          {/* Add a loading message while the form is being submitted */}
          {loading && <p>Loading...</p>}
          <button className="mt-2" type="submit" disabled={loading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
