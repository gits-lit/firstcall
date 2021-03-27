import React, { useEffect, useState, useRef }from 'react';
import { Button, Carousel } from 'antd';

import './style.scss';

const HelpCarousel = (props) => {
  const ref = useRef();
  const [fixedCount, setFixedCount] = useState(0);
  let index = 0;

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < props.unit.length; i++) {
      if ((props.unit[i].type.toLowerCase()).startsWith(props.searchValue.toLowerCase()) || (props.unit[i].name.toLowerCase()).startsWith(props.searchValue.toLowerCase())) {
        count += 1;
      }
    }
    if (ref && ref.current) {
      if (count >= 1) {
        ref.current.goTo(0 , true);
      }
    }
    setFixedCount(count);
  }, [props.unit, props.searchValue]);

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
      <Carousel {...settings} ref={ref}>
        {props.unit.map((info) => {
          if (props.searchValue === ''
            || (info.type.toLowerCase()).startsWith(props.searchValue.toLowerCase())
            || (info.name.toLowerCase()).startsWith(props.searchValue.toLowerCase())) {
            index += 1;
            return (
              <div className="help-carousel">
                <div className="carousel-header">
                  { props.searchValue ? <h1 className="total">{fixedCount} Results found for &#x2018;{props.searchValue}&#x2019;</h1>
                  : <h1>{fixedCount} Results found</h1>}
                  <h1 className="index">{index} of { fixedCount > 0 ? fixedCount : 4 }</h1>
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
        { fixedCount === 0 && props.searchValue.length > 0 ? <div className="help-carousel">
            <div className="carousel-header">
              <h1 className="total">0 Results found for &#x2018;{props.searchValue}&#x2019;</h1>
              <h1 className="index">0 of 0</h1>
            </div>
          </div> : null}
        </Carousel>
      </div>
  )
}

export default HelpCarousel;