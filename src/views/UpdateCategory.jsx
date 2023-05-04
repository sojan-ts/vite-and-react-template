import React, { useState } from "react";
import DataController from "../controllers/DataController";
import { useLocation } from "react-router-dom";

function UpdateCategory() {
  const location = useLocation();
  const category = location.state?.category;

  const [title, setTitle] = useState(category.title);
  const [value, setValue] = useState(parseInt(category.visibility));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {};
      if (title !== category.title) {
        updatedData.title = title;
      }
      if (value !== category.visibility) {
        updatedData.visibility = value;
      }

      console.log(JSON.stringify(updatedData))

      const response = await DataController.updateData(category.id, updatedData);
      // if loginAuth is successful, navigate to dashboard page
      if (response.status === 200) {
        const responseData = await response.data;
        console.log(responseData);
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

export default UpdateCategory;
