import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import TimePosted from "./TimePosted"


const PostFeed = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimePosted timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default PostFeed
