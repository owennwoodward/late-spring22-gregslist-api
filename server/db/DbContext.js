import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Car.js'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Cars = mongoose.model('Car', CarSchema)
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
