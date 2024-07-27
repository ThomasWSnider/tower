import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {

  async getEventComments(eventId) {
    const eventComments = await dbContext.Comments.find({ eventId }).populate('creator', '-email')
    return eventComments
  }

  async createComment(commentData) {
    const newComment = await dbContext.Comments.create(commentData)
    await newComment.populate('creator', '-email')
    return newComment
  }

  async destroyComment(userId, commentId) {
    const commentToDestroy = await dbContext.Comments.findById(commentId)
    if (commentToDestroy.creatorId != userId) throw new Forbidden(`You may not delete a comment that is not yours!`)
    await commentToDestroy.deleteOne()
    return `The comment was successfully deleted!`
  }
}

export const commentsService = new CommentsService