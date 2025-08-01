'use client';
import Image from 'next/image';
import { Pencil, Trash2 } from 'lucide-react';
import { MenuItem } from '@/types';
import { useFoodItemStore } from '@/store/useFoodItemStore';
import { useState } from 'react';
import EditFoodItemPortal from './EditFoodItemPortal';


type MenuItemCardProps = MenuItem

const colorVariants:any = {
  orange: 'bg-orange-400 ',
  pink: 'bg-pink-200 ',
  gray: 'bg-card-gray ',
};


const MenuItemCard = ({ title, price, imageUrl, _id }: MenuItemCardProps) => {
  const { removeFoodItem } = useFoodItemStore();
  const [editModalOpen,setEditModalOpen]=useState<boolean>(false);

  const handleEdit = (e:React.MouseEvent<HTMLButtonElement>) => {
    setEditModalOpen(true);
  }
  const handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
    removeFoodItem(_id ?? '');
  };
  
  return (
    <div className={`
      ${colorVariants['orange']} 
      p-4 rounded-2xl flex flex-col gap-3 
      shadow-md hover:shadow-lg transition-shadow duration-300
    `}>
      <Image
        src={imageUrl}
        alt={title}
        width={150}
        height={150}
        className="w-full h-auto object-cover rounded-full aspect-square"
      />
      <div className="text-center">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <p className="font-bold text-xl text-gray-800 dark:text-gray-100">${price}</p>
        <div className="flex gap-2">
          <button onClick={handleEdit} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            <Pencil size={20} />
          </button>
          {editModalOpen && <EditFoodItemPortal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} id={_id ?? ''} name={title} image={imageUrl} price={price} />}
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;