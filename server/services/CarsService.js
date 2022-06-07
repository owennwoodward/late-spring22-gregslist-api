import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext.js"

class CarsService {

  async getAll() {
    return await dbContext.Cars.find({})
  }

  async getById(id) {
    const car = await dbContext.Cars.findById(id)
    if (!car) {
      throw new BadRequest("Invalid Car Id Yo!")
    }
    return car
  }

  async create(body) {
    const car = await dbContext.Cars.create(body)
    return car
  }

  async edit(update) {
    let original = await this.getById(update.id)
    // only change properties you want, and that exist
    original.make = update.make || original.make
    original.model = update.model || original.model
    original.year = update.year || original.year
    original.price = update.price || original.price
    original.imgUrl = update.imgUrl || original.imgUrl
    original.description = update.description || original.description

    await original.save()

    return original
  }
  async remove(id) {
    const car = await this.getById(id)
    await car.remove()
  }

}

export const carsService = new CarsService()