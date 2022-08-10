export interface Post {
  cover?: string;
  title: string;
  description?: string;
  update_time: number;
  create_time: number;
  author?: string;
  status: string;
  likes_count: number;
  views_count: number;
  tags: any[];
}

export type PostDTO = Partial<Post>;
