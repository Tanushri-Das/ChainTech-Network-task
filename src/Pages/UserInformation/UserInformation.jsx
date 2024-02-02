// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectUserInfo } from "../../redux/userSlice";
// import Table from "react-bootstrap/Table";
// import { BsPencilSquare } from "react-icons/bs";
// import UserInfoModal from "./UserInfoModal";
// import "./UserInformation.css";

// const UserInformation = () => {
//   const userInfo = useSelector(selectUserInfo);
//   console.log(userInfo)
//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="container mt-5">
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{userInfo.name}</td>
//             <td>{userInfo.email}</td>
//             <td>{userInfo.phone}</td>
//             <td>
//               <BsPencilSquare className="pencil" onClick={openModal} />
//             </td>
//           </tr>
//         </tbody>
//       </Table>

//       {showModal && <UserInfoModal userInfo={userInfo} onHide={closeModal} />}
//     </div>
//   );
// };

// export default UserInformation;











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
    // Retrieve the user data from localStorage based on the email
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userData = allUsers.find((user) => user.email === email) || null;
    return userData;
  };

  const fetchUserData = () => {
    try {
      // Fetch user data from localStorage based on the email
      const userData = fetchDataFromLocalStorage(user.email);

      if (userData) {
        // Dispatch the setUserInfo action with the fetched user data
        dispatch(setUserInfo(userData));

        // Set loading to false after dispatching
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
    // Load user data from localStorage during the initial render
    fetchUserData();
  }, [dispatch]);

  if (loading) {
    // Display a loading message or spinner while data is loading
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Phone</th>
            <th className="text-center">Profession</th>
            <th className="text-center">Gender</th>
            <th className="text-center">Age</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{userInfo.name}</td>
            <td className="text-center">{userInfo.phone}</td>
            <td className="text-center">{userInfo.profession}</td>
            <td className="text-center">{userInfo.gender}</td>
            <td className="text-center">{userInfo.age}</td>
            <td className="text-center">
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
