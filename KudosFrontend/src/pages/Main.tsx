import { useEffect, useState } from "react";
import _ from "lodash";
import {
  getRooms,
  createNewRoom,
  getKudos,
  postKudos,
  patchKudosMarked,
} from "apis/apis";
import { KudosRoomModel, Kudo, KudoForm } from "models/main.model";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<KudoForm>({
    sender: "",
    message: "",
    receiver: "",
  });
  const [newRoomName, setNewRoomName] = useState("");

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState<KudosRoomModel>();

  const [kudos, setKudos] = useState<Kudo[]>([]);

  useEffect(() => {
    handleGetRooms();
  }, []);

  const handleGetRooms = () => {
    getRooms("user_id_1").then((response: any) => setRooms(response?.data));
  };

  const getKudosByRoomID = (roomID: string) => {
    getKudos(roomID).then((response) => setKudos(response?.data));
  };

  const handlePostKudos = () => {
    if (selectedRoom) {
      postKudos(
        selectedRoom?.public_link_id,
        form?.sender,
        form?.receiver,
        form?.message
      ).then(() => {
        getKudosByRoomID(selectedRoom?.id);
        setForm({ sender: "", message: "", receiver: "" });
      });
    }
  };

  const renderCreateNewRoom = () => {
    return (
      <div className="flex gap-3 justify-center">
        <input
          type="text"
          className="outline-violet-100 shadow-lg"
          value={newRoomName}
          onChange={(event) => setNewRoomName(event?.target?.value)}
        />

        <button
          onClick={() =>
            _.size(newRoomName) > 0 &&
            createNewRoom(newRoomName, "user_id_1").then(() => {
              setNewRoomName("");
              handleGetRooms();
            })
          }
          disabled={_.size(newRoomName) === 0}
        >
          Create new room
        </button>
      </div>
    );
  };

  const renderRooms = () => {
    return (
      <div>
        <div className="flex justify-between my-2">
          <div className="flex gap-4 px-4">
            <button onClick={handleGetRooms}>Update</button>
            <div className="flex gap-4">
              {_.map(rooms, (room: KudosRoomModel) => (
                <button
                  className={`${
                    selectedRoom?.id === room?.id && "bg-green-700"
                  }`}
                  onClick={() => {
                    setSelectedRoom(room);
                    getKudosByRoomID(room?.id);
                  }}
                >
                  {room?.name}
                </button>
              ))}
            </div>
          </div>
          {renderCreateNewRoom()}
        </div>
        {renderSelectedRoom()}
      </div>
    );
  };

  const renderSelectedRoom = () => {
    if (selectedRoom) {
      return (
        <div className="flex gap-4 items-center mx-8">
          <div>Selected room: {selectedRoom?.name}</div>
          <button
            onClick={() => navigate(`/room/${selectedRoom?.public_link_id}`)}
          >
            Public link
          </button>
        </div>
      );
    }
  };

  const renderNewKudoForm = () => {
    return (
      <div className="flex justify-around">
        <div>
          <button
            onClick={() => selectedRoom && getKudosByRoomID(selectedRoom?.id)}
          >
            Update Kudos
          </button>
        </div>
        <div className="flex gap-4">
          {renderFormTextInput("sender")}
          {renderFormTextInput("receiver")}
          {renderFormTextInput("message", "w-64")}
          <div className="flex justify-center items-center">
            <button onClick={handlePostKudos}>Submit Kudos</button>
          </div>
        </div>
      </div>
    );
  };

  const renderFormTextInput = (key: keyof KudoForm, inputWidth?: string) => {
    return (
      <div className="flex flex-col gap-y-2 items-start">
        <div>{_.upperFirst(key)}:</div>
        <input
          type="text"
          className={`outline-violet-100 shadow-lg ${inputWidth}`}
          value={form?.[key]}
          onChange={(event) =>
            setForm({ ...form, [key]: event?.target?.value })
          }
        />
      </div>
    );
  };

  const renderKudos = () => {
    const sortedKudos = _.sortBy(kudos, ["is_marked_as_seen"]);
    return (
      <div className="px-6">
        <div className="grid grid-cols-10 gap-4 border-b-2 mb-2">
          <div>From </div>
          <div>To </div>
          <div className="col-span-7">Message</div>
          <div>Viewed</div>
        </div>
        {_.map(sortedKudos, (kudo) => {
          return (
            <div className="grid grid-cols-10 gap-4 py-3 my-2 rounded bg-slate-50 shadow-md">
              <div>{kudo?.sender} </div>
              <div>{kudo?.receiver} </div>
              <div className="col-span-7">{kudo?.message} </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  patchKudosMarked(kudo?.id, !kudo?.is_marked_as_seen).then(
                    () => selectedRoom && getKudosByRoomID(selectedRoom?.id)
                  )
                }
              >
                {kudo?.is_marked_as_seen ? "Seen" : "Not Seen"}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {renderRooms()}

      {renderNewKudoForm()}

      {renderKudos()}
    </div>
  );
};

export default Main;
