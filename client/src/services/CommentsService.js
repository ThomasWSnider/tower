import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

  async getEventComments(eventId) {
    AppState.eventComments = []
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log(response.data)
    const eventComments = response.data.map((comment) => new Comment(comment))
    AppState.eventComments = eventComments
  }

  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('📨📨📡', response.data)
    const newComment = new Comment(response.data)
    AppState.eventComments.push(newComment)
    return newComment
  }
}

export const commentsService = new CommentsService()