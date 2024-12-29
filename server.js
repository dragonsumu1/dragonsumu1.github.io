const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

const musicDirectory = path.join(__dirname, 'public/music');
const pictureDirectory = path.join(__dirname, 'public/pictures');

app.use('/pictures', express.static(pictureDirectory));

app.get('/songs', (req, res) => {
    fs.readdir(musicDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read music directory' });
        }

        const songs = files.map(file => {
            const fileName = file.split('.').shift();
            return {
                title: fileName.replace(/_/g, ' '),
                artist: 'Unknown Artist', // You can update this if you have artist information
                file: `/music/${file}`,
                picture: `/pictures/${fileName}.jpg`
            };
        });

        res.json(songs);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
