import style from "./SignUp.module.css";
import logoHome from "../../assets/home.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/features/application";
import { Link, useNavigate } from "react-router-dom";
import Cleave from 'cleave.js/react';
import CleavePhone from '../../../node_modules/cleave.js/dist/addons/cleave-phone.ru';

const SignUp = () => {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.application.error);
    const signingUp = useSelector((state) => state.application.signingUp);
    const isSucceed = useSelector((state) => state.application.isSucceed);

    const navigate = useNavigate();

    const [executor, setExecutor] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const [login, setLogin] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [errorEmail, setErrorEmail] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);
    // const [errorEmpty, setErrorEmpty] = useState("");
    // const [isSucceed, setSucceed] = useState(false);

    const handleChangeExecutor = (e) => {
        setExecutor(e.target.value);
        setErrorMessage("");
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
        setErrorMessage("");
    };

    const handleChangeRepeat = (e, password) => {
        setRepeat(e.target.value);
        if (password !== e.target.value) {
            setPasswordError("Пароли не совпадают");
        } else {
            setPasswordError("");
        }
    };

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
        setErrorMessage("");
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
        setErrorMessage("");
    };

    const handleChangeCity = (e) => {
        setCity(e.target.value);
        setErrorMessage("");
    };

    const handleChangeMail = (e) => {
        setEmail(e.target.value);
        const re =
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (re.test(e.target.value)) {
            setErrorEmail("");
        }
        setErrorMessage("");
    };

    const handleBlurMail = () => {
        const re =
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!re.test(email)) {
            setErrorEmail("Некорректный email");
            setBtnDisabled(true);
        } else {
            setErrorEmail("");
        }
    };

    const handleClickSignUp = (
        login,
        executor,
        password,
        phone,
        city,
        repeat,
        email
    ) => {
        if (!login || !executor || !password || !phone) {
            setErrorMessage("Не заполнены обязательные поля");
        } else if (password !== repeat) {
            setPasswordError("Пароли не совпадают");
        } else {
            dispatch(signUp(login, executor, password, phone, city, email));
        }
    };

    useEffect(() => {
        if (isSucceed) {
            setTimeout(() => {
                navigate("/signin");
                dispatch({type: "application/clearSucceed"})
            }, 2000);
        }
    }, [isSucceed, navigate, dispatch]);

    useEffect(() => {
        if (signingUp || errorEmail || errorMessage) {
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
            setErrorMessage("")
        }
    }, [signingUp, errorMessage, errorEmail]);

    return (
        <div>
            <div className={style.signupHeader}>

                <div className={style.leftBlock}>
                    {" "}
                    <Link to="/home"> <img src={logoHome} alt="home" />Главная</Link>
                </div>
                <div className={style.rightBlock}>
                    <span>Уже есть аккаунт? </span>
                    <b>
                        <Link to="/signin">Войти</Link>
                    </b>
                </div>
            </div>
            <div className={style.signUpContainer}>
                <h3>Регистрация</h3>
                <div className={style.wrapper}>
                    <div className={style.left}>
                        <div className={style.inputContainer}>
                            <div className={style.label}>Имя исполнителя</div>
                            <input
                                value={executor}
                                onChange={(e) => handleChangeExecutor(e)}
                            />
                        </div>
                        {/* <div className={style.error}>{errorEmpty}</div> */}
                        <div className={style.inputContainer}>
                            <div className={style.label}>Придумайте логин</div>
                            <input
                                value={login}
                                onChange={(e) => handleChangeLogin(e)}
                            // onBlur={(e) => handleBlur(e)}
                            />
                        </div>
                        {/* <div className={style.error}>{errorEmpty}</div> */}
                        <div className={style.inputContainer}>
                            <div className={style.label}>Придумайте пароль</div>
                            <form>
                                <input
                                    type="password"
                                    value={password}
                                    autoComplete="off"
                                    onChange={(e) => handleChangePassword(e)}
                                // onBlur={(e) => handleBlur(e)}
                                />
                            </form>
                        </div>
                        {/* <div className={style.error}>{errorEmpty}</div> */}
                        <div className={style.inputContainer}>
                            <div className={style.label}>Повторите пароль</div>
                            <form>
                                <input
                                    type="password"
                                    value={repeat}
                                    autoComplete="off"
                                    onChange={(e) => handleChangeRepeat(e, password)}
                                />
                            </form>

                            <div className={style.error}>{passwordError}</div>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.inputContainer}>
                            <div className={style.label}>Email</div>
                            <input
                                value={email}
                                onChange={(e) => handleChangeMail(e)}
                                onBlur={() => handleBlurMail()}
                            />
                        </div>
                        <div className={style.error}>{errorEmail}</div>
                        <div className={style.inputContainer}>
                            <div className={style.label}>Номер мобильного телефона</div>
                            {/* <input
                                                    
                                                /> */}
                            <Cleave options={{ phone: true, phoneRegionCode: "RU", initValue: "9", prefix: "+7" }}
                                value={phone}
                                onChange={(e) => handleChangePhone(e)} />
                        </div>

                        <div className={style.inputContainer}>
                            <div className={style.label}>Город</div>
                            <input value={city} onChange={(e) => handleChangeCity(e)} />
                        </div>

                    </div>
                </div>
                <div>
                    <div className={style.error}>{errorMessage}</div>
                    {(error && (
                        <div className={style.error}>
                            Ошибка при регистрации
                        </div>
                    )) ||
                        (signingUp && (
                            <div className={style.loading}>
                                Идет регистрация...
                            </div>
                        ))}
                    {isSucceed && (
                        <div>
                            Вы успешно зарегистрированы! Переадресация на
                            страницу авторизации...
                        </div>
                    )}
                    <button
                        onClick={() =>
                            handleClickSignUp(
                                login,
                                executor,
                                password,
                                phone,
                                city,
                                repeat,
                                email
                            )
                        }
                        disabled={btnDisabled}
                    >
                        Зарегистрироваться
                    </button>
                </div>





            </div>
        </div>
    );
};

export default SignUp;
