import mongoose from 'mongoose';

/* ItemSchema will correspond to a collection in your MongoDB database. */
const ItemSchema = new mongoose.Schema({
  name: {
    /** The name of this item */

    type: String,
    required: [true, 'Please provide a name for this item.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  completed: {
    /** The status of TODO items */

    type: Boolean,
  },
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
