import { dbContext } from "../db/DbContext"


class TowerEventsService {

  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', '-email')
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()