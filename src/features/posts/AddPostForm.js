import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
// import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    // Set initial state for component locally
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [requestStatus, setRequestStatus] = useState('idle')

    // Set dispatch
    const dispatch = useDispatch()
    // Set navigate for redirect
    const navigate = useNavigate()

    // Set users selector
    const users = useSelector(selectAllUsers)

    // Event handlers
    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)

    // Set user / author option to map each user and set user name w/ user.id as value
    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}>
            {user.name}
        </option>
    ))

    // Save post function
    const savePost = () => {
        if (canSavePost) {
            try {
                setRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                // Reset title, content, userId
                setTitle('')
                setContent('')
                setUserId('')
                // Redirect / navigate to homepage
                navigate('/')
            } catch (err) {
                // Console log / error
                console.error('Failed to save the post', err)
            } finally {
                // Reset request status to idle
                setRequestStatus('idle')
            }
        }
    }

    // Create a can save variable that checks if form is filled in ad holds the data to allow save button functionality if true and disable if false
    const canSavePost = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    return (
        <section>
            {/* Title */}
            <h2>Add a New Post</h2>
            {/* Add Post Form */}
            <form >
                {/* Add Post Title */}
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChange}
                />
                {/* Add Post Author */}
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChange}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                {/* Add Post Content */}
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={onContentChange}
                ></textarea>
                {/* Add / Save Post Button */}
                <button
                    type='button'
                    onClick={savePost}
                    disabled={!canSavePost}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm