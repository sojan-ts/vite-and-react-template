import React from "react";

export default function Header() {
  return (
    <>
      <div className="dark-mode">
        <header className="header " id="header">
          <div className="navicon left">
            <label aria-label="Menu" className="nav" htmlFor="offnav-menu">
              <i></i>
              <i></i>
              <i></i>
            </label>
          </div>

          <div className="section" id="header-widget">
            <div className="widget Header" data-version="2" id="Header00">
              <div className="header-inner">
                <h1 data-text="My Title">My Title</h1>
              </div>
              <div className="description hidden"></div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
