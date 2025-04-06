 
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movies',
    initialState: {
        nowPlayingMovies:null,
        currentTrailerDetails:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
    },
    reducers:{
        addMovies:(state,action)=>{
           state.nowPlayingMovies = action.payload
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies = action.payload
        },
        addCurrentTrailerDetails:(state,action)=>{
            state.currentTrailerDetails = action.payload
         },

    }
})

export const {addMovies,addCurrentTrailerDetails,addPopularMovies,addTopRatedMovies,addUpcomingMovies} = movieSlice.actions
export default movieSlice.reducer