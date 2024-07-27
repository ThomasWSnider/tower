import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.destroyComment)
  }

  async createComment(request, response, next) {
    try {
      const userId = request.userInfo.id
      const commentData = request.body
      commentData.creatorId = userId
      const newComment = await commentsService.createComment(commentData)
      response.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async destroyComment(request, response, next) {
    try {
      const user = request.userInfo
      const commentId = request.params.commentId
      const message = await commentsService.destroyComment(user.id, commentId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}