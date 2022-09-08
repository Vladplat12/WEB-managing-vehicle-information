import Admin from "./pages/admin";
import Auth from "./pages/Auth";
import CarPage from "./pages/carPage";
import Shop from "./pages/shop";
import User_main from "./pages/user_main";
import {
  ADMIN_ROUTE,
  CAR_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USER_MAIN_ROUTE,
} from "./utils";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: USER_MAIN_ROUTE,
    Component: User_main,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: CAR_ROUTE + "/:id",
    Component: CarPage,
  },
];
