import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import {LetterPage} from '../';

import {
  createLetter,
} from 'src/modules/query';


export default class LetterCreatePage extends LetterPage {
 

  onSave(result){



    if(result){

      // const {
      //   data: object,
      // } = result.data && result.data.response || {}

      const {
        response: object,
      } = result.data || {}

      
      const {
        id,
      } = object || {}; 

      if(id){

        const {
          history,
        } = this.props;

        history.push(`/letters/${id}/`);
      }
      
    }

  }


  componentWillMount(){

    const {
      View,
    } = this.props;


    const Renderer = compose(
      graphql(createLetter, {
      }),
    
    )(View);

    Object.assign(this.state, {
      Renderer,
      data: {
        object: {},
      },
    });

  }


  getMessageTemplate(){


    const placeUri = this.getLocationQuery("placeUri");

    let url = placeUri ? `https://pivkarta.ru${placeUri}` : null;

    return `
    
    <div style="width: 100% !important; height: 100%; background: #efefef; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none;margin: 0;      padding: 0;      font-size: 100%;      font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  line-height: 1.65;">

    <table class="body-wrap" style="width: 100% !important;  height: 100%;  background: #efefef;  -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;">
      <tbody>
        <tr>
          <td class="container" style="padding: 5px;vertical-align: top; display: block !important; clear: both !important;margin: 0 auto !important; max-width: 580px !important;">


            <table style="width: 100% !important; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 5px;vertical-align: top;">

                  <img src="http://www.beermarket.su/assets/images/map.jpg" alt="пивная карта" width="100%" style="max-width: 100%;
        margin: 0 auto; display: block;">

                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 5px;vertical-align: top; background: white; padding: 30px 35px;">

                  <h2 style=" color:#008bd7; font-size: 28px; line-height: 1.25;">Владельцам пиварен, баров и магазинов. </h2>
                  <h3 style="font-size: 24px; line-height: 1.25;color: #008bd7;">
                    <i>Коммерческое предложение.</i>
                  </h3>

                  <p>Предлагаем вам уникальный информационный канал для развития бизнеса: пивной портал
                    <a href="https://pivkarta.ru" style=" color: #71bc37;   text-decoration: none;">pivkarta.ru</a>. Пользователи портала видят на карте 
                    ${placeUri ? `<a href="${placeUri}" style=" color: #71bc37;   text-decoration: none;">ваше заведение</a>` : "ваше заведение"}, ассортимент и главное стоимость пива.
                    Это позволяет потенциальному клиенту сделать выбор и превратиться в РЕАЛЬНОГО клиента. Добавление заведения
                    на сайт происходит бесплатно. Для добавления ассортимента и цен необходимо оформить один из тарифных планов.
                </td>
              </tr>

              <tr>
                <td class="content blue" style="padding: 5px; vertical-align: top; background-color:#008bd7; padding: 30px 35px;  color: #ffffff;">

                  <center>
                    <br/>
                    <img src="http://www.beermarket.su/assets/images/ico2.png" alt="" width="70" style="max-width: 100%;
        margin: 0 auto; display: block;">
                    <br/>
                    <h4 style="font-size: 20px; line-height: 1.25;color: #ffffff">Добавьте вашу пивоварню, бар или магазин на карту БЕСПЛАТНО</h4>

                    <br/>
                    <br/>
                    <h3 style="font-size: 28px; line-height: 1.25;color: #ffffff;">Внесите ваш ассортимент</h3>
                  </center>

                  <br/>
                  <table width="100%" style="width: 100% !important; border-collapse: collapse;">
                    <tbody>
                      <tr>
                        <td align="center" width="32%" style="line-height: 1.2; color:#ffffff;vertical-align: top; padding: 5px;">
                          <center>
                            <h4 style="font-size: 20px; line-height: 1.25;color: #ffffff">СТАРТ</h4>
                            <img src="http://www.beermarket.su/assets/images/ico1.png" alt="" width="50" style="max-width: 100%;
        margin: 0 auto; display: block;">
                            <br/> до 10 позиций 100 руб/мес
                          </center>
                        </td>
                        <td align="center" width="32%" style="line-height: 1.2; color:#ffffff;vertical-align: top; padding: 5px;">
                          <center>
                            <h4 style="font-size: 20px; line-height: 1.25;color: #ffffff">БИЗНЕС</h4>
                            <img src="http://www.beermarket.su/assets/images/ico1.png" alt="" width="50" style="max-width: 100%;
        margin: 0 auto;     display: inline;">
                            <img src="http://www.beermarket.su/assets/images/ico1.png" alt="" width="50" style="max-width: 100%;
        margin: 0 auto;     display: inline;">
                            <br/> до 25 позиций + уникальная иконка 1000 руб/мес
                          </center>
                        </td>
                        <td align="center" width="32%" style="line-height: 1.2; color:#ffffff;vertical-align: top; padding: 5px;">
                          <center>
                            <h4 style="font-size: 20px; line-height: 1.25;color: #ffffff">МАКСИМУМ</h4>
                            <img src="http://www.beermarket.su/assets/images/ico1.png" alt="" width="50" style="max-width: 100%;
        margin: 0 auto;     display: inline;">
                            <img src="http://www.beermarket.su/assets/images/ico1.png" alt="" width="50" style="max-width: 100%;
        margin: 0 auto;     display: inline;">
                            <img src="http://www.beermarket.su/assets/images/ico1.png" alt="" width="50" style="max-width: 100%;
        margin: 0 auto;     display: inline;">
                            <br/> до 100 позиций + уникальная иконка + рекламный баннер 5000 руб/мес
                          </center>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                  <br/>
                  <br/>
                  <center style=" color:#ffffff;">
                    Если 100 позиций вам мало - не страшно! Пишите, обсудим индивидуальные условия.
                  </center>

                </td>
              </tr>

            </table>

          </td>
        </tr>
        <tr>
          <td class="container" style="padding: 5px; vertical-align: top;display: block !important; clear: both !important;margin: 0 auto !important; max-width: 580px !important;">


            <table style="width: 100% !important; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td class="content footer" align="center" style="padding: 5px; vertical-align: top;  background: none;
        padding: 30px 35px;">


                    <table>
                      <tbody>
                        <tr>
                          <td align="center" style="padding: 5px; vertical-align: top;">
                            <p style="margin-bottom: 0; color: #888;text-align: center;  font-size: 14px;">
                              <a href="https://pivkarta.ru" class="button" style="color:#ffffff;font-size:25px;display: inline-block;
              background: #71bc37;     border: solid #71bc37;     border-width: 10px 20px 8px;     font-weight: bold;     border-radius: 4px; text-decoration: none;">Перейти на сайт pivkarta.ru</a>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>


                    <p  style="margin-bottom: 0; color: #888;text-align: center;  font-size: 14px;">Контакты
                      <a href="mailto:d.popov@pivkrta.ru" style=" color: #888; text-decoration: none;font-weight: bold;">d.popov@pivkarta.ru</a>
                    </p>

                  </td>
                </tr>
              </tbody>
            </table>

          </td>
        </tr>
      </tbody>
    </table>
    
  </div>

    `;

  }


  render() {

    // return null;

    const {
      View,
      ...other
    } = this.props;


    const {
      Renderer,
      data,
    } = this.state;

    const placeId = this.getLocationQuery("placeId");
    const email = this.getLocationQuery("email");

    const message = this.getMessageTemplate();

    return super.render(<Renderer
      data={data}
      onSave={result => this.onSave(result)}
      _dirty={{
        // name: "",
        Place: placeId ? {
          id: placeId,
        } : undefined,
        email,
        subject: "Ваше заведение на портале Пивкарта.ру",
        message,
      }}
      {...other}
    />)

  }

}
