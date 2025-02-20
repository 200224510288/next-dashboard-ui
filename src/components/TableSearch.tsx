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