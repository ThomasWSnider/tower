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
}

export const towerEventsService = new TowerEventsService()