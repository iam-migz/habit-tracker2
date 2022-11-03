import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

export type DropdownItem = {
  name: string;
  icon: JSX.Element;
  highLightedColor: string;
  action: () => void;
};

interface DropdownProp {
  button: ReactNode;
  content: DropdownItem[];
}

// reusable dropdown component
function Dropdown({ button, content }: DropdownProp) {
  return (
    <Menu>
      {/* dropdown button */}
      <Menu.Button>{button}</Menu.Button>
      {/* dropdown items */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-8 bg-slate-50 rounded-lg border border-gray-100 shadow-xl z-50">
          <div className="flex flex-col p-4 space-y-2 ">
            {content &&
              content.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <div
                      onClick={item.action}
                      className={`${
                        active
                          ? item.highLightedColor + ' text-white'
                          : 'text-gray-900'
                      }  group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer space-x-2`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
