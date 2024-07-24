import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
  constructor() {
    super(`/api/events`)
    this.router
      .get('', this.getAllTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.editTowerEvent)
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

  async getAllTowerEvents(request, response, next) {
    try {
      const towerEvents = await towerEventsService.getAllTowerEvents()
      response.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventById(request, response, next) {
    try {
      const towerEventId = request.params.eventId
      const towerEvent = await towerEventsService.getTowerEventById(towerEventId)
      response.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editTowerEvent(request, response, next) {
    try {
      const userId = request.userInfo.id
      const towerEventData = request.body
      towerEventData.id = request.params.eventId
      const towerEvent = await towerEventsService.editTowerEvent(towerEventData, userId)
      response.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
}