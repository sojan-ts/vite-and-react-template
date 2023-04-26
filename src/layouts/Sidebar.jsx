import React from "react";
import { Link } from "react-router-dom";
import sidebarData from "./routes/sidebarRoutes.json";

export default function Sidebar() {
  const menuItems = sidebarData.menuItems;

  return (
    <>
      <div className="dark-mode">
        <div className="asideIner">
          <div className="section" id="nav-widget">
            <div className="widget HTML" data-version="2" id="HTML00">
              <ul className="navigation-menu">
                {menuItems.map((item) => (
                  <li className="submenu" key={item.id}>
                    <div className="link">
                      <span>H</span>
                      <Link to={item.link} className="my-links-und">
                        <span className="name">{item.name}</span>
                      </Link>
                    </div>
                  </li>
                ))}

                <li className="close">
                  <label className="link" htmlFor="offnav-menu">
                    <svg
                      className="icon"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
                    </svg>
                    <span className="name">Menu</span>
                  </label>
                </li>
              </ul>
              <label
                className="full-close nav-close"
                htmlFor="offnav-menu"
              ></label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
