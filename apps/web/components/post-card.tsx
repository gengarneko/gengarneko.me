import { FC, ReactNode } from 'react';

import { lineClamp } from '@twind/line-clamp';
import { clsx as cx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiClock, HiHeart, HiEye, HiAnnotation } from 'react-icons/hi';
import slugify from 'slugify';
import { tw } from 'twind';
import { css } from 'twind/css';

import { Post } from '@/domains/post';

// * --------------------------------------------------------------------------- inter

export interface PostCardProps {
  post: Post;
}

// * --------------------------------------------------------------------------- comp

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const handleClickPost = () => {
    const href = `/post/${slugify(post.title).toLowerCase()}`;
    router.push(href);
  };

  if (!post) return null;

  const default_cover = 'https://www.notion.so/images/page-cover/solid_red.png';
  const src = post.cover ?? default_cover;

  return (
    <div className={tw`w-full border-0 border(b-0 solid black)`} onClick={handleClickPost}>
      <div
        className={tw`
        flex justify-start w-full rounded p-1 hover:cursor-pointer mb-2 first:mt-2
        border(2 solid [#F0E7DB]) hover:border(2 solid black) duration-150
      `}
      >
        <div className={tw`flex w-full`}>
          <div className={tw`w-40 h-24 overflow-hidden rounded flex-none`}>
            <Image src={src} width={160} height={96} alt="" objectFit="cover" />
          </div>

          <div className={tw`overflow-hidden flex flex-col px-2`}>
            <div className={tw`mb-1 text-sm font-semibold truncate`}>{post.title}</div>
            <div className={tw`flex-1 text-xs text-[#333] mt-1`}>
              <div className={tw`h-8 ${lineClamp(2)}`}>{post.description}</div>
            </div>

            <div className={tw`flex items-center text-[#4b5563] mb-1`}>
              <PostCardIconGroup icon={<HiClock />} text="11 months ago" className={cx(tw(time), 'time')} />
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
    <div className={cx(tw`flex items-center text-sm mr-6 w-20`, className)}>
      <div className={tw`w-3.5`}>{icon}</div>
      <p className={tw`ml-1 text-xs truncate`}>{text}</p>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const time = css`
  &.time {
    min-width: 6rem;
  }
`;
