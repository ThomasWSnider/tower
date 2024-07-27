import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
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
}