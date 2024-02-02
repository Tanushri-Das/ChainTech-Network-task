import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/userSlice";
import Table from "react-bootstrap/Table";
import { BsPencilSquare } from "react-icons/bs";
import UserInfoModal from "./UserInfoModal";
import "./UserInformation.css";

const UserInformation = () => {
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo)
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userInfo.name}</td>
            <td>{userInfo.email}</td>
            <td>{userInfo.phone}</td>
            <td>
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
