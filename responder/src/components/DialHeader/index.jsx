import { useEffect, useState } from 'react';

import './style.scss';

const DialHeader = (props) => {
  return (
    <div className="dial-header">
      <h1>
        <div className="status-heading">Ongoing Call</div> | Case # 
      </h1>
    </div>
  )
}

export default DialHeader;