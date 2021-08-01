export default function isLogged() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token;
}
