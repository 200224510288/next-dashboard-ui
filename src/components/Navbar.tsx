import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      {/* SEARCH BAR */}
      <div className='hidden md:flex items-center gap-2'>
        <Image src='/search.png' alt='search' width={20} height={20} />
        <input 
          type='text' 
          placeholder='Search...' 
          className='border rounded-md px-2 py-1' // Added some styling for the input
        />
      </div>

      {/* Icons And USERS */}
      <div className='flex items-center gap-4'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src="/message.png" alt="message" width={20} height={20} />
        </div>

        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src="/announcement.png" alt="announcement" width={20} height={20} />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
