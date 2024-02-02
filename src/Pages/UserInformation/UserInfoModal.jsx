import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";

const UserInfoModal = ({ userInfo, onHide }) => {
  const [editedName, setEditedName] = useState(userInfo.name);
  const [editedPhone, setEditedPhone] = useState(userInfo.phone);
  const [editedProfession, setEditedProfession] = useState(userInfo.profession);
  const [editedGender, setEditedGender] = useState(userInfo.gender);
  const [editedAge, setEditedAge] = useState(userInfo.age);
  const dispatch = useDispatch();

  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userIndex = allUsers.findIndex(
      (user) => user.email === userInfo.email
    );

    if (userIndex !== -1) {
      const updatedUser = {
        ...allUsers[userIndex],
        name: editedName,
        phone: editedPhone,
        profession: editedProfession,
        gender: editedGender,
        age: editedAge,
      };

      allUsers[userIndex] = updatedUser;
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      dispatch(setUserInfo(updatedUser));
    }

    onHide();
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-1">
          <label className="fs-5 fw-semibold mb-1">Name</label>
          <input
            className="form-input w-100"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="fs-5 fw-semibold mb-1">Phone</label>
          <input
            className="form-input w-100"
            type="number"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="fs-5 fw-semibold mb-1">Profession</label>
          <input
            className="form-input w-100"
            type="text"
            value={editedProfession}
            onChange={(e) => setEditedProfession(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <label className="fs-5 fw-semibold mb-1">Gender</label>
          <div>
            <label>
              <input
                type="radio"
                value="Male"
                checked={editedGender === "Male"}
                onChange={(e) => setEditedGender(e.target.value)}
              />
              Male
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Female"
                checked={editedGender === "Female"}
                onChange={(e) => setEditedGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>
        <div className="mb-1">
          <label className="fs-5 fw-semibold mb-1">Age</label>
          <input
            className="form-input w-100"
            type="number"
            value={editedAge}
            onChange={(e) => setEditedAge(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;
