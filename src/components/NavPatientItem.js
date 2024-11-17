import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavPatientItem = ({
  item,
  index,
  patientsList,
  setCurrPatient,
  selectedIndex,
  setSelectedIndex,
  setChangePatient
}) => {
  const navigate=useNavigate();
  const isSelected = selectedIndex === index;
  const itemStyle = () => ({
    // border: isSelected
    //   ? "2px solid rgb(135, 183, 251)"
    //   : "2px solid rgb(232, 234, 239)", // Increase border width here
    border: isSelected
      ? "2px solid rgb(135, 183, 251)"
      : "2px solid rgb(50, 50, 50)", // Increase border width here

    // marginLeft:isSelected?"10px":"",
    borderRadius: isSelected ? "10px" : "10px",
    // color: isSelected ? "black" : "black",
    color: "white",

    // backgroundColor: isSelected ? "rgb(249, 249, 249)" : "white",
    backgroundColor: isSelected ? "#141414" : "#414141",
  });

  const handlePatientItemClick = () => {
    navigate(`/patient-details/${encodeURIComponent(item.email)}`);
    // setChangePatient((prev)=> !prev);
    setCurrPatient(item);
    setSelectedIndex(index);
  };
  useEffect(() => {
    console.log("thisisisidifid is the padfdf");
    console.log(item);
  }, []);
  return (
    <div
      className="side-patient-item-outer"
      style={itemStyle(index)}
      onClick={handlePatientItemClick}
    >
      <div className="name-register-div">
        <div className="name">{item.name}</div>
        <div className="register">Registered: 12 March 2024</div>
      </div>
      <div className="arrow-icon-div">
        <FaArrowRight color={isSelected ? "white" : "darkgray"} size={15} />
      </div>
    </div>
  );
};
export default NavPatientItem;
