import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/auth/useLogout';
import {
  UserIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useUserData } from '../../hooks/user/useUserData';
import Dropdown, { DropdownItem } from '../shared/Dropdown';

function Navbar() {
  const navigate = useNavigate();
  const { data: user } = useUserData();
  const { logout } = useLogout();

  const dropdownData: DropdownItem[] = [
    {
      name: 'Profile',
      icon: <UserIcon className="h-5 w-5" />,
      highLightedColor: 'bg-blue-500',
      action: () => navigate('/profile'),
    },
    {
      name: 'Logout',
      icon: <ArrowLeftOnRectangleIcon className="h-5 w-5" />,
      highLightedColor: 'bg-blue-500',
      action: () => logout(),
    },
  ];
  const dropdownButton = (
    <div className="flex">
      <span>{user?.name}</span>
      <ChevronDownIcon className="h-5 w-5 mt-1" />
    </div>
  );

  return (
    <nav className="bg-cyan-400 py-2 px-4">
      <div className="container flex justify-between items-center relative mx-auto ">
        <Link to="/">Habit-Ally</Link>
        <Dropdown button={dropdownButton} content={dropdownData} />
      </div>
    </nav>
  );
}

export default Navbar;
