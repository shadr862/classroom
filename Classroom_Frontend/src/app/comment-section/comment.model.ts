export interface CommentDto {
  id?:string;
  userId: string;
  assignmentId?: string;
  announcementId?: string;
  name: string;
  content: string;
  createdAt: string;
}
