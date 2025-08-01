'use client';
import { Plus, Watch } from 'lucide-react';

import MenuItemCard from '@/component/MenuItemCard';
import AddButton from '@/component/AddButton';
import AddMobileButton from '@/component/AddMobileButton';
import { useEffect } from 'react';
import { useFoodItemStore } from '@/store/useFoodItemStore';
import WatchSkeleton from '@/component/skeleton/WatchSkeleton';


export default  function  HomePage() {

  const {getFoodItem,foodItems,isItemLoading}=useFoodItemStore()
   useEffect(()=>{
     getFoodItem()
   },[getFoodItem])


  return (
    <main className="min-h-screen bg-[#E9DEDE] text-gray-800 p-2 sm:p-4 md:p-6 lg:p-8 ">
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            Metho Vojanalaya
          </h1>
        </header>

        <div className="flex justify-center md:justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Today Menu</h2>
          <AddButton />
        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
           {isItemLoading ? (
    Array.from({ length: 10 }).map((_, index) => (
      <WatchSkeleton key={index} />
    ))
  ) : foodItems && foodItems.length > 0 ? (
    foodItems.map((item, index) => (
      <MenuItemCard
        key={item._id}
        _id={item._id}
        title={item.name}
        price={item.price}
        index={index}
        imageUrl={item.image}
      />
    ))
  ) : (
    <p className="text-xl font-semibold col-span-full text-center">
      No food items available .
    </p>
  )}
        </div>
        <AddMobileButton />
      </div>
    </main>
  );
}