export interface ClassroomCreate {
  className: string;
  description: string;
  teacherId: string;
}

export interface ClassroomList {
  id: string;
  className: string;
  description: string;
  accessCode :string;
  createdAt: string;
}
