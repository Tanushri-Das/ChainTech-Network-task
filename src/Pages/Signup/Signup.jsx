import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";

const SignUp = () => {
  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

      // Find the index of the user with the matching email
      const userIndex = allUsers.findIndex((user) => user.email === data.email);

      if (userIndex !== -1) {
        // If the user exists, update the data
        allUsers[userIndex] = {
          ...allUsers[userIndex],
          name: data.name,
          phone: data.phone,
        };
      } else {
        // If the user doesn't exist, add a new user
        allUsers.push({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }

      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      dispatch(
        setUserInfo({
          name: data.name,
          email: data.email,
          phone: data.phone,
        })
      );

      reset();

      Swal.fire({
        title: "Good job!",
        text: "Congratulations! Sign Up Successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/userinfo");
    });
  };

  // const onSubmit = (data) => {
  //   if (data.password !== data.confirmPassword) {
  //     // Passwords do not match, set passwordsMatch to false
  //     setPasswordsMatch(false);
  //     return;
  //   }

  //   // Passwords match, proceed with form submission.
  //   setPasswordsMatch(true);
  //   createUser(data.email, data.password).then((result) => {
  //     const loggedUser = result.user;
  //     console.log(loggedUser);
  //   });

  //   const saveUser = {
  //     name: data.name,
  //     email: data.email,
  //     phone: data.phone,
  //   };

  //   const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
  //   allUsers.push(saveUser);

  //   localStorage.setItem("allUsers", JSON.stringify(allUsers));
  //   // localStorage.setItem("user", JSON.stringify(saveUser));

  //   dispatch(setUserInfo(saveUser));
  //   reset();
  //   Swal.fire({
  //     title: "Good job!",
  //     text: "Congratulations! Sign Up Successfully!",
  //     icon: "success",
  //     timer: 1500,
  //     showConfirmButton: false,
  //   });

  //   navigate("/userinfo");
  // };

  return (
    <div className="w-50 mx-auto my-5">
      <form className="form p-4 rounded-3" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center fs-2 mb-3 fw-bold">Sign Up</h1>
        <div className="row mb-1">
          <div className="col-12 col-lg-6">
            <label className="fs-5 fw-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="form-input"
            />
            {errors.name && (
              <span className="text-danger fw-semibold mt-1">
                {errors.name?.message}
              </span>
            )}
          </div>
          <div className="col-12 col-lg-6">
            <label className="fs-5 fw-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="form-input"
            />
            {errors.email && (
              <span className="text-danger fw-semibold mt-1">
                {errors.email?.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-1">
          <label className="fs-5 fw-semibold mb-1">Phone</label>
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone Number is required" })}
            className="form-input"
          />
          {errors.name && (
            <span className="text-danger fw-semibold mt-1">
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <label className="fs-5 fw-semibold mb-1">Password</label>
            <div className="secrect-pass">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                  maxLength: 10,
                })}
                className="form-input w-full"
              />
              <span
                className="show-pass me-1"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-danger fw-semibold mt-1">
                {errors.password?.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-danger fw-semibold mt-1">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-danger fw-semibold mt-1">
                Password must not exceed 10 characters
              </span>
            )}
          </div>
          <div className="col-12 col-lg-6">
            <label className="fs-5 fw-semibold mb-1">Confirm Password</label>
            <div className="secrect-pass">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="form-input w-full"
              />
              <span
                className="show-pass me-1"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger fw-semibold mt-1">
                {errors.confirmPassword.message}
              </span>
            )}

            {!passwordsMatch && (
              <span className="text-danger fw-semibold mt-1">
                Password and Confirm Password do not match
              </span>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" className="fw-semibold text-white register-btn">
            Create an Account
          </Button>
        </div>
        <p className="text-center fs-5 fw-semibold mt-3">
          Already have an account?
          <Link to="/login" className="text-decoration-none ms-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
