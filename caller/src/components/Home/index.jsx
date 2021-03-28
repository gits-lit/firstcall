import Camera from '../Camera'

import socketIOClient from "socket.io-client";

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const Home = () => {
  return (
    <div>
      
    </div>
  )
}

export default Home;
