import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
  constructor() {
    super(`/api/events`)
    this.router
      .get('', this.getTowerEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
  }

  async createTowerEvent(request, response, next) {
    try {
      const user = request.userInfo
      const towerEventData = request.body
      towerEventData.creatorId = user.id
      const newTowerEvent = await towerEventsService.createTowerEvent(towerEventData)
      response.send(newTowerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEvents() {

  }
}