import "../../assets/css/common/menuItem.css";
const MenuItem = ({ onClick, itemName }) => {
  return (
    <div className="menu__item" onClick={onClick}>
      <p>{itemName}</p>
    </div>
  );
};

export default MenuItem;
