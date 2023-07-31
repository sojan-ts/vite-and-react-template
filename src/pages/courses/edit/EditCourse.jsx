import React, { useState } from "react";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { baseurl } from "../../../../configurations";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const course_data = location.state.data.coursedata;

  const [formData, setFormData] = useState({
    title: course_data.title,
    life: course_data.life,
    duration: course_data.duration,
    visibility: course_data.visibility,
    amount: course_data.amount,
    thumbnail: course_data.thumbnail,
    description: course_data.description,
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

  const handleThumbnailChange = (e) => {
    const thumbnail = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: thumbnail,
    }));

    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      thumbnail: thumbnail,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));

    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      description: value,
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
        baseurl + "admin/update_course_details/" + course_data.id,
        dataToSend
      )
      .then((response) => {
        console.log("Data sent successfully:", response.data);
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
      <h2 className="color-main">Edit Course</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4 mt-2">
            <div>
              <label className="color-title" htmlFor="title">
                Title :
              </label>
            </div>
            <div className="mt-2">
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

          <div className="col-4 mt-2">
            <div>
              <label className="color-title" htmlFor="life">
                Life :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width input-data"
                type="number"
                autoComplete="off"
                id="life"
                name="life"
                value={formData.life}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-4 mt-2">
            <div>
              <label className="color-title" htmlFor="duration">
                Duration :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width input-data"
                type="text"
                autoComplete="off"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-4 mt-2">
            <div>
              <label className="color-title">Visibility :</label>
              <div className="mt-2">
                <label htmlFor="visible" className="color-main">
                  <input
                    type="radio"
                    id="visible"
                    name="visibility"
                    value="1"
                    checked={formData.visibility === 1}
                    onChange={handleVisibilityChange}
                  />
                  Visible
                </label>
                <label htmlFor="invisible" className="color-main">
                  <input
                    type="radio"
                    id="invisible"
                    name="visibility"
                    value="2"
                    checked={formData.visibility === 2}
                    onChange={handleVisibilityChange}
                  />
                  Invisible
                </label>
              </div>
            </div>
          </div>

          <div className="col-4 mt-2">
            <div>
              <label className="color-title" htmlFor="amount">
                Amount :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width input-data"
                type="text"
                autoComplete="off"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            <div>
              <label className="color-title" htmlFor="thumbnail">
                Thumbnail URL :
              </label>
            </div>
            <div className="mt-2">
              <input
                className="input-width-100 input-data"
                type={"text"}
                autoComplete="off"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleThumbnailChange}
                required
              />
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              )}
            </div>
          </div>

          <div className="col-12 mt-2">
            <div>
              <label className="color-title" htmlFor="description">
                Description :
              </label>
            </div>
            <SunEditor
              className="mt-2"
              setOptions={{
                buttonList: [
                  ["font", "fontSize", "formatBlock"],
                  ["bold", "underline", "italic", "strike", "removeFormat"],
                  ["align", "horizontalRule", "list"],
                  ["link", "image", "video"],
                ],
              }}
              onChange={handleDescriptionChange}
              setContents={formData.description} // Set default content in SunEditor
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
