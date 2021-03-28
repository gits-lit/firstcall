import React, { useState } from 'react';
import { Button } from 'antd'

import IncidentDropdown from '../IncidentDropdown'
import './style.scss';

const InfoTab = (props) => {
  const [allergiesTags, setAllergiesTags] = useState([]);
  const [medicalTags, setMedicalTags] = useState([]);
  const [value, setValue] = useState('');
  const [allergyValue, setAllergyValue] = useState('');

  const addMedicalTags = (value) => {
    setMedicalTags([...medicalTags, value]);
  };

  const removeMedicalTags = (index) => {
    let newArr = []
    for (let i = 0; i < medicalTags.length; i++) {
      if (i !== index) {
        newArr.push(medicalTags[i]);
      }
    }
    setMedicalTags(newArr);
  };

  const addAllergiesTags = (value) => {
    setAllergiesTags([...allergiesTags, value]);
  };

  const removeAllergiesTags = (index) => {
    let newArr = []
    for (let i = 0; i < allergiesTags.length; i++) {
      if (i !== index) {
        newArr.push(allergiesTags[i]);
      }
    }
    setAllergiesTags(newArr);
  };

  return (
    <div className="info-description">
      <IncidentDropdown />
      <div className="info-form">
        <h2>Location</h2>
        <div className="info">
          <h1>Caller Name</h1>
          <input type="text" />
        </div>
        <div className="info">
          <h1>Address</h1>
          <input type="text"/>
        </div>
        <div className="two-info">
          <div className="info left">
            <h1>Apt &#35;</h1>
            <input type="text"/>
          </div>
          <div className="info">
            <h1>Floor &#35;</h1>
            <input type="text"/>
          </div>
        </div>
        <h2>Patient Health</h2>
        <h3>Calling on behalf of someone?</h3>
        <form className="checkmark">
          <input className="behalf"name="behalf" type="radio" value="Yes"/>
          <label for="Yes">Yes</label><br/>
          <input className="behalf" name="behalf" type="radio" value="No"/>
          <label for="No">No</label><br/>
        </form>
        <div className="two-info">
          <div className="info left">
            <h1>Height</h1>
            <input type="text"/>
          </div>
          <div className="info">
            <h1>Weight</h1>
            <input type="text"/>
          </div>
        </div>
          <h2>Medical Conditions</h2>
          <div className="tags">
            {
              medicalTags.map((info, index) => {
                return (
                  <div className="tag tag-container">
                    <div className="added-tag" key={index}
                      onClick={() => {
                        removeMedicalTags(index);
                      }}>
                        {info}
                    </div>
                    <div className="close">✕</div>
                  </div>
                )
              })
            }
            <input className="tag new-tag"
              type="text" value={value}
              placeholder="&#43; New Tag"
              onKeyUp={e => {
                if(e.key === 'Enter') {
                  addMedicalTags(e.target.value);
                  setValue('');
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}>
            </input>
          </div>
          <h2>Allergies?</h2>
          <div className="tags">
            {
              allergiesTags.map((info, index) => {
                return (
                  <div className="tag tag-container">
                    <div className="added-tag" key={index}
                      onClick={() => {
                        removeAllergiesTags(index);
                      }}>
                        {info}
                    </div>
                    <div className="close">✕</div>
                  </div>
                )
              })
            }
            <input className="tag new-tag"
              type="text" value={allergyValue}
              placeholder="&#43; New Tag"
              onKeyUp={e => {
                if(e.key === 'Enter') {
                  addAllergiesTags(e.target.value);
                  setAllergyValue('');
                }
              }}
              onChange={(e) => {
                setAllergyValue(e.target.value);
              }}>
            </input>
          </div>
          <h2>Medications?</h2>
          <div className="info">
          <h1>Additional Notes</h1>
          <span className="textarea" role="textbox" contentEditable={true}></span>
        </div>
      </div>
    </div>
  )
}

export default InfoTab;