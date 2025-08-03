// app/search/[searchTerm]/page.jsx or .tsx

import Post from '@/components/Posts';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { searchPostsByTerm } from '@/lib/actions/post';

export default async function SearchPage({ params }) {
  let data = [];

  try {
    data = await searchPostsByTerm(params.searchTerm);
  } catch (error) {
    console.error('Failed to fetch search results', error);
  }

  return (
    <div>
      <div className="flex items-center rounded-xl space-x-2 py-2 px-3 sticky top-4 z-50 bg-[#f9f2ee] shadow">
        <Link href="/" className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>
      <div className="border-b p-6">
        <h1 className="text-center text-lg">
          Search results for &quot;{decodeURIComponent(params.searchTerm)}&quot;
        </h1>
      </div>
      
      {data.length === 0 ? (
        <h1 className="text-center pt-6 text-2xl">No results found</h1>
      ) : (
        data.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}
