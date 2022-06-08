import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"



class HousesService {

    async getAll(query = {}) {
        return await dbContext.Houses.find(query)
    }

    async getById(id) {
        const house = dbContext.Houses.findById(id)
        if (!house) {
            throw new BadRequest('wrong car Id')
        }
        return house
    }

    async create(body) {
        const house = await dbContext.Houses.create(body)
        return house
    }

    async edit(update) {
        let original = await this.getById(update.id)
        if (original.creatorId.toString() != update.creatorId) {
            throw new Forbidden('this isnt urs freak')
        }


        original.color = update.color || original.color
        original.bedrooms = update.bedrooms || original.bedrooms
        original.bathrooms = update.bathrooms || original.bathrooms
        original.yearbuilt = update.yearbuilt || original.yearbuilt
        original.description = update.description || original.description
        original.imgUrl = update.imgUrl || original.imgUrl

        await original.save()

        return original
    }

}



export const housesService = new HousesService()