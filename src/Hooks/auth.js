import { useState, useEffect, createContext, useContext, useMemo } from "react";
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const AuthContext = createContext();

/*
@Source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/#basic-routing-with-routes
*/
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userCoin, setUserCoin] = useState(0);
  const [userCart, setUserCart] = useState([]);
  const [userCartHistory, setUserCartHistory] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const userData = getLSUserData();
    if (userData && userData.token) {
      setUserToken(userData.token);
    }
    if (userData && userData.email) {
      setUserEmail(userData.email);
    }
    if (userData && userData.avatar) {
      setUserAvatar(userData.avatar);
    }
    if (userData && userData.firstName) {
      setUserFirstName(userData.firstName);
    }
    if (userData && userData.lastName) {
      setUserLastName(userData.lastName);
    }
    if (userData && userData.coin) {
      setUserCoin(userData.coin);
    }
    if (userData && userData.cart) {
      setUserCart(userData.cart);
    }
    if (userData && userData.cartHistory) {
      setUserCartHistory(userData.cartHistory);
    }
    setShouldRefresh(false);
  }, [isAuthLoading]);

  useEffect(() => {
    const fetchUserData = async (token) => {
      setIsAuthLoading(true);
      const res = await fetch(`${urlEndpoint}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [process.env.REACT_APP_TOKEN_HEADER_KEY]: token,
        },
      });
      const responseJSON = await res.json();

      if (responseJSON.success) {
        setLSUserData(
          responseJSON.token,
          responseJSON.email,
          responseJSON.avatar,
          responseJSON.firstName,
          responseJSON.lastName,
          responseJSON.coin,
          responseJSON.cart,
          responseJSON.cartHistory
        );
      }
      setIsAuthLoading(false);
    };
    if (shouldRefresh) {
      fetchUserData(userToken);
    }
  }, [shouldRefresh]);

  // call this function when you want to register the user
  const register = async (email, password) => {
    setIsAuthLoading(true);
    const registerResult = await registerUser(email, password);
    setIsAuthLoading(false);
    return registerResult;
  };

  // call this function when you want to authenticate the user
  const login = async (email, password) => {
    setIsAuthLoading(true);
    const loginResult = await loginUser(email, password);
    if (loginResult.success) {
      setLSUserData(
        loginResult.token,
        loginResult.email,
        loginResult.avatar,
        loginResult.firstName,
        loginResult.lastName,
        loginResult.coin,
        loginResult.cart,
        loginResult.cartHistory
      );
    }
    setIsAuthLoading(false);
    return loginResult;
  };

  // call this function to sign out logged in user
  const logout = async () => {
    setIsAuthLoading(true);
    await removeLSUserData(); // This has to be awaited for the useEffect to work
    setUserToken(null);
    setUserEmail("");
    setIsAuthLoading(false);
  };

  /*
    https://reactjs.org/docs/hooks-reference.html#usememo
    Memoization is essentially caching. The variable value will only be recalculated if the
    variables in the watched array change.
  */
  const value = useMemo(
    () => ({
      userToken,
      userEmail,
      userAvatar,
      userFirstName,
      userLastName,
      userCoin,
      userCart,
      userCartHistory,
      login,
      logout,
      register,
      setShouldRefresh,
    }),
    [
      userToken,
      isAuthLoading,
      userCart,
      userCartHistory,
      userCoin,
      userFirstName,
      userLastName,
      userAvatar,
      
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const registerUser = async (email, password) => {
  const url = `${urlEndpoint}/users/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const loginUser = async (email, password) => {
  const url = `${urlEndpoint}/users/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const setLSUserData = (
  token,
  email,
  avatar,
  firstName,
  lastName,
  coin,
  cart,
  cartHistory
) => {
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({
      token,
      email,
      avatar,
      firstName,
      lastName,
      coin,
      cart,
      cartHistory,
    })
  );
};

const removeLSUserData = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getLSUserData = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};
