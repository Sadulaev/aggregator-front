import React from "react";
import Choose from "./Choose/Choose";
import Categories from "./Category/Categories";
import style from "./Main.module.css";
import SearchBlock from './SearchBlock/SearchBlock'
import Advantages from "./Advantages/Advantages";
import Promotion from "./Promotion/Promotion";
import OboutUs from "./OboutUs/OboutUs";
import Carousel from "../Carousel/Carousel";

const Main = () => {
  return (
    <div className={style.main}>
      <SearchBlock />
      <Choose />
      <Categories />
      <Advantages />
      <Promotion />
      <OboutUs />
    </div>
  );
};

export default Main;
