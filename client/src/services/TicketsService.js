import { AppState } from "../AppState"
import { EventAttendee } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {

  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    const newTicket = new EventAttendee(response.data)
    AppState.eventAttendees.push(newTicket)
    AppState.activeTowerEvent.ticketCount++
  }

  async getEventAttendees(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    const eventAttendees = response.data.map((ticket) => new EventAttendee(ticket))
    AppState.eventAttendees = eventAttendees
  }
}

export const ticketsService = new TicketsService()