import mongoose from 'mongoose'
const Schema = mongoose.Schema



export const HouseSchema = new Schema({
    color: { type: String, required: true },
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    yearbuilt: { type: Number, required: true, },
    description: { type: String, required: true, min: 1 },
    imgUrl: { type: String, default: 'https://www.istockphoto.com/photos/shack' },
    // creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

HouseSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_Id',
    justOne: true
})