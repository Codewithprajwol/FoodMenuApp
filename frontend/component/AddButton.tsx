'use client'
import { Plus } from 'lucide-react'
import AddFoodItemPortal from './AddFoodItemPortal'
import { useState } from 'react';

const AddButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="hidden cursor-pointer md:flex items-center gap-2  text-white font-bold py-3 px-6 rounded-lg bg-green-500  hover:bg-green-700 transition-colors duration-500">
            Add
            <Plus size={20} />
          </button>
          <AddFoodItemPortal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
  )
}

export default AddButton