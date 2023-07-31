import React, { useState } from "react";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { baseurl } from "../../../../configurations";
import { useNavigate } from "react-router-dom";

export default function CreateCarousel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    img_url: "",
    url: "",
  });

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

  const handleimg_urlChange = (e) => {
    const img_url = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      img_url: img_url,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the form data to be sent
    const { title, img_url, url } = formData;
    const dataToSend = {
      title,
      img_url,
      url,
    };

    // Send the POST request
    axios
      .post(baseurl + "admin/create_carousel", dataToSend)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Reset the form and loading state after successful submission
        setFormData({
          title: "",
          life: "",
          duration: "",
          visibility: 1,
          amount: "",
          img_url: "",
          description: "",
        });
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
      <h2 className="color-main">Create Carousel</h2>

      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mt-2">
            <div>
              {" "}
              <label className="color-title" htmlFor="title">
                Title :
              </label>
            </div>
            <div>
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
              <div>
                {" "}
                <label className="color-title" htmlFor="img_url">
                  Banner URL :
                </label>
              </div>
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
            <div>
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
