<<<<<<< HEAD
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;
=======
import Image from 'next/image';  // Import Image from next/image


const TableSearch = () => {
  return (
<div className='w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>	
        <Image src='/search.png' alt='search' width={20} height={20} />
        <input 
          type='text' 
          placeholder='Search...' 
          className='w-[200px] p-2 bg-transparent outline-none' // Added some styling for the input
        />
      </div>  );
}

export default TableSearch;
>>>>>>> cbb1ed8251ea8f1146778e2a33de9e2eecab388d
