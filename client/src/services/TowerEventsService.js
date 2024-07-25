import { AppState } from "../AppState";
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class TowerEventsService {

  async getTowerEvents() {
    const response = await api.get('api/events')
    logger.log(response.data)
    const towerEvents = response.data.map(towerEvent => new TowerEvent(towerEvent))
    AppState.towerEvents = towerEvents
  }

  async getTowerEventById(towerEventId) {
    AppState.activeTowerEvent = null
    const response = await api.get(`api/events/${towerEventId}`)
    logger.log(response.data)
    const activeTowerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = activeTowerEvent
  }

  async createTowerEvent(towerEventData) {
    const response = await api.post(`api/events`, towerEventData)
    logger.log(response.data)
    const newTowerEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(newTowerEvent)
    return newTowerEvent
  }
}


export const towerEventsService = new TowerEventsService()