import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Phone from "phone";




export function formatPhone(value) {



  let phone = value && value.replace(/[^0-9]/g, '') || "";



  if(!phone){
    return phone;
  }
 


  // phone = phone ? phone.substr(0, 11).split("").reduce((current, next, index) => {
  phone = phone ? phone.substr(0).split("").reduce((current, next, index) => {

    // if (index === 2 || index === 6) {
    //   current.push("/");
    // }
    // else if (index === 2 || index === 6) {
    //   current.push("/");
    // }
    current.push(next)
    return current
  }, []) : [];



  // return '+7' + value.join("");
  // return '+7' + value.join("");

  if(phone.length < 10 || phone.length > 11){
    return phone;
  }
  else if(phone.length === 10){
    phone.unshift(7)
  }



  value = phone;

  // return `+${value[0] || '#'}(${value[1] || '#'}${value[2] || '#'}${value[3] || '#'})${value[4] || '#'}${value[5] || '#'}${value[6] || '#'}-${value[7] || '#'}${value[8] || '#'}-${value[9] || '#'}${value[10] || '#'}`;
  return `+${value[0] || ''}(${value[1] || ''}${value[2] || ''}${value[3] || ''})${value[4] || ''}${value[5] || ''}${value[6] || ''}-${value[7] || ''}${value[8] || ''}-${value[9] || ''}${value[10] || ''}`;
}


export default class PhoneField extends Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
  };

  render() {

    const {
      object,
    } = this.props;

    let {
      phone,
    } = object || {};


    if (!phone) {
      return null;
    }


    let content = [];


    let phones = phone.split(",");

    phones.map((phone, index) => {

      phone = phone && phone.trim() || null;


      if (phone) {
        let parsedPhone = Phone(phone, "RU");



        if (parsedPhone.length) {
          phone = parsedPhone[0];
        }
      }

      if (!phone) {
        return null;
      }



      content.push(<a
        key={index}
        href={`tel:${phone.replace(/[^\+0-9]/g, '')}`}
        rel="nowollow"
      >
        {formatPhone(phone)}
      </a>);
    });




    return (
      content.filter(n => n).reduce((a, b) => [a, ", ", b])
    );
  }
}
