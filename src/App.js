import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios";

// PAGE IMPORTS
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import CoinPage from "./components/CoinPage";

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [coins, setCoins] = useState([]);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
    });
  }, [url]);

  return (
    <ThemeProvider>
        <AuthContextProvider>
        <NavBar />
        <Routes>
            <Route path="/" element={<Home coins={coins} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/coin/:coinID" element={<CoinPage />}>
            <Route path=":coinID" />
            </Route>
        </Routes>
        <Footer />
        </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
