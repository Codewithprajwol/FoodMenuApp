import toast from 'react-hot-toast';
import {create} from 'zustand';

interface FoodItem {
  _id?: string;
  name: string;
  price: number;
  image: string;
}

interface FoodItemStore {
  isDeleting: boolean;
  isLoading:boolean;
  foodItems: FoodItem[];
  getFoodItem:()=>void;
  addFoodItem: (item: FoodItem) => void;
  removeFoodItem: (id: string) => void;
  getSingleFoodItem:(id:string)=>void;
  editFoodItem:(item:FoodItem)=>void;
}

export const useFoodItemStore = create<FoodItemStore>((set,get) => ({
  foodItems: [],
  isLoading:false,
  isDeleting: false,

  getFoodItem:async()=>{
   try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data=await response.json();
    set({foodItems:data})
    console.log(response)

   }catch(error){
       toast.error("something went wrong while fetching food items");
   }
  },
  
  addFoodItem: async ({name,image,price}) => {
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
    }));
    toast.success('Food item added successfully');
   } catch (error) {
     toast.error("something went wrrong while adding food item");
   }
  },

  removeFoodItem: async(id) => {
    set({isDeleting: true});
    try{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }
      const newItems = get().foodItems.filter(item => item._id !== id);
     set({foodItems: newItems, isDeleting: false});
      toast.success('Food item deleted successfully');
    });

    }catch(error){
      set({isDeleting: false});
      toast.error("something went wrong while deleting food item");
    }
  },

  getSingleFoodItem:async(id)=>{
       try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data=await response.json();
  }catch(error){
    console.log(error)
  }
},
  editFoodItem: async ({ _id: id, name, image, price }) => {
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

      // const updateItem= get().foodItems.map/
      set((state) => ({
        foodItems: state.foodItems.map(item => item._id === id ? updatedItem : item),
      }));
      toast.success('Food item updated successfully');
    } catch (error) {
      toast.error('Something went wrong while editing food item');
    }
  }

}));

// JX9EA83i9GTaZ5wM