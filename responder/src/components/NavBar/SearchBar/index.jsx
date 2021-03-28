import React, { useState } from 'react';
import './style.scss';

import search from '.../../../public/search.svg'
import location from '.../../../public/location.svg'

const SearchBar = (props) => {
  const [address, setAddress] = useState('');

  return (
    <div className="search-bar">
      <img className="location" src={location} alt="location pin"/>
      <input
        onChange={e => setAddress(e.target.value)}
        placeholder='Search for any location here'
        type="text"
        value={address}
        />
      <img className = "search" src={search} alt="search"/>
    </div>
  )
}

export default SearchBar;
