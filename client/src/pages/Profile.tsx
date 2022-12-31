import Navbar from '../components/layout/Navbar';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import avatar from '../assets/default_profile.jpg';
import { useUser } from '../hooks/user/useUser';
import { Link } from 'react-router-dom';

function Profile() {
  const { data: user } = useUser();
  return (
    <div>
      <Navbar />

      <div className="md:rounded max-w-[360px] min-h-[470px] border-2 bg-slate-50 mt-16 p-3 mx-auto">
        <Link to={`/`}>
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer ml-2 mt-2" />
        </Link>
        <img
          src={String(avatar)}
          alt=""
          className="rounded-full h-44 mx-auto mt-12"
        />
        <div className="text-center capitalize font-bold mt-4">
          {user?.name}
        </div>

        <div className="text-center mt-4">
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
