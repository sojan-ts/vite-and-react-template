import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom/dist";
import Home from "../pages/Home";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import UpdateCategory from "../views/UpdateCategory";

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
                  <Route exact path="/updatecategory" element={<UpdateCategory />}></Route>
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
