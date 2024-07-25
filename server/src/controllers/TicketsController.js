import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketsService } from "../services/TicketsService";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.destroyTicket)
  }

  async createTicket(request, response, next) {
    try {
      const userId = request.userInfo.id
      const ticketData = request.body
      ticketData.accountId = userId
      const newTicket = await ticketsService.createTicket(ticketData)
      response.send(newTicket)
    }
    catch (error) {
      next(error)
    }
  }

  async destroyTicket(request, response, next) {
    try {
      const userId = request.userInfo.id
      const ticketId = request.params.ticketId
      const message = await ticketsService.destroyTicket(ticketId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}