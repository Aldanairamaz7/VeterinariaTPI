import { Route, Routes } from "react-router";
import APCard from "../APCard/APCard";
import AdminFunction from "./AdminFunction.js";
import UserCard from "../UserCard/UserCard.jsx";

const AdminPanel = () => {
  return (
    <div className="w-100 h-100 d-flex flex-wrap justify-content-around">
      {AdminFunction.map((el) => (
        <APCard
          typeCard={el.typeFunc}
          summaryFunc={el.summaryFunc}
          pathFunc={el.pathFunc}
          key={el.typeCard}
        />
      ))}
    </div>
  );
};

export default AdminPanel;
