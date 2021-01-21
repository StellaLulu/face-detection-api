const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '296bb017507e40339d54a3d269231793'
   });


const handleApiCall = (req, res) => {
    app.models
        .predict({  id: "e15d0f873e66047e579f90cf82c9882z",
                    version:'0df9eb6c71674ada9bbec68729aa1c4c'}, 
                    req.body.input)
        .then(data => {
            res.json(data);
            })
            .catch(err => res.status(400).json('unable to work with API'))
}


// image - PUT -> user
const handleImage = (req, res, db) =>{
    const{id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}