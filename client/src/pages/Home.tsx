import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useHabits } from '../hooks/habit/useHabits';
import Navbar from '../components/layout/Navbar';
import AddHabitModal from '../components/home/AddHabitModal';
import HabitItem from '../components/home/HabitItem';
import DateSlider from '../components/habit/DateSlider';

function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: habits } = useHabits();

  return (
    <div>
      <Navbar />

      <div className="border-2 bg-slate-50 mt-12 p-3 mx-auto md:rounded">
        <div className="flex justify-between items-center">
          <h1>Your Habits</h1>
          <Bars3Icon className="h-6 w-6 cursor-pointer" />
        </div>
        <DateSlider />
        {habits &&
          habits.map((habit, index) => (
            <HabitItem key={index} id={habit._id} />
          ))}
      </div>

      <AddHabitModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
    </div>
  );
}

export default Home;
