import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/auth/useLogout';
import { UserIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useUserData } from '../../hooks/user/useUserData';

function Navbar() {
  const { data } = useUserData();
  const { logout } = useLogout();

  return (
    <nav className="bg-cyan-400 py-2 px-4">
      <div className="container flex justify-between items-center relative mx-auto ">
        {/* logo */}
        <Link to="/">Habit-Ally</Link>

        <Menu>
          {/* dropdown button */}
          <Menu.Button>
            <div className="flex">
              <span>{data?.name}</span>
              <ChevronDownIcon className="h-5 w-5 mt-1" />
            </div>
          </Menu.Button>
          {/* dropdown items */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-8 bg-gray-50 rounded-lg border border-gray-100 shadow-lg z-50">
              <div className="flex flex-col p-4 space-y-2 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      }  group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2`}
                    >
                      <UserIcon className="h-5 w-5 mt-[1.5px]" />
                      <span>Profile</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => logout()}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      }  group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer space-x-2`}
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
