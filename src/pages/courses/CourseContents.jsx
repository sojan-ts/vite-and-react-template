import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { baseurl } from "../../../configurations";
import { useLocation, useNavigate } from "react-router-dom";

export default function CourseContents() {
  const [contents, setContents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState({});

  const location = useLocation();
  const categoriesID = location.state.data.categoryid;

  const navigate = useNavigate();

  const handleCreateClick = () => {
    const data = {
      categories: categoriesID,
    };
    navigate("/create_content_video", {
      state: { data },
    });
  };

  const handleEditClick = (content) => {
    const data = {
      content: content,
    };
    navigate("/edit_content_video", {
      state: { data },
    });
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async (page = 1) => {
    try {
      const response = await fetch(
        baseurl +
          `admin/list_all_contents/${categoriesID}?page${page}&search_term=${searchQuery}`
      );
      const data = await response.json();

      setContents(data.data);
      setLastPage(data.last_page);
      setCurrentPage(data.current_page);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = (content) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleVisibility = async (contentID, visibility) => {
    setIsUpdating((prevUpdating) => ({ ...prevUpdating, [contentID]: true }));

    try {
      await fetch(`${baseurl}admin/update_content_visibility/${contentID}`, {
        method: "PATCH",
      });

      // After successful update, fetch the contents again to refresh the data
      fetchContents(currentPage);
    } catch (error) {
      console.error("Error updating content visibility:", error);
    } finally {
      setIsUpdating((prevUpdating) => ({
        ...prevUpdating,
        [contentID]: false,
      }));
    }
  };

  return (
    <>
      <div>
        <h2 className="color-main">Course Videos</h2>
      </div>
      <input
        type="text"
        className="input-data inpt-data"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <button className="btn-green-go" onClick={() => handleCreateClick()}>
        Create
      </button>

      <div>
        {contents
          .filter((content) =>
            content.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((content) => (
            <div key={content.id} className="user-item">
              <div>
                <strong className="color-title">{content.title}</strong>
              </div>
              <div>
                <span className="color-green">{content.length}</span>
              </div>

              <div className="user-btns mt-2">
                <button
                  className="btn-blue"
                  onClick={() => handleOpenModal(content)}
                >
                  Description
                </button>
                {isUpdating[content.id] ? (
                  "Updating..."
                ) : (
                  <button
                    className={
                      content.visibility === 1
                        ? "visible-data"
                        : "invisible-data"
                    }
                    onClick={() =>
                      handleToggleVisibility(content.id, content.visible)
                    }
                    disabled={isUpdating[content.id]}
                  >
                    {content.visibility === 1 ? "Visible" : "Invisible"}
                  </button>
                )}

                <button
                  className="btn-violet"
                  onClick={() => handleEditClick(content)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>

      {showModal && selectedContent && (
        <Modal
          message={selectedContent.description}
          onClose={handleCloseModal}
        />
      )}

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => fetchContents(currentPage - 1)}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          disabled={currentPage === lastPage}
          onClick={() => fetchContents(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
