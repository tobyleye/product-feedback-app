import { Redirect, Route, useLocation } from "react-router";
import { useCurrentUser } from "../context/currentuser";

export default function PrivateRoute(props) {
  let [currentUser] = useCurrentUser();
  let location = useLocation();
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect to={`/auth/login?returnUrl=${location.pathname}`} />
  );
}
