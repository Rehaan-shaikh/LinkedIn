import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { getUserByUsername } from "@/lib/actions/user";
import Post from "@/components/Posts";
import FollowButton from "@/components/FollowButton";
import { getPostsByUserId } from "@/lib/actions/post";
import { cookies } from "next/headers";

export default async function UserPage({ params }) {
  let data = null;

  const cookieStore = await cookies(); // ✅ await here
  const userId = cookieStore.get("user_id")?.value;

  try {
    const id = params.id; // ✅ Fix: No await needed
    console.log("Fetching user with ID:", id);

    data = await getUserByUsername(id); //the data VAriable INCLUDES FOLLOWERS, FOLLOWING TOO
    console.log("Fetched user data:", data);

    if (data) {
      const posts = await getPostsByUserId(data.id);
      data.posts = posts;
    }
  } catch (error) {
    console.error("Failed to fetch user or posts:", error);
  }

  return (
    <div className="max-w-xl mx-auto  min-h-screen mt-2">
      <div className="flex items-center space-x-2 py-2 mb-5 px-3 sticky top-3 z-50 bg-[#f9f2ee] rounded-xl shadow-sm">
        <Link href="/" className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>

      {!data && (
        <div className="max-w-md mx-auto mt-10 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-center shadow-sm">
          <h2 className="text-lg font-semibold">User not found</h2>
        </div>
      )}

      {data && (
        <div className="bg-[#f9f2ee] rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="">
              <div className="flex items-center space-x-4">
                <img
                  src={data.avatar}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {data.firstName
                      ? `${data.firstName} ${data.lastName}`
                      : data.username}
                  </h2>
                  {/* <p className="text-gray-500">@{data.username}</p> */}
                  {data.bio && (
                    <p className="text-sm text-gray-700 mt-1">{data.bio}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex space-x-4">
                <div>
                  <span className="font-bold">{data.following.length}</span>{" "}
                  Following
                </div>
                <div>
                  <span className="font-bold">{data.followers.length}</span>{" "}
                  Followers
                </div>
              </div>

              <div className="mt-4 flex-1">
                <FollowButton profileUser={data} userId={userId} />
              </div>
            </div>
          </div>
        </div>
      )}

      {data?.posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
