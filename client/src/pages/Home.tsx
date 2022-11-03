import { useState } from 'react';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/solid';
import { useHabits } from '../hooks/habit/useHabits';
import Navbar from '../components/layout/Navbar';
import AddHabitModal from '../components/habit/AddHabitModal';
import HabitItem from '../components/home/HabitItem';
import DateSlider from '../components/home/DateSlider';
import Dropdown, { DropdownItem } from '../components/shared/Dropdown';

function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: habits } = useHabits();
  const dropdownData: DropdownItem[] = [
    {
      name: 'new habit',
      icon: <PlusIcon className="h-5 w-5" />,
      highLightedColor: 'bg-green-700',
      action: () => setIsAddModalOpen(true),
    },
  ];
  return (
    <div>
      <Navbar />

      <div className="md:rounded min-w-[320px] max-w-[570px] border-2 bg-slate-50 mt-12 p-3 mx-auto">
        <div className="flex justify-between items-center relative">
          <h1>Your Habits</h1>
          <Dropdown
            button={<Bars3Icon className="h-6 w-6 cursor-pointer" />}
            content={dropdownData}
          />
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
