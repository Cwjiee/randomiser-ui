// place files you want to import through the `$lib` alias in this folder.
import { writable } from "svelte/store";

export const currentUser = writable({});
export const messageStore = writable({});
export const userStore = writable({});

export const connectCurrentUser = () => {
  const name = JSON.parse(localStorage.getItem('currentUser')).name || {};
  const data = {name: name};
  currentUser.set(data);
}

export const connectMessage = async () => {
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
    if(data.type === 'confirm_subscription') return;
    if(data.type === 'welcome') return;

    console.log(data.message);
    messageStore.set(data.message);
    
  });
  
  socket.addEventListener('close', () => {
    console.log('socket closed');
  });
  
  socket.addEventListener('error', (error) => {
    console.log('socket error : ' + error);
  });
}

export const connectUsers = async () => {
  const socket = new WebSocket('ws://localhost:3000/cable');
  socket.addEventListener('open', () => {
    console.log('socket open');

    socket.send(JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "UsersChannel"
      })
    }));
  });
  
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if(data.type === 'ping') return;
    if(data.type === 'confirm_subscription') return;
    if(data.type === 'welcome') return;

    console.log(data);
    userStore.set(data);
    
  });
  
  socket.addEventListener('close', () => {
    console.log('socket closed');
  });
  
  socket.addEventListener('error', (error) => {
    console.log('socket error : ' + error);
  });
}

export default {
  subscribeMessage: messageStore.subscribe,
  subscribeUser: userStore.subscribe,  
};