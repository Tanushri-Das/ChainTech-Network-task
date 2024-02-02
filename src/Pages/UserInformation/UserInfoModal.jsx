// // UserInfoModal.js
// import React from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// const UserInfoModal = ({ userInfo, onHide }) => {
//   return (
//     <Modal show={true} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>User Information</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Name: {userInfo.name}</p>
//         <p>Email: {userInfo.email}</p>
//         <p>Phone: {userInfo.phone}</p>
//         {/* Add more fields as needed */}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default UserInfoModal;

// UserInfoModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";

const UserInfoModal = ({ userInfo, onHide }) => {
  const [editedName, setEditedName] = useState(userInfo.name);
  const [editedPhone, setEditedPhone] = useState(userInfo.phone);
  const dispatch = useDispatch();

  const handleSave = () => {
    // Retrieve the existing allUsers array from localStorage
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    // Find the index of the user with the matching email
    const userIndex = allUsers.findIndex(
      (user) => user.email === userInfo.email
    );

    if (userIndex !== -1) {
      // If the user exists, create a copy of the user data
      const updatedUser = {
        ...allUsers[userIndex],
        name: editedName,
        phone: editedPhone, // Update the required field (phone in this case)
      };

      // Update the user in the allUsers array
      allUsers[userIndex] = updatedUser;

      // Save the updated allUsers array back to localStorage
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      // Dispatch the action to update name and phone in the Redux store
      dispatch(setUserInfo(updatedUser));
    }

    onHide(); // Close the modal
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-2">
          <label className="fs-5 fw-semibold mb-1">Name</label>
          <input
            className="form-input w-100"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="fs-5 fw-semibold mb-1">Phone</label>
          <input
            className="form-input w-100"
            type="number"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
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
