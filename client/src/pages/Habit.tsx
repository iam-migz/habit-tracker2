import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useHabit } from '../hooks/habit/useHabit';
import Navbar from '../components/layout/Navbar';
import Dropdown, { DropdownItem } from '../components/shared/Dropdown';
import EditHabitModal from '../components/habit/EditHabitModal';
import DeleteHabitModal from '../components/habit/DeleteHabitModal';
import VisualizeTab from '../components/habit/VisualizeTab';
import ImageTab from '../components/habit/ImageTab';

type IdParams = {
  id: string;
};

function Habit() {
  const { id } = useParams<keyof IdParams>() as IdParams;
  const { data: habit, isLoading, error } = useHabit(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>an error has occured</div>;
  }

  const dropdownData: DropdownItem[] = [
    {
      name: 'edit',
      icon: <PencilSquareIcon className="h-5 w-5" />,
      highLightedColor: 'bg-green-700',
      action: () => setIsEditModalOpen(true),
    },
    {
      name: 'delete',
      icon: <TrashIcon className="h-5 w-5" />,
      highLightedColor: 'bg-red-700',
      action: () => setIsDeleteModalOpen(true),
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="container border-2 bg-slate-50 mt-12 p-4 max-w-[640px] mx-auto md:rounded">
        <div className="text-center relative">
          <h1 className="text-2xl capitalize">{habit?.name}</h1>
          <span className="text-slate-500">{habit?.description}</span>
          <div className="absolute top-0 right-0">
            <Dropdown
              button={
                <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
              }
              content={dropdownData}
            />
          </div>
        </div>

        <div className="w-full mt-10">
          <Tab.Group>
            <Tab.List className="flex justify-center space-x-12 font-bold">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? 'bg-blue-500 text-white' : ''
                    } w-full p-2 px-8 rounded`}
                  >
                    Visualize
                  </button>
                )}
              </Tab>

              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? 'bg-blue-500 text-white' : ''
                    } w-full p-2 px-8 rounded`}
                  >
                    Image
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <div className="mt-4 p-4">
                <Tab.Panel>
                  <VisualizeTab habitId={habit._id} />
                </Tab.Panel>
                <Tab.Panel>
                  <ImageTab habitId={habit._id} />
                </Tab.Panel>
              </div>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <EditHabitModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        id={habit._id}
      />
      <DeleteHabitModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        id={habit._id}
      />
    </div>
  );
}

export default Habit;
