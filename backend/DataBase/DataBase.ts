import mongoose from 'mongoose';


export const ConnectDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log(`Mongo DB Connection Is Successful`)
    } catch (error) {
        console.log(error)
    }
}