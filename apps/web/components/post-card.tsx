import { FC, ReactNode } from 'react';
import { tw } from 'twind';
import { lineClamp } from '@twind/line-clamp';
import { HiClock, HiHeart, HiEye, HiAnnotation } from 'react-icons/hi';
import { Post } from '../domains/post';
import { css } from 'twind/css';

// * --------------------------------------------------------------------------- inter

export interface PostCardProps {
  post: Post;
}

// * --------------------------------------------------------------------------- comp

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const handleClickPost = () => {};

  return (
    <div className={tw`w-full border-0 border(b-0 solid black)`} onClick={handleClickPost}>
      <div
        className={tw`
        flex justify-start w-full rounded p-1 hover:cursor-pointer mb-2 first:mt-2
        border(2 solid [#F0E7DB]) hover:border(2 solid black) duration-150
      `}
      >
        <div className={tw`flex w-full`}>
          <img alt="" src={post.cover} className={tw`object-cover w-40 h-24 rounded flex-none`} />

          <div className={tw`shrink overflow-hidden flex flex-col px-2`}>
            <div className={tw`mb-1 truncate`}>{post.title}</div>
            <div className={tw`flex-1 text-sm text-[#4b5563]`}>
              <div className={tw`h-10 ${lineClamp(2)}`}>{post.description}</div>
            </div>

            <div className={tw`flex items-center text-[#4b5563] mb-1`}>
              <PostCardIconGroup icon={<HiClock />} text="11 months ago" className={tw`date-icon ${width}`} />
              <PostCardIconGroup icon={<HiEye />} text="890890890890890890" />
              <PostCardIconGroup icon={<HiAnnotation />} text="111" />
              <PostCardIconGroup icon={<HiHeart />} text="890890890890890890" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// * ---------------------------

const PostCardIconGroup: FC<{ icon: ReactNode; text: string; className?: string }> = ({ icon, text, className }) => {
  return (
    <div className={tw`flex items-center text-sm mr-6 w-20 ${className}`}>
      <div className={tw`w-3.5`}>{icon}</div>
      <p className={tw`ml-1 text-xs truncate`}>{text}</p>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const width = css`
  &.date-icon {
    width: 12rem;
  }
`;
