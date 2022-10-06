import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// Import sub from date-fns to set initial state of date subtract the post time in object
import { sub } from "date-fns";

import axios from "axios";

// Create variable to hold dummy API data
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

// Removed static state
const initialState = {
    posts: [],
    status: 'idle', // 'loading' || 'succeeded' || 'failed'
    error: null
}

// Create a post / CREATE asyncThunk function that adds a post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

// Create a get / READ asyncThunk function that fetches a post
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

// Create a put / UPDATE asyncThunk function that updates a post
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    try {
        const { id } = initialPost
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        // Return response data
        return response.data
    } catch (err) {
        // Return error message
        // return err.message
        // Only for testing redux
        return initialPost
    }
})

// Create a delete / DELETE asyncThunk function that deletes a post
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`, initialPost)
        // Check if response is 200
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`
    } catch (err) {
        // Return error message
        return err.message
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            // Generate / format object data and return payload using prepare callback
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        // Set date to return date as a ISO string
                        date: new Date().toISOString(),
                        userId,
                        // Set reactions
                        reactions: {
                            thumbsUp: 0,
                            heart: 0,
                            coffee: 0,
                            wow: 0,
                            rocket: 0
                        }
                    }
                }
            }
        },
        // Set a reaction added reducer that changes the stat of the reaction button
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            // Check if post exists the give reaction button functionality
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    // Create a custom reducer that handles the reducers not specified in slice
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })
    }
})

export const allSelectedPosts = (state) => state.posts.posts

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const { addPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer