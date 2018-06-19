window.WebSocket = window.WebSocket || window.MozWebSocket;

export default class Websocket {
  init() {
    return new Promise((resolve, reject) => {
      if (!window.WebSocket) {
        console.log('your browser doesnt support websocket');
      }
      this.connection = new WebSocket('ws://127.0.0.1:3000');
      this.connection.addEventListener('open', () => {
        console.log('websocket connection is opened and read to use');
        resolve();
      });

      this.connection.addEventListener('error', (err) => {
        console.log('websocket connection failed:', err);
        reject(err);
      });

      this.connection.addEventListener('message', (message) => {
        try {
          const data = JSON.parse(message.data);
          console.log(data);
        } catch (e) {
          console.log('This doesn\'t look like a valid JSON: ', message.data);
        }
      });
    });
  }

  requireConnection() {
    if (!this.connection) {
      console.log("you haven't establish a websocket connection to the serve");
    }
  }

  addSongToQueue(id) {
    this.requireConnection();
    this.connection.send(JSON.stringify({ event: 'add song to queue', id }));
  }
}
