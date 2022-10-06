import { useSelector } from "react-redux"
// import { useEffect } from "react"
import { 
  allSelectedPosts, 
  getPostsStatus, 
  getPostsError
} from "./postsSlice"
import PostFeed from "./PostFeed"

const PostsList = () => {
  const posts = useSelector(allSelectedPosts)
  const postStatus = useSelector(getPostsStatus)
  const postError = useSelector(getPostsError)

  // const dispatch = useDispatch()

  // // Set useEffect
  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postStatus, dispatch])

  
  let postContent;
  
  if (postStatus === 'loading') {
    postContent = <p>'Loading...'</p>
  }else if (postStatus === 'succeeded') {
    // Set post by most recent
    const postOrder = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    postContent = postOrder.map(post => <PostFeed key={post.id} post={post} />)
  }else if (postStatus === 'failed') {
    postContent = <p>{postError}</p>
  }



  return (
    <section>
      {postContent}
    </section>
  )
}

export default PostsList
