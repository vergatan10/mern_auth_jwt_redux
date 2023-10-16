import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link
          to="/"
          className="sidebar-brand d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </Link>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        {/* <hr className="sidebar-divider" /> */}

        {/* <!-- Heading --> */}
        {/* <div className="sidebar-heading">Interface</div> */}

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        {/* <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="buttons.html">
                Buttons
              </a>
              <a className="collapse-item" href="cards.html">
                Cards
              </a>
            </div>
          </div>
        </li> */}

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Main</div>

        <li className="nav-item">
          <Link to="/nasabah" className="nav-link">
            <i className="fas fa-fw fa-bars"></i>
            <span>Nasabah</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/rekening" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Rekeinng</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/users" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Users</span>
          </Link>
        </li>
      </ul>
      {/* <!-- End of Sidebar --> */}
    </>
  );
};

export default Sidebar;
