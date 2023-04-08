export interface UserModel {
  id: string;
  name: string;
}

export interface KudosRoomModel {
  id: string;
  name: string;
  user: string;
  public_link_id: string;
  created_at: string;
}

export interface Kudo {
  id: string;
  room_id: string;
  sender: string;
  receiver: string;
  message: string;
  is_marked_as_seen: boolean;
  created_at: string;
}

export interface KudoForm {
  sender: string;
  message: string;
  receiver: string;
}
