import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../../configurations";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const searchOptions = [
  "username",
  "email",
  "phone",
  "complete_address",
  "post_office",
  "pincode",
  "district",
  "state",
  "country",
];

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState("username");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [userExperience, setUserExperience] = useState("");
  const [showAlertExperience, setShowAlertExperience] = useState(false);
  const [userQualification, setUserQualification] = useState("");
  const [showAlertQualification, setShowAlertQualification] = useState(false);
  const [loadingStatusUpdate, setLoadingStatusUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const handleCoursesClick = (userID) => {
    // navigate(`/bookings?customer_id=${customerID}`);
    const data = {
      userid: userID,
    };
    navigate("/user_courses", {
      state: { data },
    });
  };

  const handlePasswordClick = (userID) => {
    // navigate(`/bookings?customer_id=${customerID}`);
    const data = {
      userid: userID,
    };
    navigate("/resetpassword", {
      state: { data },
    });
  };

  const handleEnrollClick = (userID) => {
    // navigate(`/bookings?customer_id=${customerID}`);
    const data = {
      userid: userID,
    };
    navigate("/user_enroll", {
      state: { data },
    });
  };

  function handleExperience(experience_data) {
    setShowAlertExperience(true);
    setUserExperience(experience_data);
  }

  function handleQualification(qualification_data) {
    setShowAlertQualification(true);
    setUserQualification(qualification_data);
  }

  function handleChangeStatus(userId) {
    setLoadingStatusUpdate(true);
    const apiUrl = baseurl + "admin/change_user_status/" + userId;
    axios
      .patch(apiUrl)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, status: user.status === 1 ? 2 : 1 }
              : user
          )
        );
      })
      .catch((error) => {
        console.error("Error changing user status:", error);
      })
      .finally(() => {
        setLoadingStatusUpdate(false);
      });
  }

  const handleCloseAlertExperience = () => {
    setShowAlertExperience(false);
  };

  const handleCloseAlertQualification = () => {
    setShowAlertQualification(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchField, searchTerm, status, currentPage]); // Include currentPage as a dependency to refetch data when the page changes.

  const fetchUsers = () => {
    setLoading(true);
    const apiUrl = baseurl + "admin/all_users";
    let params = {
      page: currentPage, // Add the current page number to the request parameters.
    };
    if (searchTerm) {
      params.search_field = searchField;
      params.search_term = searchTerm;
    }
    if (status) {
      params.status = status;
    }
    axios
      .get(apiUrl, { params })
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.last_page); // Set the total number of pages from the API response.
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="color-main mb-3">All Users</h2>
      <div>
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          {searchOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder={`Search ${searchField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="1">Active</option>
          <option value="2">Blocked</option>
        </select>
      </div>
      <div className="user-list">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-item">
              <div>
                <strong className="color-title">ID:</strong>{" "}
                <span className="color-green">{user.id}</span>
              </div>
              <div>
                <strong className="color-title">Username:</strong>{" "}
                <span className="color-green"> {user.username}</span>
              </div>
              <div>
                <strong className="color-title">Status:</strong>{" "}
                <span className="color-main">
                  {" "}
                  {user.status === 1 ? "Active" : "Blocked"}
                </span>
              </div>
              <div>
                <strong className="color-title">Email:</strong>{" "}
                <span className="color-green">{user.email}</span>
              </div>
              <div>
                <strong className="color-title">Phone:</strong>{" "}
                <span className="color-green">{user.phone}</span>
              </div>
              <div>
                <strong className="color-title">Complete address:</strong>{" "}
                <span className="color-green">{user.complete_address}</span>
              </div>
              <div className="mt-2">
                <strong className="color-title">Country: </strong>
                <span className="color-pink">{user.country}</span>
              </div>
              <div>
                <strong className="color-title">State:</strong>{" "}
                <span className="color-pink">{user.state}</span>
              </div>
              <div>
                <strong className="color-title">District:</strong>{" "}
                <span className="color-pink"> {user.district}</span>
              </div>
              <div>
                <strong className="color-title">Pincode:</strong>{" "}
                <span className="color-pink">{user.pincode}</span>
              </div>
              <div>
                <strong className="color-title">Post Office:</strong>{" "}
                <span className="color-pink">{user.post_office}</span>
              </div>
              <div className="mt-2">
                <strong className="color-title">Created:</strong>{" "}
                <span className="color-blue"> {user.created_at}</span>
              </div>

              <div className="mt-2 user-btns">
                <button
                  className="btn-blue"
                  onClick={() => handleExperience(user.experience)}
                >
                  Experience
                </button>
                <button
                  className="btn-blue"
                  onClick={() => handleQualification(user.qualification)}
                >
                  Qualification
                </button>
                {loadingStatusUpdate ? (
                  <div className="loading-spinner">Updating...</div>
                ) : (
                  <button
                    className={
                      user.status === 1 ? "visible-data" : "invisible-data"
                    }
                    onClick={() => handleChangeStatus(user.id)}
                  >
                    {user.status === 1 ? "Block" : "Unblock"}
                  </button>
                )}
                <button
                  className="btn-course-data"
                  onClick={() => handleCoursesClick(user.id)}
                >
                  courses
                </button>
                <button
                  className="btn-enroll-data"
                  onClick={() => handleEnrollClick(user.id)}
                >
                  enroll
                </button>
                <button
                  className="invisible-data"
                  onClick={() => handlePasswordClick(user.id)}
                >
                  reset-password
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {showAlertExperience && (
        <Modal
          message={"<strong>Experience</strong><p>" + userExperience + "</p>"}
          onClose={handleCloseAlertExperience}
        />
      )}
      {showAlertQualification && (
        <Modal
          message={
            "<strong>Qualification</strong><p>" + userQualification + "</p>"
          }
          onClose={handleCloseAlertQualification}
        />
      )}
    </div>
  );
}
