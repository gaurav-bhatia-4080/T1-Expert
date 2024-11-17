import {toast} from 'react-hot-toast';
import { MdEdit } from 'react-icons/md';
export const handleCustomToast = () => {
  toast.custom((t) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px", // Applying custom padding
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        border: "1px solid rgb(207, 207, 207)", // Applying custom border
        fontFamily: "Balsamiq Sans, sans-serif", // Applying custom font
      }}
    >
      {/* Icon */}
      <MdEdit
        size={24}
        color="white"
        style={{
          marginLeft: "10px",
          padding: "4px",
          borderRadius: "50%",
          background: "#7a3cff",
          boxShadow: "0px 0px 9px #7a3cff",
          cursor: "pointer",
          marginRight: "15px",
        }}
      />

      {/* Text Content */}
      <div>
        <strong style={{ fontFamily: "Balsamiq Sans, sans-serif" }}>
          Edit mode on
        </strong>
        <div
          style={{
            fontSize: "14px",
            color: "#555",
            fontFamily: "Balsamiq Sans, sans-serif",
          }}
        >
          Make changes and save
        </div>
      </div>
    </div>
  ));
};

export const handleToastPromise = () => {
};
