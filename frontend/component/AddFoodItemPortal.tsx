'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ReactDOM from 'react-dom';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';
import usePreviewImage from '@/Hooks/usePreviewImage';
import { useFoodItemStore } from '@/store/useFoodItemStore';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFoodItemPortal = ({ isOpen, onClose }: AddMenuItemModalProps) => {
  const { addFoodItem, isItemAdding } = useFoodItemStore();
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const {imageUrl, handlePreviewImage, setImageUrl} = usePreviewImage();

  useEffect(() => {
    const element = document.getElementById('portal') as HTMLElement;
    setPortalNode(element);
  }, []);



  const handleSubmit =async (e: FormEvent) => {
    e.preventDefault();
    await addFoodItem({name,image: imageUrl ?? "",price:Number(price)});
    onClose()
    setName('');
    setPrice('');
    setImageUrl(null);
  };

  if (!isOpen || !portalNode) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-gray-900/60">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md m-4 animate-in fade-in-0 zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Menu Item</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>


          
            <div className="mt-1 relative flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {imageUrl ? (
                <div className="">
                   <X size={24} onClick={() => setImageUrl(null)} className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition' />
                  <Image src={imageUrl} alt="Preview" width={128} height={128} className="mx-auto h-32 w-32 object-cover " />
                  </div>
                ):(<div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="cursor-pointer font-medium text-green-600 hover:text-green-800">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handlePreviewImage} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>)}
              
            </div>


          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Spicy Tuna Roll"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
            <div className="relative mt-1">
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 1200"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 font-semibold">NPR</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition"
            >
              {isItemAdding ? 'Adding...' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    portalNode
  );
};

export default AddFoodItemPortal;
