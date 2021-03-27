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
    const tempData = [...data];
    tempData.shift();
    tempData.push({
      bpm: (Math.random() * 20) + 50
    })
    setData(tempData)
   }, 3000) 
  })

  return (
    <div className='vitals-tab'>
      <h1>Heart Rate</h1>
      <div className="heart-rate-section">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis tick={false} dataKey=""/>
          <YAxis tick={false} dataKey=""/>
          <Line type="monotone" dataKey="bpm" stroke="#82ca9d" dot={false} />
        </LineChart>
      </div>
      <h1>Emotions</h1>
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
  )
}

export default VitalsTab;