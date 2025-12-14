import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TodoContext } from "../store/TodoContext";

const Signup = () => {
  const { setAutenticated } = useContext(TodoContext);
  const fullnameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const psdRef = useRef();
  const confirmPsdRef = useRef();

  // login ref
  const loginEmailRef = useRef();
  const loginPsdRef = useRef();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const number = numberRef.current.value;
    const password = psdRef.current.value;
    const confirmPassword = confirmPsdRef.current.value;

    if (password == confirmPassword) {
      try {
        await axios.post("http://localhost:5000/signup/insertUser", {
          fullname,
          email,
          number,
          password,
        });
      } catch (error) {
        console.log("ERROR:", error);
      }
      alert("data saved sucessfully");
      fullnameRef.current.value = "";
      emailRef.current.value = "";
      numberRef.current.value = "";
      psdRef.current.value = "";
      confirmPsdRef.current.value = "";
    } else {
      alert("password and confirm password not matched!!");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginEmail = loginEmailRef.current.value;
    const loginpsd = loginPsdRef.current.value;

    const res = await axios.post("http://localhost:5000/signup/loginUser", {
      email: loginEmail,
      password: loginpsd,
    });
    localStorage.setItem("token", res.data.token);
    setAutenticated(true);
    navigate("/todo");

    loginEmailRef.current.value = "";
    loginPsdRef.current.value = "";
  };
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <h1 className="text-center">Authentication</h1>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-signup-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-signup"
                  type="button"
                  role="tab"
                  aria-controls="nav-signup"
                  aria-selected="true"
                >
                  Signup
                </button>
                <button
                  className="nav-link"
                  id="nav-login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-login"
                  type="button"
                  role="tab"
                  aria-controls="nav-login"
                  aria-selected="false"
                >
                  Login
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-signup"
                role="tabpanel"
                aria-labelledby="nav-signup-tab"
                tabIndex={0}
              >
                <form onSubmit={handleSignup}>
                  <div className="mb-3 mt-3">
                    <input
                      type="text"
                      ref={fullnameRef}
                      placeholder="Fullname"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      ref={emailRef}
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      ref={numberRef}
                      placeholder="mobilenumber"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      ref={psdRef}
                      placeholder="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      ref={confirmPsdRef}
                      placeholder="confirm password"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input type="submit" className="form-control bg-info" />
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="nav-login"
                role="tabpanel"
                aria-labelledby="nav-login-tab"
                tabIndex={0}
              >
                <form onSubmit={handleLogin}>
                  <div className="mb-3 mt-3">
                    <input
                      type="email"
                      ref={loginEmailRef}
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      ref={loginPsdRef}
                      placeholder="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="submit"
                      className="form-control bg-info"
                      value={"login"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
