import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../../configurations";

export default function UserVideos() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editLifeId, setEditLifeId] = useState(null);
  const [editLifeValue, setEditLifeValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const userID = location.state.data.userid;
  const courseID = location.state.data.courseid;

  useEffect(() => {
    // Function to fetch user's purchased videos from the API
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get(
          baseurl +
            `/admin/user_library_contents/${userID}?page=${currentPage}&searchTerm=${searchTerm}&courseId=${courseID}`
        );
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchUserVideos();
  }, [currentPage, searchTerm, userID, courseID]);

  const handlePagination = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleEditLife = (videoId, currentLife) => {
    setEditLifeId(videoId);
    setEditLifeValue(currentLife);
  };

  const handleLifeChange = (e) => {
    setEditLifeValue(e.target.value);
  };

  const handleConfirmEdit = async (videoId) => {
    try {
      setLoading(true); // Show loading state
      // Send a patch request to update the life for the specific video ID
      await axios.patch(
        baseurl + `/admin/update_life_video_purchased/${videoId}`,
        {
          life: editLifeValue,
        }
      );
      // Reload the video list to reflect the updated data
      setCurrentPage(1);
      setEditLifeId(null);
      setLoading(false); // Hide loading state after request is complete

      // Update the UI with the new life value
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === videoId ? { ...video, life: editLifeValue } : video
        )
      );
    } catch (error) {
      console.error("Error updating life:", error);
      setLoading(false); // Hide loading state in case of error
    }
  };

  const handleCancelEdit = () => {
    setEditLifeId(null);
    // Reset the editLifeValue to the original life value
    setEditLifeValue("");
  };

  return (
    <div className="container">
      <h1 className="mb-4 color-main">User Purchased Videos</h1>

      <div className="row">
        <div className="col-12 mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
          />
        </div>
        {videos.map((video) => (
          <div key={video.id} className="col-12 user-item">
            <div>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
              </a>
            </div>
            <div className="mt-2">
              <strong className="color-main">Length:</strong>{" "}
              <span className="color-green">{video.length} </span>
            </div>
            <div className="mt-2">
              {editLifeId === video.id ? (
                <div className="user-btns">
                  <input
                    type="number"
                    value={editLifeValue}
                    onChange={handleLifeChange}
                  />

                  {loading ? (
                    "Loading..."
                  ) : (
                    <button
                      className="btn-green-go"
                      onClick={() => handleConfirmEdit(video.id)}
                    >
                      Confirm
                    </button>
                  )}

                  <button className="invisible-data" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <span>
                  <strong className="color-main"> Life: </strong>
                  <span className="color-pink"> {video.life} </span>
                  <div className="mt-2">
                    <button
                      className="btn-blue"
                      onClick={() => handleEditLife(video.id, video.life)}
                    >
                      Edit Life
                    </button>
                  </div>
                </span>
              )}
            </div>{" "}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination("next")}
          disabled={videos.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
}
