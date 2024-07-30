import { Account } from "./Account"

export class Comment {
  constructor(data) {
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    this.createdAt = new Date(data.createdAt)
    this.creator = new Account(data.creator)
    this.id = data.id
  }
}