import { getCookie } from "cookies-next";

export const isAuthenticated = () => {
  const blurtJwt = getCookie('blurt-jwt');

  console.log('----------------------');
  console.log(blurtJwt);
};