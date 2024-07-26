import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger"

class TicketsService {

  async getTicketsByAccountId(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator ticketCount' } })
    return myTickets
  }

  async getTicketsByEventId(towerEventId) {
    const towerEventTickets = await dbContext.Tickets.find({ eventId: towerEventId }).populate('profile')
    return towerEventTickets
  }

  async createTicket(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile event')
    return newTicket
  }

  async destroyTicket(ticketId, userId) {
    const ticketToDestroy = await dbContext.Tickets.findById(ticketId)
    if (userId != ticketToDestroy.accountId) throw new Forbidden('You may not delete a ticket that does not belong to you')
    await ticketToDestroy.deleteOne()
    return `The ticket has been deleted`
  }
}
export const ticketsService = new TicketsService()