import Navbar from '../components/layout/Navbar';
import { useEffect, useState } from 'react';
import { getDatesInMonth } from '../utils/dateHelper';
import { PlusIcon } from '@heroicons/react/24/solid';
import AddHabitModal from '../components/home/AddHabitModal';
import { useHabitData } from '../hooks/habit/useHabitData';
import HabitItem from '../components/home/HabitItem';

function Home() {
  const [dates, setDates] = useState<Date[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: habits } = useHabitData();

  useEffect(() => {
    const today = new Date();
    setDates(
      getDatesInMonth(today.getMonth(), today.getFullYear(), today.getDate()),
    );
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container border-2 bg-slate-50 mt-12 p-4 max-w-[640px] mx-auto md:rounded">
        <div className="text-3xl flex justify-between items-center">
          <h1>Your Habits</h1>
          <PlusIcon
            onClick={() => setIsAddModalOpen(true)}
            className="h-7 w-7 cursor-pointer"
          />
        </div>
        {habits &&
          habits.map((habit, index) => <HabitItem key={index} habit={habit} />)}
      </div>

      <AddHabitModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
    </div>
  );
}

export default Home;
