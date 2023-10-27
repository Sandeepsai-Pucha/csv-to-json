const express = require('express')
const multer = require('multer')
const csvtojson = require('csvtojson')
const path = require('path')


const PORT = 8000
const csvFilePath = require('../csv-to-json/samplecsv.csv')

const dataBase = require('./App/models/db.model')
const JsonDataModel = dataBase.jsonFile

const app = express()
app.use(express.urlencoded({extended:true}))

const multerMiddleWare = multer({
    dest: './uploads/'
});

app.post('/upload-csv', multerMiddleWare.single("file"), async (request, response) => {
    console.log("Inside api call")
    const csvFile = request.file.csvFile
    // Converting Data to JSON 

    const absolutePath = path.join(__dirname, '..', 'csv-to-json', 'NEWCSVFILE.csv')
    const jsonData = await csvtojson().fromFile(absolutePath) 

    // Creating an Instance 

    const jsonDataModel = new JsonDataModel()

    // Passing Data 

    jsonDataModel.json_data = jsonData

    //Saving Data in DB

    jsonDataModel.save();

    response.status(200).send({Message: "File Uploaded Successfully"})
});

app.get('/csv', (request, response) => {
    response.send(jsonData)
})

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
});
