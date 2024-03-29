import mongoose from 'mongoose';

/* 
  PetSchema will correspond to a collection in your MongoDB database
  even if the file name is in singular form. 
*/

const PetSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  owner_name: {
    /* The owner of this pet */

    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [30, "Owner's Name cannot be more than 30 characters"],
  },
  species: {
    /* The species of your pet */

    type: String,
    required: [true, 'Please specify the species of your pet.'],
    maxlength: [30, 'Species specified cannot be more than 30 characters'],
  },
  age: {
    /* Pet's age, if applicable */

    type: Number,
  },
  huggable: {
    /* Boolean huggable value, if applicable */

    type: Boolean,
  },
  diet: {
    /* List of dietary needs, if applicable */

    type: Array,
  },
  image_url: {
    /* Url to pet image */

    required: [true, 'Please provide an image url for this pet.'],
    type: String,
  },
  likes: {
    /* List of things your pet likes to do */

    type: Array,
  },
  dislikes: {
    /* List of things your pet does not like to do */

    type: Array,
  },
});

export default mongoose.models.Pet || mongoose.model('Pet', PetSchema);
