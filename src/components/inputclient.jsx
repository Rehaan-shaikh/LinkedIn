'use client';

import { HiOutlinePhotograph } from 'react-icons/hi';
import { useActionState, useEffect, useRef, useState } from 'react';
import { Post } from '@/lib/actions/post';

export default function InputClient({ user }) {
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState('');
  const imagePickRef = useRef(null);
  const [formState, formAction,isPending] = useActionState(Post, {});

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (formState.success) {
      location.reload(); // 🔄 Reload the page
    }
  }, [formState.success]);

  const isPostDisabled = formState.submitting || (!content.trim());

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <form action={formAction}>
        <div className="flex space-x-3 w-full">
          <img
            src={user.avatar}
            alt="user-img"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover"
          />
          <div className="w-full divide-y divide-gray-200">
            <textarea
              name="content"
              className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
              placeholder="What's happening"
              rows="2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            {selectedFile && (
              <img
                onClick={() => {
                  setSelectedFile(null);
                  setImageFileUrl(null);
                }}
                src={imageFileUrl}
                alt="selected-img"
                className="w-full max-h-[250px] object-cover cursor-pointer mt-2"
              />
            )}

            <div className="flex items-center justify-between pt-2.5">
              <HiOutlinePhotograph
                className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
                onClick={() => imagePickRef.current.click()}
              />
              <input
                type="file"
                name="image"
                ref={imagePickRef}
                accept="image/*"
                hidden
                onChange={addImageToPost}
              />
              <input name="user" defaultValue={JSON.stringify(user)} hidden />
              <button
                type="submit"
                disabled={isPending || isPostDisabled}
                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
              >
                {isPending ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
