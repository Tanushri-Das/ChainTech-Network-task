import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/userSlice";

const UserInformation = () => {
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  return (
    <div>
      <div>
        <h2>{userInfo.name}</h2>
        <h2>{userInfo.email}</h2>
        <h2>{userInfo.phone}</h2>
        <img src={userInfo.photo} alt="" />
      </div>
    </div>
  );
};

export default UserInformation;
