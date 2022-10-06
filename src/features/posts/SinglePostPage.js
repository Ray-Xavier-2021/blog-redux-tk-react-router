import { useSelector } from "react-redux"
import { getPostById } from "./postsSlice"

import PostAuthor from "./PostAuthor"
import TimePosted from "./TimePosted"
import ReactionButtons from "./ReactionButtons"

import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'

const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useSelector((state) => getPostById(state, Number(postId)))

  // Check if post exist and ret>urn if it does

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    )
  } 
  
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimePosted timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostPage