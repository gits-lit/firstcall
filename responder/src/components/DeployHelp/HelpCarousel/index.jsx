import React, { useEffect, useState }from 'react';
import { Button, Carousel } from 'antd';

import './style.scss';

const HelpCarousel = (props) => {
  const [fixedCount, setFixedCount] = useState(0);
  const [unitCount, setUnitCount] = useState(0);
  const [changeType, setChangeType] = useState('All');
  let index = 0;

  useEffect(() => {
    let tempChange = 'All';
    if (props.unitType !== '' && ('ambulance'.startsWith((props.unitType).toLowerCase()) || 'police'.startsWith((props.unitType).toLowerCase()) || 'swat'.startsWith((props.unitType).toLowerCase()))) {
      tempChange = props.unitType;
    }
    setChangeType(tempChange);
    
    let count = 0;
    let totalCount = 0;
    for (let i = 0; i < props.unit.length; i++) {
      if ((props.unit[i].type.toLowerCase()).startsWith(props.unitType.toLowerCase())) {
        count += 1;
      }
      if (tempChange === 'All' || (props.unit[i].type.toLowerCase()).startsWith(tempChange.toLowerCase())) {
        totalCount += 1;
      }
    }
    setFixedCount(count);
    setUnitCount(totalCount);
  }, [props.unit, props.type]);

  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    slidesToShow: 1,
    centerPadding: '0',
  };

  return (
    <div className="help-carousel-container">
      <Carousel {...settings}>
        {props.unit.map((info) => {
          if (changeType === 'All' || (info.type.toLowerCase()).startsWith(changeType.toLowerCase())) {
            index += 1;
            return (
              <div className="help-carousel">
                <div className="carousel-header">
                  <h1 className="total">{fixedCount} Results found for &#x2018;{props.unitType}&#x2019;</h1>
                  <h1 className="index">{index} of {unitCount}</h1>
                </div>
                <div className="carousel-body">
                  <img src={info['unit-img']} alt="unit-image" className="unit-image" />
                  <div className="description">
                    <h1>{info.name}</h1>
                    <h2 className="address">{info.address}</h2>
                    <div className="carousel-buttons">
                      <Button className="skip">Skip</Button>
                      <Button>Request</Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
        </Carousel>
      </div>
  )
}

export default HelpCarousel;