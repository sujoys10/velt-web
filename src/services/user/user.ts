import { dummyUsersList } from "./constants";

const userService = () => {
  const randomIndex = Math.floor(Math.random() * 5);
  return dummyUsersList[randomIndex];
}

 const getUser = () => {
  const currentUser = userService();
  return currentUser;
}

export default getUser;