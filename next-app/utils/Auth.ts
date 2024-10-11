import { getCookie } from "cookies-next";

export const isAuthenticated = () => {
  const blurtJwt = getCookie('blurt-jwt');

  if (!blurtJwt || blurtJwt === '') {
    return false;
  }

  // validate jqt?

  return true;
};