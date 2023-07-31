import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom/dist";
import Home from "../pages/Home";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AllUsers from "../pages/users/AllUsers";
import UserCourses from "../pages/users/UserCourses";
import UserVideos from "../pages/users/UserVideos";
import UserEnroll from "../pages/users/UserEnroll";
import AllCourses from "../pages/courses/AllCourses";
import CourseTypes from "../pages/courses/CourseTypes";
import CourseCategories from "../pages/courses/CourseCategories";
import CourseContents from "../pages/courses/CourseContents";
import CreateCourse from "../pages/courses/create/CreateCourse";
import EditCourse from "../pages/courses/edit/EditCourse";
import CreateContentVideo from "../pages/courses/create/CreateContentVideo";
import EditContent from "../pages/courses/edit/EditContent";
import ResetPassword from "../pages/users/ResetPassword";
import AllCarousel from "../pages/carousel/allcarousel";
import CreateCarousel from "../pages/carousel/create/createCarousel";
import EditCarousel from "../pages/carousel/edit/editCarousel";

export default function Mainlayout() {
  return (
    <>
      <div id="mainContent">
        <input className="nav-menu hidden" id="offnav-menu" type="checkbox" />
        <div className="mainWrapper">
          <div className="mainIner multipleItem home" id="mainIner">
            <Header />
            <Sidebar />
            <main>
              <Fragment>
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/users" element={<AllUsers />}></Route>
                  <Route
                    exact
                    path="/user_courses"
                    element={<UserCourses />}
                  ></Route>
                  <Route
                    exact
                    path="/user_videos"
                    element={<UserVideos />}
                  ></Route>
                  <Route
                    exact
                    path="/user_enroll"
                    element={<UserEnroll />}
                  ></Route>
                  <Route exact path="/courses" element={<AllCourses />}></Route>
                  <Route
                    exact
                    path="/course_types"
                    element={<CourseTypes />}
                  ></Route>
                  <Route
                    exact
                    path="/course_categories"
                    element={<CourseCategories />}
                  ></Route>
                  <Route
                    exact
                    path="/course_contents"
                    element={<CourseContents />}
                  ></Route>
                  <Route
                    exact
                    path="/create_course"
                    element={<CreateCourse />}
                  ></Route>
                  <Route
                    exact
                    path="/edit_course"
                    element={<EditCourse />}
                  ></Route>
                  <Route
                    exact
                    path="/create_content_video"
                    element={<CreateContentVideo />}
                  ></Route>
                  <Route
                    exact
                    path="/edit_content_video"
                    element={<EditContent />}
                  ></Route>
                  <Route
                    exact
                    path="/resetpassword"
                    element={<ResetPassword />}
                  ></Route>
                  <Route
                    exact
                    path="/carousel"
                    element={<AllCarousel />}
                  ></Route>
                  <Route
                    exact
                    path="/create_carousel"
                    element={<CreateCarousel />}
                  ></Route>
                  <Route
                    exact
                    path="/edit_carousel"
                    element={<EditCarousel />}
                  ></Route>
                </Routes>
              </Fragment>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
