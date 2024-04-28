console.log("yes")
const express = require('express');
const Excel = require('exceljs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.text());
app.use(cors());

app.post('/save-speech', async (req, res) => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Transcripts');
    sheet.columns = [{ header: 'Spoken Text', key: 'text', width: 50 }];
    sheet.addRow({ text: req.body });
    console.log("Body",req.body)
    await workbook.xlsx.writeFile('Transcripts.xlsx');
    res.send({ message: 'File saved' });
});

app.listen(3000, () => console.log('Server started on port 3000'));