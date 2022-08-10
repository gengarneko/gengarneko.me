import { FC } from 'react';
import { tw } from 'twind';

// * --------------------------------------------------------------------------- inter

export interface PostCardProps {
  id: string;
}

// * --------------------------------------------------------------------------- comp

export const PostCard: FC<PostCardProps> = ({ id }) => {
  return <div className={tw`flex justify-center`}>post card: {id}</div>;
};
