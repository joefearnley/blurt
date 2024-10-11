import { getCookie } from "cookies-next";

export const isAuthenticated = () => {
  const blurtJwt = getCookie('blurt-jwt');

  if (!blurtJwt || blurtJwt === '') {
    console.log('return,, false');
    return false;
  }

  // validate jqt?

  return true;
};