import MenuItem from "./common/MenuItem";
import { useState } from "react";
import "../assets/css/menu.css";
function Menu({ openModal }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const handleMenuItemClick = (menuItemIndex) => {
    setSelectedMenuItem(menuItemIndex);
    openModal(menuItemIndex);
  };
  return (
    <div className="menu__container">
      <div
        className={`menu__container__item ${
          selectedMenuItem === 1 ? "selected" : ""
        }`}
      >
        <MenuItem
          itemName={"Add Student"}
          onClick={() => handleMenuItemClick(1)}
        ></MenuItem>
      </div>
      <div
        className={`menu__container__item ${
          selectedMenuItem === 2 ? "selected" : ""
        }`}
      >
        <MenuItem
          itemName={"Add Course"}
          onClick={() => handleMenuItemClick(2)}
        ></MenuItem>
      </div>
      <div
        className={`menu__container__item ${
          selectedMenuItem === 3 ? "selected" : ""
        }`}
      >
        <MenuItem
          itemName={"Register Student"}
          onClick={() => handleMenuItemClick(3)}
        ></MenuItem>
      </div>
      <div
        className={`menu__container__item ${
          selectedMenuItem === 4 ? "selected" : ""
        }`}
      >
        <MenuItem
          itemName={"Course with no Students"}
          onClick={() => handleMenuItemClick(4)}
        ></MenuItem>
      </div>
      <div
        className={`menu__container__item ${
          selectedMenuItem === 5 ? "selected" : ""
        }`}
      >
        <MenuItem
          itemName={"Search Course"}
          onClick={() => handleMenuItemClick(5)}
        ></MenuItem>
      </div>
      <div
        className={`menu__container__item ${
          selectedMenuItem === 6 ? "selected" : ""
        }`}
      >
        <MenuItem
          itemName={"Search Student"}
          onClick={() => handleMenuItemClick(6)}
        ></MenuItem>
      </div>
    </div>
  );
}

export default Menu;
