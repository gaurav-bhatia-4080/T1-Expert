import { useState } from "react";
import { MdEdit, MdCheckCircle } from "react-icons/md";
import { toast } from "react-hot-toast";
import "../css/FoodDBItemHover.css";
import { handleCustomToast } from "../utils/MyToasts";
import axios from "axios";
import { useRecoilState } from "recoil";
import { getfooddb } from "../store/atoms/listsForMain";
const FoodDBListItem = ({ item, index, details }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableItem, setEditableItem] = useState(item);
  const [fooddbList, setFooddbList] = useRecoilState(getfooddb);

  const [fName, setFname] = useState(item.name);
  const [fSize, setFsize] = useState(item.serving_size);
  const [fCarbs, setFcarbs] = useState(item.carbs);
  const [fCalories, setFcalories] = useState(item.calories);
  const [fFat, setFfat] = useState(item.fat);
  const [fProtein, setFprotein] = useState(item.protein);

  const handleDoubleClick = () => {
    handleCustomToast();
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    toast.promise(
      axios.post(
        `${process.env.REACT_APP_API_URL}/editFooddbEntry`,
        {
          updatedItem: {
            _id: item._id,
            name: fName,
            serving_size: fSize,
            fat: fFat,
            protein: fProtein,
            carbs: fCarbs,
            calories: fCalories,
          },
        },
        { withCredentials: true }
      ),
      {
        loading: "Saving...",
        success: (res) => {
          setIsEditing(false);
          setFooddbList((prevList) =>
            prevList.map((food) =>
              food._id === item._id
                ? {
                    ...food,
                    name: fName,
                    serving_size: fSize,
                    fat: fFat,
                    protein: fProtein,
                    carbs: fCarbs,
                    calories: fCalories,
                  }
                : food
            )
          );
          return "Changes saved successfully.";
        },
        error: (err) => {
          console.log("error dditing");
          console.log(err);
          setIsEditing(false);
          return "Something went wrong. Try again!";
        },
      },
      {
        iconTheme: {
          primary: "black",
          secondary: "white",
        },

        style: {
          fontFamily: "'Balsamiq Sans', cursive",
          border:"1px solid rgb(207, 207, 207)"
        },
      }
    );
  };

  return (
    <li>
      <div
        className={`request-card-item all-scrollbar-style-none ${
          isEditing ? "editing" : ""
        }`}
        onDoubleClick={handleDoubleClick}
        title={`${item.name} (Serving Size: ${item.serving_size})`}
      >
        {isEditing ? (
          <>
            <div className="food-name">
              <input
                type="text"
                name="name"
                className="fooddb-name-input"
                value={fName}
                onChange={(e) => setFname(e.target.value)}
              />
              <input
                type="text"
                className="fooddb-name-input"
                name="serving_size"
                value={fSize}
                onChange={(e) => setFsize(e.target.value)}
              />
            </div>
            <div className="carbs-qty">
              <input
                type="number"
                name="carbs"
                className="fooddb-other-inputs"
                value={fCarbs}
                onChange={(e) => setFcarbs(e.target.value)}
              />
            </div>
            <div className="calories-qty">
              <input
                type="number"
                className="fooddb-other-inputs"
                name="calories"
                value={fCalories}
                onChange={(e) => setFcalories(e.target.value)}
              />
            </div>
            <div className="fat-qty">
              <input
                type="number"
                name="fat"
                className="fooddb-other-inputs"
                value={fFat}
                onChange={(e) => setFfat(e.target.value)}
              />
            </div>
            <div className="protein-qty">
              <input
                type="number"
                className="fooddb-other-inputs"
                name="protein"
                value={fProtein}
                onChange={(e) => setFprotein(e.target.value)}
              />
            </div>
            <div className="save-button-fooddb">
              <MdCheckCircle
                size={27}
                color="black"
                style={{ cursor: "pointer" }}
                onClick={handleSaveClick}
              />
            </div>
          </>
        ) : (
          <>
            <div className="food-name">
              <div className="one-line-text">{item.name}</div>
              <div className="one-line-text">({item.serving_size})</div>
            </div>

            <div className="carbs-qty">{item.carbs}</div>
            <div className="calories-qty">{item.calories}</div>
            <div className="fat-qty">{item.fat}</div>
            <div className="protein-qty">{item.protein}</div>
            <div className="save-button-fooddb">
              <MdEdit
                size={27}
                color="black"
                style={{ cursor: "pointer" }}
                onClick={handleDoubleClick}
              />
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default FoodDBListItem;
