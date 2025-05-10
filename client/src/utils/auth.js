export const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Check if the token exists
  return !!token; // Return true if the token exists, otherwise false
};