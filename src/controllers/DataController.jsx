import configurations from "../../configurations";
import axios from "axios";
import { refreshAdminToken, isTokenExpired } from "../utils/Utils";

class DataController {
  static async LoginAuth(data) {
    try {
      const response = await axios.post(
        `${configurations.baseurl}auth/loginadmin`,
        data,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getdata(attempt = 1) {
    if (isTokenExpired()) {
      await refreshAdminToken();
    }
    const accessToken = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await axios.get(`${configurations.baseurl}u/users`, {
        headers: headers,
      });
      return response;
    } catch (e) {
      console.log("401 response code");
      await refreshAdminToken();
      return this.getdata(attempt + 1);
    }
  }

  static async fetchData() {
    try {
      const response = await fetch(`${configurations.baseurl}u/users`);
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async fetchData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async addData(data) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async updateData(data) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }

  static async deleteData(id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      return await response.json();
    } catch (error) {
      return console.log(error);
    }
  }
}

export default DataController;
