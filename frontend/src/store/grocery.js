import { create } from "zustand";

export const useGroceryStore = create((set) => ({
  groceries: [],

  setGroceries: (groceries) => set({ groceries }),

  fetchGrocery: async () => {
    try {
      const res = await fetch('/api/grocery');
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      set({ groceries: data.data });
    } catch (error) {
      console.error("Error fetching groceries:", error);
    }
  },

  createGrocery: async (grocery) => {
    console.log(grocery)
    const res = await fetch('/api/grocery', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(grocery)
    });

    const data = await res.json();

    console.log(`The data is ${data.data}`)
    set((state) => ({ groceries: [...state.groceries, data.data]}));
    return { 
      success: true,
      message: "Add successfully"
    }
  },
  deleteGrocery: async(id) => {
    const res = await fetch(`/api/grocery/${id}`, {
      method: `DELETE`
    })
    const data = await res.json()

    if(!data.success) return { success: false, message: data.message}
    set(state => ({ groceries: state.groceries.filter(grocery => grocery._id !== id)}))

    return { success: true, message: data.message }
  },
  updateGrocery: async(grocery) => {
    console.log(`the grocery to updated is `)
    console.log(grocery)
    const updatedGrocery = {...grocery, purchasedDate: grocery.purchasedDate.slice(0,10),expirationDate: grocery.expirationDate.slice(0,10)}

    const res = await fetch(`/api/grocery/${updatedGrocery._id}`, 
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedGrocery)
      }
      

    )

    const data = await res.json();

    if(!data.success) return { success: false, message: data.message}

    set(state => ({
      groceries: state.groceries.map(grocery => grocery._id === updatedGrocery._id ? data.data : grocery)
    }))

    return { success: true, message: data.message }

  }
}))