import Link from 'next/link';  // Import Link from next/link
import Image from 'next/image';  // Import Image from next/image
import { role } from '@/lib/data';

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/lesson.png",
        label: "View Orders",
        href: "/list/orders",
        visible: ["office_staff"],
      },
      {
        icon: "/profile.png",
        label: "Manage Agents",
        href: "/list/agents",
        visible: ["office_staff"],
      },
      {
        icon: "/lesson.png",
        label: "Manage Lotteries",
        href: "/list/lotteries",
        visible: ["office_staff"],
      },
      {
        icon: "/lesson.png",
        label: "Order History",
        href: "/list/agents",
        visible: ["office_staff"],
      },



    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["office_staff"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["office_staff"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["office_staff"],
      },
    ],
  },
];


const Menu = () => {
  return (
    <div className='mt-4 text-sm'>
      {menuItems.map(i => (
        <div className='flex flex-col gap-2' key={i.title}>
          <span className='hidden lg:block text-gray-400 font-light my-4'>{i.title}</span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-Sky"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
            return null; // To ensure every case has a return
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
