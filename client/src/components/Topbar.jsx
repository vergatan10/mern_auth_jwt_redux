import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";
import { useEffect, useState } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setUsers(user);
    console.log(users);
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(setUser(null));
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {users?.username}
              </span>
              <img
                className="img-profile rounded-circle"
                src="img/undraw_profile.svg"
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <button onClick={handleLogout} className="dropdown-item">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
      {/* <!-- End of Topbar --> */}
    </>
  );
};

export default Topbar;
