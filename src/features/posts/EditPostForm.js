import { useState } from "react"
import { useDispatch, useSelector } from 
"react-redux"
import { getPostById, updatePost, deletePost } from "./postsSlice"
import { useParams, useNavigate } from "react-router"
import { selectAllUsers } from "../users/usersSlice"

const EditPostForm = () => {
  const { postId } = useParams()
  // Set navigate for redirect
  const navigate = useNavigate()

  // Select post
  const post = useSelector((state) => getPostById(state, Number(postId)))
  // Select users
  const users = useSelector(selectAllUsers)

  // Set title state
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [requestStatus, setRequestStatus] = useState('idle')

  // Set dispatch
  const dispatch = useDispatch()

  // Check if post exist / doesn't exist
  if(!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    )
  }

  // Ternary to check if post exist
  // {!post ?
  //   (<section>
  //     <h2>Post Not Found</h2>
  //   </section>)
  // }

  // Event handlers
  const onTitleChange = e => setTitle(e.target.value)
  const onContentChange = e => setContent(e.target.value)
  const onAuthorChange = e => setUserId(Number(e.target.value))

  // Can Save boolean to check if fields are filled in
  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

  // Save post function
  const savePost = () => {
    if (canSave) {
      try {
        setRequestStatus('pending')
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()

        // Reset title, content, userId
        setTitle('')
        setContent('')
        setUserId('')

        // Navigate / redirect to post w/ matching id reference
        navigate(`/post/${postId}`)

      } catch (err) {
        // Console log/error
        console.error('Failed to save post', err)
      }finally {
        // Reset status
        setRequestStatus('idle')
      }
    }
  }

  // Set users /author options
  const usersOptions = users.map(user => (
    <option 
      key={user.id}
      value={user.id}>
        {user.name}
    </option>
  ))

  // Delete post function
  const onDelete = () => {
    try {
      setRequestStatus('pending')
      dispatch(deletePost({ id: post.id})).unwrap()

      // Reset title, content, userId
      setTitle('')
      setContent('')
      setUserId('')
      // Redirect to homepage
      navigate('/')
    }catch (err) {
      // Console log/error
      console.error('Failed to delete post', err)
    }finally {
      // Reset status
      setRequestStatus('idle')
    }
  }

  return (
    <section>
      {/* Title */}
      <h2>Edit Post</h2>

      {/* Edit Post Form */}
      <form>

        {/* Edit Post Title */}
        <label htmlFor="postTitle">Post Title:</label>
        <input 
          type="text" 
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        {/* Edit Post Author */}
        <label htmlFor="postAuthor">Author:</label>
        <select 
          value={userId}
          id="postAuthor"
          onChange={onAuthorChange}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        {/* Edit Post Content */}
        <label htmlFor="postContent">Content:</label>
        <input 
          type="text" 
          id="postContent"
          value={content}
          onChange={onContentChange}
        />

        {/* Save Post Button */}
        <button
          type="button"  
          onClick={savePost}
          disabled={!canSave}
        >
          Save Post
        </button>

        {/* Delete Post Button */}
        <button
          type="button"
          className="deleteButton"
          onClick={onDelete}
        >
          Delete Post
        </button>
        
      </form>
    </section>
  )
}

export default EditPostForm
