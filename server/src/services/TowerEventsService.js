import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class TowerEventsService {

  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', '-email')
    return towerEvent
  }

  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator', '-email')
    return towerEvents
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator', '-email')
    return towerEvent
  }

  async editTowerEvent(towerEventId, userId) {
    const towerEventToEdit = await dbContext.TowerEvents.findById(towerEventId)
    if (towerEventToEdit.id != userId) throw new Forbidden(`You cannot edit an event you did not create`)
  }
}

export const towerEventsService = new TowerEventsService()