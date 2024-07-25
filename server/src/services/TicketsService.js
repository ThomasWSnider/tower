import { dbContext } from "../db/DbContext"

class TicketsService {

  async getTicketsByAccountId(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator' } })
    return myTickets
  }
}

  async createTicket(ticketData) {
  const newTicket = await dbContext.Tickets.create(ticketData)
  await newTicket.populate('profile event')
  return newTicket
}



export const ticketsService = new TicketsService()