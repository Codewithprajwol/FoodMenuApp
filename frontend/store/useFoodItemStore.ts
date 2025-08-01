import toast from 'react-hot-toast';
import {create} from 'zustand';

interface FoodItem {
  _id?: string;
  name: string;
  price: number;
  image: string;
}

interface FoodItemStore {
  isItemDeleting: boolean;
  isItemLoading: boolean;
  isItemEditing: boolean;
  isItemAdding: boolean;
  foodItems: FoodItem[];
  getFoodItem:()=>void;
  addFoodItem: (item: FoodItem) => void;
  removeFoodItem: (id: string) => void;
  editFoodItem:(item:FoodItem)=>void;
}

export const useFoodItemStore = create<FoodItemStore>((set,get) => ({
  foodItems: [],
  isItemLoading: false,
  isItemDeleting: false,
  isItemEditing: false,
  isItemAdding: false,

  getFoodItem:async()=>{
    set({isItemLoading: true});
   try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data=await response.json();
    set({foodItems:data, isItemLoading: false});

   }catch(error){
    set({isItemLoading: false});
       toast.error("something went wrong while fetching food items");
   }
  },
  
  addFoodItem: async ({name,image,price}) => {
    set({isItemAdding:true});
   try{
     const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,image,price}),
    });
    if (!response.ok) {
      throw new Error('Failed to add food item');
    }
    const newItem = await response.json();
    set((state) => ({
      foodItems: [...state.foodItems, newItem],
      isItemAdding: false,
    }));
    toast.success('Food item added successfully');
   } catch (error) {
    set({isItemAdding: false});
     toast.error("something went wrrong while adding food item");
   }
  },

  removeFoodItem: async(id) => {
    set({isItemDeleting: true});
    try{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }
      const newItems = get().foodItems.filter(item => item._id !== id);
     set({foodItems: newItems, isItemDeleting: false});
      toast.success('Food item deleted successfully');
    });

    }catch(error){
      set({isItemDeleting: false});
      toast.error("something went wrong while deleting food item");
    }
  },


  editFoodItem: async ({ _id: id, name, image, price }) => {
    set({isItemEditing: true});
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image, price }),
      });
      if (!response.ok) {
        throw new Error('Failed to edit food item');
      }
      const updatedItem = await response.json();

      set((state) => ({
        foodItems: state.foodItems.map(item => item._id === id ? updatedItem : item),
        isItemEditing: false,
      }));
      toast.success('Food item updated successfully');
    } catch (error) {
      set({isItemEditing: false});
      toast.error('Something went wrong while editing food item');
    }
  }

}));

