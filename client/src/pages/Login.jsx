import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import authApi from "../api/modules/authApi";
import { useNavigate } from "react-router-dom";
import userApi from "../api/modules/authApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) {
        dispatch(setUser(response));
        navigate("/");
      }
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!username || !password) return;

    setLoading(true);
    const { response, err } = await authApi.signin({
      username: username,
      password: password,
    });

    if (response) {
      setLoading(false);
      dispatch(setUser(response));
      navigate("/");
    }
    if (err) {
      setLoading(false);
      dispatch(setUser(null));
      setError(err.message);
    }
  };

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        {error && <p>{error}</p>}
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            autoComplete="true"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {!loading ? (
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Login
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                            disabled
                          >
                            Logging in...
                          </button>
                        )}
                      </form>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
