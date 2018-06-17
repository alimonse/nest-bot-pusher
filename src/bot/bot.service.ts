import { Component } from '@nestjs/common';
import axios from 'axios';

@Component()
export class BotService {
    
    private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
    private token: string = "YOUR_DEVELOPER_TOKEN";
    
    sendDialogue(info) {
        
        let data = {
            query : info.message,
            lang: 'en',
            sessionId: '123456789!@#$%'
        }

        axios.post(`${this.baseURL}`, data, {headers: { Authorization: `Bearer ${this.token}` }})
        .then( response => {
            this.postToPusher(response.data.result.fulfillment.speech, data.query);
        })    
    }

    postToPusher(speech, query) {
        const Pusher = require('pusher');
    
        var pusher = new Pusher({
            appId: 'YOUR_APP_ID',
            key: 'YOUR_APP_KEY',
            secret: 'YOUR_APP_SECRET',
            cluster: 'CLUSTER',
            encrypted: true
        });

        const response = {
            query: query,
            speech: speech
        }
        
        pusher.trigger('bot', 'bot-response', response);
    }
    
}