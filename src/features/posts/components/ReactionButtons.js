import { useDispatch } from "react-redux"
import { reactionAdded } from "../postsSlice"

// Set emojis for object lookup
const emojiReaction = {
  thumbsUp: '👍',
  heart: '❤️',
  coffee: '☕',
  wow: '😲',
  rocket: '🚀' 
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  // Set reaction buttons
  const reactionButtons = Object.entries(emojiReaction).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className="reactionButton"
        onClick={
          () => dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}

export default ReactionButtons