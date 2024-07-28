import { reactive } from 'vue'
import { AccountTicket } from "./models/Ticket.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} user info from the database*/
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  activeTowerEvent: null,
  /** @type {import('./models/Ticket.js').EventAttendee[]}*/
  eventAttendees: [],
  /** @type {import('./models/Ticket.js').AccountTicket[]}*/
  accountTickets: [],
  /** @type {import('./models/Comment.js').Comment[]}*/
  eventComments: []
})