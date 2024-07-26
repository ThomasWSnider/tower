import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('')
  }

  async createComment(request, response, next) {
    try {
      const commentData = request.body

    } catch (error) {
      next(error)
    }
  }
}