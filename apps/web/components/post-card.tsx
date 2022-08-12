import { FC } from 'react';
import { tw } from 'twind';
import { lineClamp } from '@twind/line-clamp';
import { Post } from '../domains/post';

// * --------------------------------------------------------------------------- inter

export interface PostCardProps {
  post: Post;
}

// * --------------------------------------------------------------------------- comp

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div
      className={tw`
        flex justify-start w-full rounded mb-1 p-1 hover:cursor-pointer  
        border(2 solid [#F0E7DB]) hover:border(2 solid black) duration-150
      `}
    >
      <div className={tw`flex w-full`}>
        <img alt="" src={post.cover} className={tw`object-contain w-40 h-full rounded`} />

        <div className={tw`shrink overflow-hidden flex flex-col px-2`}>
          <div className={tw`mb-1 truncate`}>{post.title}</div>
          <div className={tw`flex-1 text-sm text-[#4b5563] ${lineClamp(3)}`}>
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
            {post.description}
          </div>

          <div>点赞 评论 收藏</div>
        </div>
      </div>
    </div>
  );
};
