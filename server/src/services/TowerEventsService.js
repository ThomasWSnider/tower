import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"


class TowerEventsService {

  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator ticketCount', '-email')
    return towerEvent
  }

  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator ticketCount', '-email')
    return towerEvents
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator ticketCount', '-email')
    return towerEvent
  }

  async editTowerEvent(towerEventData, userId) {
    const towerEventToEdit = await dbContext.TowerEvents.findById(towerEventData.id)
    if (towerEventToEdit.creatorId != userId) throw new Forbidden(`You cannot edit an event you did not create`)
    towerEventToEdit.creatorId = towerEventToEdit.creatorId
    towerEventToEdit.name = towerEventData.name || towerEventToEdit.name
    towerEventToEdit.description = towerEventData.description || towerEventToEdit.description
    towerEventToEdit.coverImg = towerEventData.coverImg || towerEventToEdit.coverImg
    towerEventToEdit.location = towerEventData.location || towerEventToEdit.location
    towerEventToEdit.capacity = towerEventData.capacity || towerEventToEdit.capacity
    towerEventToEdit.startDate = towerEventData.startData || towerEventToEdit.startDate
    towerEventToEdit.isCanceled = towerEventToEdit.isCanceled
    towerEventToEdit.type = towerEventData.type || towerEventToEdit.type
    await towerEventToEdit.save()
    return `${towerEventToEdit.name} has been changed`
  }

  async cancelTowerEvent(towerEventId, userId) {
    const towerEventToCancel = await dbContext.TowerEvents.findById(towerEventId)
    await towerEventToCancel.populate('creator')
    if (towerEventToCancel.creatorId != userId) throw new Forbidden('You may not delete an event you did not create')
    towerEventToCancel.isCanceled = !towerEventToCancel.isCanceled
    towerEventToCancel.save()
    return towerEventToCancel
  }
}

export const towerEventsService = new TowerEventsService()