import { parseISO, formatDistanceToNow } from "date-fns"

const TimePosted = ({ timestamp }) => {
  // Set time posted to an empty str
  let postTime = ''
  // Check if there is a timestamp
  if (timestamp) {
    // Set date to parsed timestamp
    const date = parseISO(timestamp)
    // Set time period to a function that calculate time posted from current date
    const timePeriod = formatDistanceToNow(date)

    postTime = `${timePeriod} ago`
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{postTime}</i>
    </span>
  )
}

export default TimePosted
