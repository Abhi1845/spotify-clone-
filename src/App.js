import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      // console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (
    <div>
      <h1>{process.env.REACT_APP_TEST}</h1>
      {token ? <Spotify /> : <Login />}
    </div>
  );
}

export default App;
