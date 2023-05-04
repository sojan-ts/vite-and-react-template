import React, { useState } from "react";
import axios from "axios";
import DataController from "../controllers/DataController";

function CreateCategory() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const CreateCategoryDtls = { "title" : title , "visibility": value  };
        const response = await DataController.postData(CreateCategoryDtls);
        // if loginAuth is successful, navigate to dashboard page
        if (response.status === 201) {
          const responseData = await response.data;
          console.log(responseData)
        } else {
          console.log("LoginAuth failed");
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <input
          type="radio"
          id="show"
          name="visibility"
          value={1}
          checked={value === 1}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <label htmlFor="show">Show</label>
      </div>

      <div>
        <input
          type="radio"
          id="hide"
          name="visibility"
          value={2}
          checked={value === 2}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <label htmlFor="hide">Hide</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateCategory;
