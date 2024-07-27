import { dbContext } from "../db/DbContext"

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
}

export const commentsService = new CommentsService