
new Vue({
  el: '#app',
  data: {
    chats: [],
  },
  created() {
    let pusher = new Pusher('YOUR_APP_KEY', {
      cluster: 'CLUSTER',
      encrypted: true
    });
    
    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      console.log(data);
      const response = {
        speech: data.speech,
        query: data.query
      }
      
      this.chats.push(response);
    });
  },
  methods: {
    
    sendChat(event) {
      const chatMessage = event.target.value;
      
      if(event.keyCode === 13 && !event.shiftKey) {
        const chat = {
          message: chatMessage
        };
        
        event.target.value = "";
        
        axios.post('/', chat)
        .then( data => {
          console.log(data);
        });
      }
    }
  }
})
