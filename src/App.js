import { useEffect } from "react";
import { checkUserSessions } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSessions());
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />

        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
