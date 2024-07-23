import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
  constructor() {
    super(`/api/events`)
    this.router
      .post('', this.createTowerEvent)
  }

  async createTowerEvent(request, response, next) {
    try {
      const towerEventData = request.body
      const newTowerEvent = await towerEventsService.createTowerEvent(towerEventData)
      response.send(newTowerEvent)
    } catch (error) {
      next(error)
    }
  }
}