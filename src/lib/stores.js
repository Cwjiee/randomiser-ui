// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";

export const currentUser = writable({});
export const msg = writable({content: ''});

export const connect = async () => {
  const socket = new WebSocket('ws://localhost:3000/cable');
  socket.addEventListener('open', () => {
    console.log('socket open');

    socket.send(JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "MessagesChannel"
      })
    }));
  });
  
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if(data.type === 'ping') return;
    console.log(data);

    if(data.type === 'confirm_subscription') {
      if(data.message) {
        msg.set(({content: data.message.content}));
      }
    }
    
    msg.set(({content: data.content}));
  });
  
  socket.addEventListener('close', () => {
    console.log('socket closed');
  });
  
  socket.addEventListener('error', (error) => {
    console.log('socket error : ' + error);
  });
}