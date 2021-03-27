import Camera from '../Camera'
import socketIOClient from "socket.io-client";

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const Home = () => {
  return (
    <Camera socket={socket}/>
  )
}

export default Home;