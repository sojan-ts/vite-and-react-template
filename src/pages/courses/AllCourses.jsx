import React, { useState, useEffect } from "react";
import { baseurl } from "../../../configurations";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updatingCourseIDs, setUpdatingCourseIDs] = useState([]); // New state for updating course IDs

  useEffect(() => {
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const navigate = useNavigate();

  const handleTypesClick = (courseID) => {
    const data = {
      courseid: courseID,
    };
    navigate("/course_types", {
      state: { data },
    });
  };

  const fetchCourses = (page, search) => {
    let url = baseurl + `admin/list_courses?page=${page}`;
    if (search) {
      url += `&search_term=${search}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCourseEdit = (course) => {
    const data = {
      coursedata: course,
    };
    navigate("/edit_course", {
      state: { data },
    });
  };

  const createcoursepage = () => {
    navigate("/create_course");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  const handleToggleVisibility = (courseID, visibility) => {
    if (updatingCourseIDs.includes(courseID)) {
      // If the course is already being updated, don't proceed with another update.
      return;
    }

    // Add the course ID to the list of updating courses.
    setUpdatingCourseIDs((prevIDs) => [...prevIDs, courseID]);

    const data = {
      visibility: visibility === 1 ? 0 : 1,
    };

    fetch(`${baseurl}admin/update_course_visibility/${courseID}`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((updatedCourse) => {
        const index = courses.findIndex((course) => course.id === courseID);

        if (index !== -1) {
          setCourses((prevCourses) => {
            const updatedCourses = [...prevCourses];
            updatedCourses[index] = {
              ...updatedCourses[index],
              visibility: updatedCourse.visibility,
            };
            return updatedCourses;
          });
        }

        // Remove the course ID from the list of updating courses.
        setUpdatingCourseIDs((prevIDs) =>
          prevIDs.filter((id) => id !== courseID)
        );
      })
      .catch((error) => {
        console.error("Error updating course visibility:", error);
        // Remove the course ID from the list of updating courses in case of an error.
        setUpdatingCourseIDs((prevIDs) =>
          prevIDs.filter((id) => id !== courseID)
        );
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <input
            type="text"
            className="inpt-data input-data"
            placeholder="Search courses"
            onChange={handleSearch}
          />
        </div>
        <div className="col-4">
          <button className="btn-green-go" onClick={() => createcoursepage()}>
            create course
          </button>
        </div>
      </div>
      {courses.map((course) => (
        <div key={course.id} className="user-item">
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
                  <span className="color-main">Amount: </span>
                  <span className="color-green">{course.amount}</span>
                </div>
                <div className="user-btns">
                  <div>
                    <span className="color-main">Duration: </span>{" "}
                    <span className="color-blue">{course.duration}</span>
                  </div>
                </div>
                <div>
                  <span className="color-main">Course life:</span>{" "}
                  <span className="color-pink"> {course.life}</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div>{course.created_at}</div>
              </div>
              <div className="col-12 mt-2 user-btns">
                <button
                  className="btn-blue"
                  onClick={() => handleCourseClick(course)}
                >
                  Description
                </button>
                <button
                  className="btn-green-go"
                  onClick={() => handleTypesClick(course.id)}
                >
                  Types
                </button>
                <button
                  className={
                    course.visibility === 1 ? "visible-data" : "invisible-data"
                  }
                  onClick={() =>
                    handleToggleVisibility(course.id, course.visibility)
                  }
                  disabled={updatingCourseIDs.includes(course.id)} // Use the updatingCourseIDs state to determine if the button should be disabled
                >
                  {course.visibility === 1 ? "Visible" : "Invisible"}
                </button>
                <button
                  onClick={() => handleCourseEdit(course)}
                  className="btn-violet"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {selectedCourse && (
        <Modal
          message={selectedCourse.description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
