import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { 
  allSelectedPosts, 
  getPostsStatus, 
  getPostsError, 
  fetchPosts
} from "../postsSlice"
import PostFeed from "./PostFeed"

const PostsList = () => {
  const posts = useSelector(allSelectedPosts)
  const postStatus = useSelector(getPostsStatus)
  const postError = useSelector(getPostsError)

  const dispatch = useDispatch()

  // Set useEffect
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // Set post by most recent
  const postOrder = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  let postContent;

  if (postStatus === 'loading') {
    postContent = <p>'Loading...'</p>
  }else if (postStatus === 'succeeded') {
    postContent = postOrder.map(post => <PostFeed key={post.id} post={post} />)
  }else if (postStatus === 'failed') {
    postContent = <p>{postError}</p>
  }



  return (
    <section>
      <h2>Posts</h2>
      {postContent}
    </section>
  )
}

export default PostsList
