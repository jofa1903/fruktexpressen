const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

// Get Posts 
router.get('/', async (req, res) =>{
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//Add posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//delete posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// update posts

router.put('/:id', async (req, res) => {
    const post= await loadPostCollection();
    await post.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set: {text: req.body.text}}
    );

    res.status(201).send();
});

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://jofa1903:korvmedbröd69@cluster0-grnqi.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true
        });

        return client.db('test').collection('posts');
}

module.exports = router;