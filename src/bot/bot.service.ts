import { Component } from '@nestjs/common';
import axios from 'axios';

@Component()
export class BotService {
    
    private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
    private token: string = "15deac4e2293494a9333b91ee332ac18";
    
     sendDialogue(info) {
        
        let data = {
            query : info.message,
            lang: 'es',
            sessionId: '123456789'
        }

     axios.post(`${this.baseURL}`, data, {headers: { Authorization: `Bearer ${this.token}` }})
        .then( response => {
    
    this.postToPusher(response.data.result.fulfillment.speech, data.query);
        })
        .catch(error=>{
            console.log(error )
        })  
    }

    postToPusher(speech, query) {
        const Pusher = require('pusher');
    
        var pusher = new Pusher({
            appId: '648856',
            key: 'c3e61a5723aba88edca4',
            secret: 'de4acb6b6c7922b9b0dd',
            cluster: 'us2',
            encrypted: false
        });

        const response = {
            query: query,
            speech: speech
        }
        
        pusher.trigger('bot', 'bot-response', response);
    }
    
}