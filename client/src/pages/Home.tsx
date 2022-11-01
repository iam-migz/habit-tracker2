import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useHabits } from '../hooks/habit/useHabits';
import Navbar from '../components/layout/Navbar';
import AddHabitModal from '../components/home/AddHabitModal';
import HabitItem from '../components/home/HabitItem';

function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: habits } = useHabits();

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
