import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        Swal.fire({
          title: "Good job!",
          text: "You Login Successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
        const loginUser = allUsers.find((user) => user.email === userEmail);

        if (loginUser) {
          dispatch(setUserInfo(loginUser));
        }

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Firebase authentication error:", error);
        Swal.fire({
          title: "Authentication Failed",
          text: "Invalid email or password. Please check your credentials and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailBlur = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    console.log(email);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <form onSubmit={handleLogin} className="form p-4 rounded-3">
            <h1 className="text-black text-center text-3xl mb-4 font-bold">
              Login
            </h1>
            <div className="mb-1">
              <label className="fs-5 fw-semibold mb-1">Email</label>
              <input
                onBlur={handleEmailBlur}
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="mb-3">
              <div className="fs-5 fw-semibold mb-1">
                <label className="block text-black text-[16px] font-semibold">
                  Password
                </label>
              </div>

              <div className="secrect-pass">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="form-input w-full"
                />

                <span
                  className="show-pass me-1"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button
                type="submit"
                className="fw-semibold text-white register-btn"
              >
                Login
              </Button>
            </div>
            <p className="text-center fs-5 fw-semibold mt-3">
              Don’t have an account ?
              <Link to="/signup" className="text-decoration-none ms-1">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
