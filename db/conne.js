const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/restfulapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const myCollectionSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});
const MyModel = mongoose.model('myapitable', myCollectionSchema);
app.use(express.json());
app.get('/',(req,es)=>{
   res.send('hellow from the server ');
})
app.post('/post', async (req, res) => {
  try {
    const newItem = new MyModel({
      name: "ahmad",
      email: "ahmad@gmail.com",
      password: "yasirkhan"
    });
    const savedItem = await newItem.save();
    res.status(200).send(savedItem);
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'An error occurred while saving to the database.' });
  }
});

app.get('/get', async (req, res) => {
  try {
    const findData = await MyModel.findOne();
    res.status(200).send(findData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data.');
  }
});
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletebyid = await MyModel.findByIdAndDelete(id);
    if (deletebyid) {
      console.log('Deleted:', deletebyid);
      res.status(200).send(deletebyid);
    } else {
      console.log('Document not found for deletion');
      res.status(404).send('Document not found for deletion');
    }
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).send('An error occurred while deleting the document.');
  }
});
app.put('/put/:id', async (req, res) => {
  const id = req.params.id;
  try {
     const putdata = await MyModel.findByIdAndUpdate(id, req.body, { new: true });
     if (putdata) {
         res.status(200).send('Data is updated in react js', putdata);
     } else {
         res.status(404).send('Sorry, data not found in the database');
     }
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred in the database');
  }
});
app.patch('/patch/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const partialUpdatedData = await MyModel.findByIdAndUpdate(id, req.body, { new: true });
      if (partialUpdatedData) {
          res.status(200).send('Data updated: ' + partialUpdatedData);
      } else {
          res.status(404).send('Data not found in the database');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
