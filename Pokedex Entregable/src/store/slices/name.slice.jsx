import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const nameSlice = createSlice({
	name: "name",
	initialState: '',
	reducers: {
      changeName: (state,action)=>{
         const inputValue = action.payload;
         return inputValue;
      }
   },
});

export const {changeName} = nameSlice.actions;

export default nameSlice.reducer;
