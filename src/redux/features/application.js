const initialState = {
    signingIn: false,
    signingUp: false,
    isSucceed: false,
    error: null,
    token: localStorage.getItem("token"),
};

export const application = (state = initialState, action) => {
    switch (action.type) {
        case "application/signin/pending": 
            return {
                ...state,
                signingIn: true,
                signingUp: false,
                error: null,
            };
            case "application/signin/rejected": 
            return {
                ...state,
                signingIn: false,
                signingUp: false,
                error: action.error,
            };
            case "application/signin/fulfilled": 
            return {
                ...state,
                signingIn: false,
                signingUp: false,
                error: null,
                token: action.payload.token
            };
            case "application/signup/pending": 
            return {
                ...state,
                signingIn: false,
                signingUp: true,
                error: null,
                isSucceed: false
            };
            case "application/signup/rejected": 
            return {
                ...state,
                signingIn: false,
                signingUp: false,
                error: action.error,
                isSucceed: false
            };
            case "application/signup/fulfilled": 
            return {
                ...state,
                signingIn: false,
                signingUp: false,
                error: null,
                isSucceed: true
            };
            // Удаление токена 30.05.2022 20:07
            case "application/token":
                return {
                    ...state,
                    token: localStorage.getItem("token")
                }
            // Очистка isSucceed для возможности повторной регистрации
            case "application/clearSucceed":
                return {
                    ...state,
                    isSucceed: false
                }
        default:
            return state;
    }
};

export const signIn = (login, password) => {
    return async (dispatch) => {
        dispatch({ type: "application/signin/pending" });
        try {
            const res = await fetch("http://localhost:4000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ login, password }),
            });
            const json = await res.json();
            if (json.error) {
                dispatch({
                    type: "application/signin/rejected",
                    error: json.error,
                });
                console.log(json)
            } else {
                dispatch({
                    type: "application/signin/fulfilled",
                    payload: json,
                });
                localStorage.setItem('token', json.token);
            }
        } catch (e) {
            dispatch({
                type: "application/signin/rejected",
                error: e.toString(),
            });
        }
    };
};

export const signUp = (login, executor, password, phone, city, mail ) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });
    try {
      const res = await fetch("http://localhost:4000/signup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ login, executor, password, phone, city, mail  }),
      });
      const json = await res.json();
      if (json.error) {
          console.log(json)
          dispatch({
              type: "application/signup/rejected",
              error: json.error,
          });
      } else {
          dispatch({
              type: "application/signup/fulfilled",
              payload: json,
          });
      }
  } catch (e) {
      console.log(e)
      dispatch({
          type: "application/signup/rejected",
          error: e.toString(),
      });
  }
  }
}
