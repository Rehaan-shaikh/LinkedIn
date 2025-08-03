import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import moment from 'moment';
import Icons from './icons';import { cookies } from 'next/headers';
;

export default async function Post({ post }) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;
return (
  <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
    <div className='flex w-full'>
      <Link href={`/user/${post?.userId}`}>
        <img
          src={post?.profileImg}
          alt='user-img'
          className='h-11 w-11 rounded-full mr-4'
        />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <span className='text-xs truncate max-w-32'>@{post?.username}</span>
            <span className='text-xl text-gray-500'>·</span>
            <span className='text-xs text-gray-500 flex-1 truncate max-w-32'>
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <HiDotsHorizontal className='text-sm' />
        </div>

        <Link href={`/posts/${post?.id}`}>
          <p className='text-gray-800 text-sm my-3 w-full'>{post?.text}</p>
          {post?.image && (
            <img src={post?.image} className='rounded-2xl w-full max-h-[400px] object-cover' />
          )}
        </Link>

        <Icons post={post} currentUserId={userId} />
      </div>
    </div>
  </div>
);

}
