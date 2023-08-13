// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Parse JSON request and response body
app.use(bodyParser.json());

// Post /events
app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if (type === 'CommentCreated') {
        // Check if comment has the word 'orange'
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        // Emit event to event bus
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
});

// Listen on port 4003
app.listen(4003, () => {
    console.log('Listening on 4003');
});