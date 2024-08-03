import mongoose,{Schema} from 'mongoose';

const menuCategories = new Schema({
    category: {
        type: String,
        required: true
    }
})

export default mongoose.model('Categories', menuCategories);