'use client'
import { SignOut } from '@/lib/actions/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLinkedin } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import MiniProfile from './miniProfile';

export default function Sidebar({ user }) {
  const router = useRouter();

  async function handleSignOut() {
    const res = await SignOut();
    if (res?.success) {
      router.push('/sign-in');
    } else {
      alert('Sign out failed');
    }
  }

  return (
    <div className="flex flex-col p-4 pt-10 h-screen items-center">
      <div className="flex flex-col justify-between bg-[#f9f2ee] rounded-xl shadow-md w-full  px-4 py-6">
        {/* Top section: Logo + Navigation */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <Link href="/">
            <FaLinkedin className="w-20 h-20 text-blue-700 cursor-pointer p-2 hover:bg-blue-100 rounded-full transition-all duration-200" />
          </Link>

          {/* Home Link */}
          <Link
            href="/"
            className="flex items-center p-2 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
          >
            <HiHome className="w-7 h-7" />
            <span className="font-bold hidden xl:inline">Home</span>
          </Link>

        {/* Bottom section: Profile + Signout */}
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 pt-6">
          
          {/* MiniProfile component if needed */}
          <MiniProfile user={user} />

          {/* Username */}
          <div className="text-center">
            <h2 className="font-semibold text-sm text-gray-800">{user.username}</h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>


          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="bg-blue-500 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow font-semibold text-sm"
          >
            Sign Out
          </button>
        </div>
        </div>


      </div>
    </div>
  );
}
