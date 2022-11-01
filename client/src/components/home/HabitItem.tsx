import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Habit } from '../../types/habit.types';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  FireIcon,
} from '@heroicons/react/24/solid';
import Dropdown, { DropdownItem } from '../shared/Dropdown';
import { useState } from 'react';
import EditHabitModal from './EditHabitModal';
import DeleteHabitModal from './DeleteHabitModal';

interface HabitItemProps {
  habit: Habit;
}

function HabitItem({ habit }: HabitItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dropdownData: DropdownItem[] = [
    {
      name: 'Edit',
      icon: <PencilSquareIcon className="h-5 w-5" />,
      highLightedColor: 'bg-blue-500',
      action: () => setIsEditModalOpen(true),
    },
    {
      name: 'Delete',
      icon: <TrashIcon className="h-5 w-5" />,
      highLightedColor: 'bg-red-500',
      action: () => setIsDeleteModalOpen(true),
    },
  ];

  return (
    <Link to={`/habit/${habit._id}`}>
      <div className="flex justify-between items-center bg-orange-200 mt-2 p-3 rounded relative shadow-md">
        {/* name */}
        <div>
          <h1 className="text-lg capitalize font-bold">{habit.name}</h1>
          <p className="text-sm">{habit.description}</p>
        </div>

        {/* streak, records */}
        <div className="flex space-x-8 text-sm">
          <div className="flex">
            <span>streak: 15</span>
            <FireIcon className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <span>all time: 30</span>
          </div>
        </div>

        <Dropdown
          button={<EllipsisVerticalIcon className="h-7 w-7 cursor-pointer" />}
          content={dropdownData}
        />

        {/* edit habit modal */}
        <EditHabitModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          habit={habit}
        />

        {/* confirm delete modal  */}
        <DeleteHabitModal
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          _id={habit._id}
        />

        {/* last updated */}
        <div className="absolute text-xs bottom-0 right-10 text-slate-600">
          <span>
            last updated:{' '}
            {habit.updatedAt &&
              formatDistance(new Date(habit.updatedAt), new Date(), {
                addSuffix: true,
              })}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default HabitItem;
