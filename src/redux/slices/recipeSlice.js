import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllRecipes = createAsyncThunk('recipes/fetchAllRecipes', async()=>{
    const result = await axios.get("https://dummyjson.com/recipes")
    sessionStorage.setItem("allrecipes",JSON.stringify(result.data.recipes))
    // console.log(result);
    return result.data.recipes
})

const recipeSlice = createSlice({
    name:'recipes',
    initialState:{
        allrecipes:[],
        dummyAllRecipies:[],
        loading:false,
        error:""
    },
    reducers:{
        searchRecipe:(state,searchKeyFromHeader)=>{
            state.allrecipes = state.dummyAllRecipies.filter(item=>item.cuisine.toLowerCase().includes(searchKeyFromHeader.payload))
        }
    },
    extraReducers:(builders)=>{
        builders.addCase(fetchAllRecipes.fulfilled,(state,apiResult)=>{
            state.allrecipes = apiResult.payload
            state.dummyAllRecipies = apiResult.payload
            state.loading = false
            state.error = ""
        })
        builders.addCase(fetchAllRecipes.pending,(state,apiResult)=>{
            state.allrecipes = []
            state.dummyAllRecipies = []
            state.loading = true
            state.error = ""
        })
        builders.addCase(fetchAllRecipes.rejected,(state,apiResult)=>{
            state.allrecipes = []
            state.dummyAllRecipies = []
            state.loading = false
            state.error = "API Call Failed"
        })
    }
})

export const {searchRecipe} = recipeSlice.actions
export default recipeSlice.reducer