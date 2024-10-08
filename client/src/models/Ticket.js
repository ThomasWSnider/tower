import { Account } from "./Account"
import { TowerEvent } from "./TowerEvent"


export class Ticket {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}

export class EventAttendee extends Ticket {
  constructor(data) {
    super(data)
    this.profile = new Account(data.profile)
  }
}

export class AccountTicket extends Ticket {
  constructor(data) {
    super(data)
    this.event = new TowerEvent(data.event)
  }
}