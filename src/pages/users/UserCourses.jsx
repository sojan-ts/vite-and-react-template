import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../../configurations";

export default function UserCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const navigate = useNavigate();

  const location = useLocation();
  const userID = location.state.data.userid;

  const handlevideosbtns = (courseID) => {
    // navigate(`/bookings?customer_id=${customerID}`);
    const data = {
      courseid: courseID,
      userid: userID,
    };
    navigate("/user_videos", {
      state: { data },
    });
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true); // Set loading to true when starting the fetch

      // Make an API request to get the data for the current page
      const response = await fetch(
        baseurl + `/admin/user_purchased_courses/${userID}?page=${currentPage}`
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
      <h1 className="color-main mb-2">User Courses</h1>
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
                    <img
                      className="img-data"
                      src={course.thumbnail}
                      alt={course.title}
                    />
                  </div>
                  <div className="col-9 ms-3">
                    <strong className="color-title">{course.title}</strong>
                    <div className="mt-2">
                      <strong className="color-main">Amount paid:</strong>{" "}
                      <span className="color-green"> {course.amount}</span>
                    </div>
                    <div className="mt-2">
                      <strong className="color-main">Course amount:</strong>{" "}
                      <span className="color-green">
                        {course.course_amount}
                      </span>
                    </div>
                    <div className="user-btns mt-2">
                      <div>
                        <strong className="color-main">Duration:</strong>{" "}
                        <span className="color-blue">{course.duration}</span>
                      </div>
                      <div>
                        <strong className="color-main">Course life: </strong>
                        <span className="color-pink">{course.life}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <div>
                      <strong className="color-main">
                        {course.created_at}
                      </strong>
                    </div>
                  </div>
                  <div className="col-12 mt-2 user-btns">
                    <button
                      className="btn-green-go"
                      onClick={() => handlevideosbtns(course.id)}
                    >
                      purchased videos
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
    </div>
  );
}
