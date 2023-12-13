import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: 'studentSlice',
    initialState:[],
    reducers:{
        addStudents: (state,action) =>{
            state.push(action.payload)
        },
        deleteStudents: (state,action) =>{
            return state.filter((item)=> item.rollno !== action.payload )
        },
        editStudent: (state, action) => {
            const { data } = action.payload;
            return state.map((item) => {
                return item.rollno === data.rollno ? data : item;
            });
        }
        
    }
})

export const {addStudents,deleteStudents,editStudent} = studentSlice.actions
export default studentSlice.reducer