import React, { useState, useEffect } from "react";
import { baseurl } from "../../../configurations";
import { useLocation, useNavigate } from "react-router-dom";

export default function CourseCategories() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contentType, setContentType] = useState("");
  const [course, setCourse] = useState("");

  // State to track updating status for each category
  const [updatingStatus, setUpdatingStatus] = useState({});

  useEffect(() => {
    fetchCategories(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const location = useLocation();
  const typesID = location.state.data.typesid;

  const navigate = useNavigate();

  const handleContentClick = (categoryID) => {
    const data = {
      categoryid: categoryID,
    };
    navigate("/course_contents", {
      state: { data },
    });
  };

  const fetchCategories = async (page, search) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        baseurl +
          `admin/list_categories/${typesID}?page=${page}&search_term=${search}`
      );
      const data = await response.json();
      setCategories(data.data);
      setTotalPages(data.last_page);
      setIsLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching categories.", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleEdit = (categoryId, currentTitle) => {
    setEditingCategoryId(categoryId);
    setEditedTitle(currentTitle);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleConfirmEdit = async () => {
    if (editedTitle !== "") {
      setUpdatingStatus((prevStatus) => ({
        ...prevStatus,
        [editingCategoryId]: true,
      }));

      try {
        const response = await fetch(
          baseurl + `admin/update_cat_title/${editingCategoryId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: editedTitle }),
          }
        );
        if (response.ok) {
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === editingCategoryId
                ? { ...category, title: editedTitle }
                : category
            )
          );
          setEditingCategoryId(null);
          setEditedTitle("");
        } else {
          console.error("Failed to update category title.");
        }
      } catch (error) {
        console.error(
          "An error occurred while updating the category title.",
          error
        );
      }

      setUpdatingStatus((prevStatus) => ({
        ...prevStatus,
        [editingCategoryId]: false,
      }));
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditedTitle("");
  };

  const handleToggleVisibility = async (categoryId, currentVisibility) => {
    const newVisibility = currentVisibility === 1 ? 0 : 1;
    setUpdatingStatus((prevStatus) => ({
      ...prevStatus,
      [categoryId]: true,
    }));

    try {
      const response = await fetch(
        baseurl + `admin/update_cat_visibility/${categoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visibility: newVisibility }),
        }
      );
      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? { ...category, visibility: newVisibility }
              : category
          )
        );
      } else {
        console.error("Failed to update category visibility.");
      }
    } catch (error) {
      console.error(
        "An error occurred while updating category visibility.",
        error
      );
    }

    setUpdatingStatus((prevStatus) => ({
      ...prevStatus,
      [categoryId]: false,
    }));

    // Reset the editingCategoryId state to null when toggling visibility
    setEditingCategoryId(null);
    setEditedTitle("");
  };

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (contentType.trim() === "") {
      return; // Prevent submitting if either field is empty
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(baseurl + "admin/insert_cat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenttype: contentType,
          typesid: typesID,
        }),
      });

      if (response.ok) {
        // Handle success or navigate if needed
        setContentType("");
        fetchCategories(1, "");
      } else {
        console.error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form.", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <h1 className="color-main">Course Categories</h1>

      <div className="row mt-3">
        <div className="col-4">
          <input
            type="text"
            className="inpt-data input-data"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-4">
          <input
            type="text"
            className="inpt-data input-data"
            placeholder="Enter title"
            value={contentType}
            onChange={handleContentTypeChange}
          />
          <button
            className="btn-green-go"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="row mt-2">
          {categories.map((category) => (
            <div className="col-3 user-item margin-data-item" key={category.id}>
              {editingCategoryId === category.id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                  />
                  <div className="mt-2 user-btns">
                    {updatingStatus[category.id] ? (
                      "Loading..."
                    ) : (
                      <>
                        <button
                          className="btn-green-go"
                          onClick={handleConfirmEdit}
                        >
                          Confirm
                        </button>
                        <button
                          className="invisible-data "
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="color-title">{category.title}</div>
                  <div className="mt-2 user-btns">
                    {/* Button to toggle visibility */}
                    {updatingStatus[category.id] ? (
                      "loading..."
                    ) : (
                      <button
                        className={
                          category.visibility === 1
                            ? "visible-data"
                            : "invisible-data"
                        }
                        onClick={() =>
                          handleToggleVisibility(
                            category.id,
                            category.visibility
                          )
                        }
                        disabled={updatingStatus[category.id]}
                      >
                        {category.visibility === 1 ? "Visible" : "Invisible"}
                      </button>
                    )}

                    {/* Button to edit */}
                    <button
                      className="btn-violet"
                      onClick={() => handleEdit(category.id, category.title)}
                      disabled={updatingStatus[category.id]}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-green-go"
                      onClick={() => handleContentClick(category.id)}
                    >
                      content
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
}
