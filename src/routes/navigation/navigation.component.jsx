import { Outlet } from "react-router-dom";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.js";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOut } from "../../store/user/user.action.js";
import { useDispatch } from "react-redux";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => {
    dispatch(signOut());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <div>
            <CrwnLogo />
          </div>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as={"span"} onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>

      <Outlet />
    </>
  );
};

export default Navigation;
