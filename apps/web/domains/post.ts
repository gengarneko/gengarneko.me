export interface Post {
  id: string;
  cover?: string;
  title: string;
  description?: string;
  update_time: number | string;
  create_time: number | string;
  author?: string;
  status: string;
  likes_count: number;
  views_count: number;
  tags: any[];
}

export type PostDTO = Partial<Post>;
