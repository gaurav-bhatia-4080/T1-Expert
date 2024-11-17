import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { UilEye } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const encryptEmailToUrl = (email) => {
  // Encode email address to Base64
  const encodedEmail = btoa(email);
  // URL-encode special characters in the encoded email
  const urlEncodedEmail = encodeURIComponent(encodedEmail);
  return urlEncodedEmail;
};
const ListItem = ({
  item,
  index,
  details,
  hoveredIndex,
  setHoveredIndex,
  navAnimationControls,
}) => {
  const isHovered = hoveredIndex === index;
  const navigate = useNavigate();

  const handleItemClick = async () => {
    // Trigger the animation on the nav-menu2
    await navAnimationControls.start({
      rotateY: 360, // Rotate around Y axis
      transition: { duration: 0.5, ease: "easeInOut" }, // Animation timing
    });

    // Navigate after the animation completes
    const oi = details.findIndex((curr) => curr.email === item.email);
    navigate(`/patient-details/${encodeURIComponent(item.email)}`, {
      state: {
        patientsList: details,
        patient: item,
        initialSelectedIndex: oi,
      },
    });
  };
  return (
    <li
      onMouseEnter={() => setHoveredIndex(index)} // Set the hover index to this item's index
      onMouseLeave={() => setHoveredIndex(null)} // Reset hover index when mouse leaves
    >
      <div
        className="request-card-item all-scrollbar-style-none"
        title={`${item.name} (${item.email})`}
        onClick={handleItemClick}
      >
        {/* Main content */}
        <div className="name-email-div">
          <div className="name-div one-line-text2">{item.name}</div>
          <div className="email-div one-line-text2">{item.email}</div>
        </div>
        <div className="height-div">
          <div>{item.height}</div>
        </div>
        <div className="weight-div">
          <div>{item.weight}</div>
        </div>
        <div className="sex-div">
          <div
            className={item.sex === "Male" ? "user-text" : "red-button-styling"}
          >
            {item.sex}
          </div>
        </div>
        <div className="contact-div">
          <div>{item.phone}</div>
        </div>

        {/* Overlay with Framer Motion */}
        <div
          className="overlay"
          // initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          style={{ color: "black" }}
          // animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          // transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <UilEye size="20" color="#000" />
        </div>
      </div>
      {/* </Link> */}
    </li>
  );
};

export default ListItem;
