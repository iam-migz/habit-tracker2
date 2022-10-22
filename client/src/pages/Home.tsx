import { useLogout } from '../hooks/auth/useLogout';
import { useUser } from '../hooks/user/useUser';

function Home() {
  const { data } = useUser();
  const { logout } = useLogout();

  const logoutHandler = () => {
    logout();
  };
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>{data?.id}</li>
        <li>{data?.email}</li>
        <li>{data?.name}</li>
      </ul>
      <button
        onClick={logoutHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
