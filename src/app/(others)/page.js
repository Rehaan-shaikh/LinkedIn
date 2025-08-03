import Feed from "@/components/feed";
import Input from "@/components/input";
import { getallPosts } from "@/lib/actions/post";

export default async function Home() {
  const data = await getallPosts();

  return (
    <div className="min-h-screen max-w-xl mx-auto px-2 sm:px-4">
      {/* Header container with rounded corners and light background */}
      <div className="rounded-xl bg-[#f9f2ee] px-4 py-3 mt-4 shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>

      <div className="mt-6 space-y-6">
        <Input />
        <Feed data={data} />
      </div>
    </div>
  );
}
