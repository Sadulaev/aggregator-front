import React, { useEffect, useRef, useState } from "react";
import style from "./cart.module.css";
import { useDispatch } from "react-redux";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";
import { getOneServise } from "../../redux/features/oneServise";

const Cart = ({ card, executor }) => {

  const dispatch = useDispatch();
  let imgResponce = useRef(null);

  useEffect(() => {
    return async () => {
      const res = await fetch(`http://localhost:4000/files/${card.serviceImg[0]}`);
      await (imgResponce.current = res.status);
    }
  })
  const [text, setText] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [sendUser, setSendUser] = useState(false);

  const hundleClick = () => {
    setText(!text);
  };

  const hundleNumber = (e) => {
    setNumber(e.target.value);
  };

  const hundleName = (e) => {
    setName(e.target.value);
  };

  const hundleUserSend = () => {
    if (name && number) {
      setName("");
      setNumber("");
      setSendUser(!sendUser);
      setText(!text);
      return false;
    }
  };

  const closeModelWindow = () => {
    setText(!text);
  };

  const handleGetOneCart = (id) => {
    dispatch(getOneServise(id));
  }

  return (
    <div className={style.cart}>

      <div className={style.name}>
        {/* Название услуги */}
        <Link to={`/oneCard/${card._id}`} onClick={() => handleGetOneCart(card._id)}><p>{card.serviceName}</p></Link>

        <p className={style.time}>🕐</p>
      </div>
      <div className={style.discription}>
        <div className={style.spisane}>
          {/* Описание услуги */}
          <span> {card.description}</span>
          <div className={style.imgCarosel}>
          </div>
          <Carousel card={card} />
        </div>
        <div className={style.money}>
          {/* Цена услуги и место оказания */}
          <div>
            <p>Бюджет</p> <p>{card.price}</p>
          </div>
          <div>
            <p>Регион</p> <p>{executor ? executor.city : "Не указан"}</p>
          </div>
        </div>
      </div>
      <div className={style.executor}>
        <div className={style.info}>
          <img className={style.executor_img} src={imgResponce === 404 ? `http://localhost:4000/${card.serviceImg[0]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlE4nUebua_jEzgXjEGl53V8scqo4wVf_Q1BiO84rNWnxlMIyuiBRcgzo5ChUMaytkKPk&usqp=CAU"} alt="" />
          <div className={style.number_phone}>
            {/* Данные об исполнителе */}
            <p>{executor ? executor.executor : "Не указан"}</p>
            <p>{executor ? executor.phone : "Не указан"}</p>
          </div>
        </div>

        {!text ? (
          <button className={style.sendedButton} onClick={() => hundleClick()}>Откликнуться</button>
        ) : (
          <div className={style.model}>
            <div className={style.vihod} onClick={() => closeModelWindow()}>
              Закрыть
            </div>
            <div className={style.name_adds}>
              <div className={style.add_name}>Введите имя</div>
              <div>
                <input
                  type="text"
                  placeholder="Введите имя.."
                  value={name}
                  onChange={hundleName}
                />
              </div>
              <div className={style.add_name}>Введите номер телефона</div>
              <div>
                <input
                  type="text"
                  placeholder="Введите номер.."
                  value={number}
                  onChange={hundleNumber}
                />
              </div>

              <button
                className={style.send_but}
                onClick={() => hundleUserSend()}
              >
                Отправить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;