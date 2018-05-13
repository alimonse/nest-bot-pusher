import { Component } from '@nestjs/common';
import axios from 'axios';

@Component()
export class BotService {
    
    private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
    private token: string = "b0d582a6e3c54ce9b468e42a060d96df";
    
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
            appId: '446356',
            key: '4dc6e14ad6a0472b713d',
            secret: 'bc902d7b7128e5088b09',
            cluster: 'eu',
            encrypted: true
        });

        const response = {
            query: query,
            speech: speech
        }
        
        pusher.trigger('bot', 'bot-response', response);
    }
    
}