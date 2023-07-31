import React, { useState } from "react";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { baseurl } from "../../../../configurations";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditCarousel() {
  const navigate = useNavigate();
  const location = useLocation();
  const carousel_data = location.state.data.carouseldata;

  const [formData, setFormData] = useState({
    title: carousel_data.title,
    img_url: carousel_data.img_url,
    url: carousel_data.url,
  });

  const [modifiedFields, setModifiedFields] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      [name]: value,
    }));
  };

  const handleVisibilityChange = (e) => {
    const visibilityValue = parseInt(e.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      visibility: visibilityValue,
    }));

    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      visibility: visibilityValue,
    }));
  };

  const handleimg_urlChange = (e) => {
    const img_url = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      img_url: img_url,
    }));

    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      img_url: img_url,
    }));
  };

  const handleurlChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      url: value,
    }));

    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      url: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the form data to be sent
    const dataToSend = { ...modifiedFields };

    // Send the PATCH request
    axios
      .patch(
        baseurl + "admin/update_carousel_details/" + carousel_data.id,
        dataToSend
      )
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        setLoading(false);
        navigate("/carousel");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2 className="color-main">Edit Carousel</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mt-2">
            <div>
              <label className="color-title" htmlFor="title">
                Title :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width-100 input-data"
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

          <div className="col-12 mt-2">
            <div>
              <label className="color-title" htmlFor="img_url">
                Banner URL :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width-100 input-data"
                type={"text"}
                autoComplete="off"
                id="img_url"
                name="img_url"
                value={formData.img_url}
                onChange={handleimg_urlChange}
                required
              />
              {formData.img_url && (
                <img
                  src={formData.img_url}
                  alt="img_url Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              )}
            </div>
          </div>

          <div className="col-12 mt-2">
            <div>
              {" "}
              <label className="color-title" htmlFor="description">
                Redirection URL :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width-100 input-data"
                type="text"
                autoComplete="off"
                id="title"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Add a loading message while the form is being submitted */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              className="mt-2 btn-green-go"
              type="submit"
              disabled={loading}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
