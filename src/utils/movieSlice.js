 
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
        recommendedMovies:null,
        currentMovieDetails:null,
        currentMovieID:null,
        dialogToOpen:null,
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
         },
         addCurrentMovieDetails:(state,action)=>{
            state.currentMovieDetails = action.payload
         },
         addCurrentMovieID:(state,action)=>{
            state.currentMovieID = action.payload
         },
         addDialogToOpen:(state,action)=>{
            state.dialogToOpen = action.payload
            if(!action.payload){
                state.currentMovieDetails = null
            }
         },

    }
})

export const {addMovies,
    addCurrentTrailerDetails,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies,
    addSearchableMovies,
    addRecommendedMovies,
    addCurrentMovieDetails,
    addCurrentMovieID,
    addDialogToOpen
} = movieSlice.actions
export default movieSlice.reducer