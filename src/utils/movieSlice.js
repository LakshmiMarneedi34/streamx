 
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movies',
    initialState: {
        nowPlayingMovies:null,
        currentTrailerDetails:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        searchedMovies:null,
        recommendedMovies:null  
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
         addSearchableMovies:(state,action)=>{
           state.searchedMovies = action.payload
         },
         addRecommendedMovies:(state,action)=>{
            state.recommendedMovies = action.payload
         }

    }
})

export const {addMovies,addCurrentTrailerDetails,addPopularMovies,addTopRatedMovies,addUpcomingMovies,addSearchableMovies,addRecommendedMovies} = movieSlice.actions
export default movieSlice.reducer