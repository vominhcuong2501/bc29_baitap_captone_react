import React from "react";

export default function HeaderAdmin() {
  const styleLogo = {
    color: "rgb(253, 194, 33)",
    fontFamily: "Times New Roman, Times, serif",
    fontSize: "50px",
    fontWeight: " bold",
    fontStyle: "italic",
    textDecoration: "none",
  };
  return (
    <div className="text-center">
      <nav className="navbar navbar-expand-sm navbar-light row p-0">
        <div className="col-2" style={{background: '#7386D5'}}>
          <a style={styleLogo} href="#">
            CyberFilm
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="col-10 text-right pr-5" id="collapsibleNavId">
          <button
            className="btn btn-success  my-sm-0"
            type="button"
          >
            Đăng nhập
          </button>
        </div>
      </nav>
    </div>
  );
}
