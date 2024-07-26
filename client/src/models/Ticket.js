import { Account } from "./Account"
import { TowerEvent } from "./TowerEvent"


export class Ticket {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}

export class TicketWithProfile extends Ticket {
  constructor(data) {
    super(data)
    this.profile = new Account(data)
  }
}

export class TicketWithEvent extends Ticket {
  constructor(data) {
    super(data)
    this.event = new TowerEvent(data)
  }
}