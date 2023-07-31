import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../../configurations";

export default function UserEnroll() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // Loading state for form submission
  const [formData, setFormData] = useState({
    course_id: "",
    amount: "",
    life: "",
    payment: "",
    description: "",
  });

  const navigate = useNavigate();

  const location = useLocation();
  const userID = location.state.data.userid;

  const handleactiveCourse = (courseID) => {
    // Show the form when the "activate course" button is clicked
    setIsFormVisible(true);

    // Populate form data with initial values if needed
    setFormData({
      course_id: courseID,
      amount: "",
      life: "",
      payment: "",
      description: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsLoadingSubmit(true);

    const data = {
      user_id: userID,
      course_id: formData.course_id,
      amount: formData.amount,
      payment: formData.payment,
      life: formData.life,
    };

    try {
      // Send POST request to the API endpoint
      const response = await fetch(baseurl + "/admin/enroll_user_for_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to activate course");
      }

      // If successful, navigate to the user_videos page
      navigate("/users");
    } catch (error) {
      console.error("Error activating course:", error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true); // Set loading to true when starting the fetch

      // Make an API request to get the data for the current page
      const response = await fetch(
        baseurl +
          `/admin/user_not_purchased_courses/${userID}?page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCourses(data.data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false on error
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container">
      <h1 className="color-main">User Enroll</h1>
      {isLoading ? ( // Show loading message while data is being fetched
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-12 user-item">
              <div className="container">
                <div className="row">
                  <div className="col-2 ">
                    <img src={course.thumbnail} alt={course.title} />
                  </div>
                  <div className="col-9 ms-3">
                    <strong className="color-title">{course.title}</strong>

                    <div className="mt-2">
                      <strong className="color-main">Course amount: </strong>
                      <span className="color-green">
                        {" "}
                        {course.course_amount}
                      </span>
                    </div>
                    <div className="user-btns">
                      <div>
                        <strong className="color-main">Duration:</strong>{" "}
                        <span className="color-blue">{course.duration}</span>
                      </div>
                    </div>
                    <div>
                      <strong className="color-main">Course life:</strong>{" "}
                      <span className="color-pink">{course.life} / video</span>
                    </div>
                  </div>

                  <div className="col-12 mt-2 user-btns">
                    <button
                      className="visible-data mt-2"
                      onClick={() => handleactiveCourse(course.id)}
                    >
                      activate course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === courses.total_pages}
          >
            Next
          </button>
        </div>
      )}

      {isFormVisible && (
        <div className="user-item">
          <h2>Activate Course</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <div>
                <label>Amount:</label>
              </div>

              <input
                autoComplete="off"
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <div>
                <label>Life:</label>
              </div>
              <input
                autoComplete="off"
                type="text"
                name="life"
                value={formData.life}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <div>
                <label>Payment Description:</label>
              </div>
              <textarea
                autoComplete="off"
                name="payment"
                value={formData.payment}
                onChange={handleFormChange}
              />
            </div>

            {isLoadingSubmit ? (
              "Submitting..."
            ) : (
              <button type="submit" disabled={isLoadingSubmit}>
                Confirm
              </button>
            )}
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
