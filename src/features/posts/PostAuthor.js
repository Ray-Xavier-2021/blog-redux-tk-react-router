import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {
  // Set userSelector
  const users = useSelector(selectAllUsers)
  // Set author
  const author = users.find(user => user.id === userId)

  return <span>by { author ? author.name : 'Unknown Author' }</span>
}

export default PostAuthor
