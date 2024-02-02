import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, setUserInfo } from "../../redux/userSlice";
import Table from "react-bootstrap/Table";
import { BsPencilSquare } from "react-icons/bs";
import UserInfoModal from "./UserInfoModal";
import "./UserInformation.css";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const UserInformation = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchDataFromLocalStorage = (email) => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userData = allUsers.find((user) => user.email === email) || null;
    return userData;
  };

  const fetchUserData = () => {
    try {
      const userData = fetchDataFromLocalStorage(user.email);

      if (userData) {
        dispatch(setUserInfo(userData));

        setLoading(false);
      } else {
        console.error("User not found in localStorage");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
       <h2 className='mb-4 text-center'>Personal Information</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center fs-5">Name</th>
            <th className="text-center fs-5">Phone</th>
            <th className="text-center fs-5">Profession</th>
            <th className="text-center fs-5">Gender</th>
            <th className="text-center fs-5">Age</th>
            <th className="text-center fs-5">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center fw-semibold data">{userInfo.name}</td>
            <td className="text-center fw-semibold data">{userInfo.phone}</td>
            <td className="text-center fw-semibold data">{userInfo.profession}</td>
            <td className="text-center fw-semibold data">{userInfo.gender}</td>
            <td className="text-center fw-semibold data">{userInfo.age}</td>
            <td className="text-center fw-semibold data">
              <BsPencilSquare className="pencil" onClick={openModal} />
            </td>
          </tr>
        </tbody>
      </Table>

      {showModal && <UserInfoModal userInfo={userInfo} onHide={closeModal} />}
    </div>
  );
};

export default UserInformation;
