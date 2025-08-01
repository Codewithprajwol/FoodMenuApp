'use client'
import { Plus } from 'lucide-react'
import AddFoodItemPortal from './AddFoodItemPortal'
import { useState } from 'react';

const AddMobileButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
           <button onClick={() => setIsOpen(true)} className="md:hidden fixed bottom-6 right-6 flex items-center gap-2  text-white font-bold py-3 px-5 rounded-full shadow-lg bg-green-500 hover:bg-green-700 transition-transform hover:scale-105">
          Add
          <Plus size={20} />
        </button>
          <AddFoodItemPortal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
  )
}

export default AddMobileButton