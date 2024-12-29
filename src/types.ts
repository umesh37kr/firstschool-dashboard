export interface Students {
  _id: string;
  avatar: string;
  rollNumber: number;
  firstName: string;
  lastName: string;
  gender: string;
  classes: string;
  section: string;
  dateOfBirth: string;
  mobile: number;
  address: string;
  createdAt: string;
}

export interface ErrorResponse {
  message: string;
}

export interface MessageList {
  _id: string;
  name: string;
  mobile: number;
  message: string;
}
export interface NoticeList {
  _id: string;
  notice: string;
  createdAt: string;
}
