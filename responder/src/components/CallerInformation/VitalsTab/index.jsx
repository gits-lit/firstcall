import { useEffect, useState } from 'react';

import './style.scss'
import face from '../../../assets/face.png';
import { LineChart, Line, YAxis, XAxis} from 'recharts';

const VitalsTab = (props) => {
  const [data, setData] = useState([
    {
      name: 'Page A',
      bpm: 70
    },
    {
      bpm: 60,
    },
    {
      name: 'Page C',
      bpm: 71,
    },
    {
      name: 'Page D',
      bpm: 69,
    },
    {
      name: 'Page D',
      bpm: 70,
    },
  ]);


  useEffect(() => {
   setInterval(() => {
    const tempData = [...data, {bpm: (Math.random() * 10) + 50}];
    /*tempData.shift();
    tempData.push({
      bpm: (Math.random() * 20) + 50
    })*/
    setData(data => tempData)
   }, 3000) 
  }, [])

  return (
    <div className='vitals-tab'>
      <h1>Heart Rate</h1>
      <div className="heart-rate-section">
        <LineChart
          width={300}
          height={120}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis tick={false} dataKey=""/>
          <YAxis tick={false} dataKey=""/>
          <Line type="monotone" dataKey="bpm" stroke="#333333" strokeWidth={2} dot={false} />
        </LineChart>
      </div>
      <div className="current">Currently Tracking</div>
      <div className="current-bpm">{Math.floor(data[data.length-1].bpm)} bpm</div>

      <div className="full-emotions">
      <h1 className="emotion-header">Emotions</h1>
      <div className="emotions-section">
        <img className="face" src={face} />
        <div className="emotions">
          {props.emotions.map((emotion) => {
            return (
              <div className="emotion">
                <div className="feeling">
                  {emotion.feeling}
                </div>
                <div className="certainty">
                  {emotion.certainty}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </div>
  )
}

export default VitalsTab;