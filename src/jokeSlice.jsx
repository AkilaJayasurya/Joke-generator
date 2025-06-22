import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    joke: "",
    error: null
}

// const categoriesList = axios.get(`https://api.chucknorris.io/jokes/categories`)
//                         .then(function(response) {
//                             console.log(response.data);
//                         }).catch(function(error) {
//                             console.log(error);
//                         });

const fetchJoke = createAsyncThunk("jokes/jokecategory", async function(category, {rejectWithValue}) {
    let url = "";
    if(category === "") {
        url = `https://api.chucknorris.io/jokes/random`;
    } else {
        url = `https://api.chucknorris.io/jokes/random?category=${category}`; 
    }
    return await axios.get(url)
    .then(function(response) {
        return response.data.value;
    })
    .catch(function(error) {
        return rejectWithValue(`No jokes for category "${category}" found. Available lists are animal, career, celebrity, dev, explicit, fashion, food, history, money, movie, music, political, religion, science, sport, travel.`);
    })
})

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchJoke.pending, function(state) {
            state.error = null;
        }).addCase(fetchJoke.fulfilled, function(state, action) {
            state.joke = action.payload;
            state.error = null;
        }).addCase(fetchJoke.rejected, function(state, action) {
            state.error = action.payload;
        })
    }
});

export default jokeSlice;
export {fetchJoke};