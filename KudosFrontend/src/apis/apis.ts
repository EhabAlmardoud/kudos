import axios from "axios";

const baseURL = "http://localhost:8000";

export const createNewUser = (userName: string) => {
  return axios
    .post(`${baseURL}/users?user_name=${userName}`, {})
    .then((response) => console.log(response));
};

export const getRooms = (userID: string) => {
  const response = axios.get(`${baseURL}/rooms?user_id=${userID}`);
  return response;
};

export const createNewRoom = (roomName: string, userID: string) => {
  return axios
    .post(`${baseURL}/rooms?name=${roomName}&user_id=${userID}`, {})
    .then((response) => console.log(response));
};

export const getKudos = (roomID: string) => {
  const response = axios.get(`${baseURL}/kudos?room_id=${roomID}`);
  return response;
};

export const postKudos = (
  public_link_id: string,
  sender: string,
  receiver: string,
  message: string
) => {
  return axios.put(`${baseURL}/kudos`, {
    public_link_id: public_link_id,
    sender: sender,
    receiver: receiver,
    message: message,
  });
};

export const patchKudosMarked = (kudoID: string, isMarkedAsSeen: boolean) => {
  return axios.patch("http://localhost:8000/kudos:marked", {
    kudo_id: kudoID,
    is_marked_as_seen: isMarkedAsSeen,
  });
};
