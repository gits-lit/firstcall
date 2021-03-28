import Camera from '../Camera'
import NavBar from '../NavBar'

import socketIOClient from "socket.io-client";

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const Home = () => {
  return (
    <NavBar/>
  )
}

export default Home;
