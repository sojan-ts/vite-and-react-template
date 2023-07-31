import React, { useState, useEffect } from "react";
import { baseurl } from "../../../configurations";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

export default function AllCarousel() {
  const [Carousels, setCarousels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarousel, setSelectedCarousel] = useState(null);
  const [updatingCarouselIDs, setUpdatingCarouselIDs] = useState([]); // New state for updating Carousel IDs

  useEffect(() => {
    fetchCarousels(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const navigate = useNavigate();

  const handleTypesClick = (CarouselID) => {
    const data = {
      Carouselid: CarouselID,
    };
    navigate("/Carousel_types", {
      state: { data },
    });
  };

  const fetchCarousels = (page, search) => {
    let url = baseurl + `admin/list_carousel?page=${page}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCarousels(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      })
      .catch((error) => console.error("Error fetching Carousels:", error));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleCarouselEdit = (Carousel) => {
    const data = {
      carouseldata: Carousel,
    };
    navigate("/edit_carousel", {
      state: { data },
    });
  };

  const createCarouselpage = () => {
    navigate("/create_carousel");
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

  const handleCarouselClick = (Carousel) => {
    setSelectedCarousel(Carousel);
  };

  const handleCloseModal = () => {
    setSelectedCarousel(null);
  };

  const handleToggleVisibility = (CarouselID, visibility) => {
    if (updatingCarouselIDs.includes(CarouselID)) {
      // If the Carousel is already being updated, don't proceed with another update.
      return;
    }

    // Add the Carousel ID to the list of updating Carousels.
    setUpdatingCarouselIDs((prevIDs) => [...prevIDs, CarouselID]);

    const data = {
      visibility: visibility === 1 ? 0 : 1,
    };

    fetch(`${baseurl}admin/update_Carousel_visibility/${CarouselID}`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((updatedCarousel) => {
        const index = Carousels.findIndex(
          (Carousel) => Carousel.id === CarouselID
        );

        if (index !== -1) {
          setCarousels((prevCarousels) => {
            const updatedCarousels = [...prevCarousels];
            updatedCarousels[index] = {
              ...updatedCarousels[index],
              visibility: updatedCarousel.visibility,
            };
            return updatedCarousels;
          });
        }

        // Remove the Carousel ID from the list of updating Carousels.
        setUpdatingCarouselIDs((prevIDs) =>
          prevIDs.filter((id) => id !== CarouselID)
        );
      })
      .catch((error) => {
        console.error("Error updating Carousel visibility:", error);
        // Remove the Carousel ID from the list of updating Carousels in case of an error.
        setUpdatingCarouselIDs((prevIDs) =>
          prevIDs.filter((id) => id !== CarouselID)
        );
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <button className="btn-green-go" onClick={() => createCarouselpage()}>
            create carousel
          </button>
        </div>
      </div>
      {Carousels.map((Carousel) => (
        <div key={Carousel.id} className="user-item">
          <div className="container">
            <div className="row">
              <div className="col-2 ">
                <img
                  className="img-data"
                  src={Carousel.img_url}
                  alt={Carousel.title}
                />
              </div>
              <div className="col-9 ms-3">
                <strong className="color-title">{Carousel.title}</strong>
              </div>
              <div className="mt-2">
                <strong className="color-main">Redirection URL : </strong>
                <span className="color-main">{Carousel.url}</span>
              </div>

              <div className="col-12 mt-2 user-btns">
                <button
                  onClick={() => handleCarouselEdit(Carousel)}
                  className="btn-green-go"
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

      {selectedCarousel && (
        <Modal
          message={selectedCarousel.description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
