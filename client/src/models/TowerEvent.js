import { Account } from "./Account"

export class TowerEvent {
  constructor(data) {
    this.id = data.id || data._id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = new Account(data.creator)
    this.ticketCount = data.ticketCount
  }

  get backgroundImg() {
    return `url(${this.coverImg})`
  }

  // TODO work on getting the getter to only slice on a space
  // get truncatedDescription() {
  //   const body = this.description
  //   let indexToSlice = []
  //   if (body.length <= 50) return body.slice(0, 50)
  //   for (let i = 51; i < body.length; i++) {
  //     if (body.length[i] == '') {
  //       indexToSlice.push(i)
  //     }
  //   }
  //   return body.length.slice(0, indexToSlice[0])
  // }
}