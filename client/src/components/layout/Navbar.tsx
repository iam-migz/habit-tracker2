import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';

import Dropdown, { DropdownItem } from '../shared/Dropdown';
import { useUser } from '../../hooks/user/useUser';
import api from '../../utils/axiosInstance';

function Navbar() {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const logout = async () => {
    await api.delete('/sessions');
    navigate('/login');
  };

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
