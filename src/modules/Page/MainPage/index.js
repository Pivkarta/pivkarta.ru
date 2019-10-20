import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PageLayout from '../layout';




import Beers from "./Beers";


import Places from "./Places";
import Topics from "./Topics";
import Comments from "./Comments";



import Typography from "material-ui/Typography";
import AuthorizedAction from 'src/modules/authorized-action';
import AddLink from 'src/modules/ui/AddLink';

import { Link } from "react-router-dom";

import PlaceIcon from "material-ui-icons/Place";
import ListIcon from "material-ui-icons/List";

import { Grid } from 'material-ui';



export default class MainPage extends PageLayout {

  // static propTypes = {
  //   // prop: PropTypes
  // }

  // state = {}

  // static contextTypes = {
  //   ...PageLayout.contextTypes,
  //   getGeoCoords: PropTypes.func.isRequired,
  // }


  setPageMeta(meta) {
    // ToDo: добавить город

    // console.log("setPageMeta BeerPage", meta);

    if(meta === undefined){

      let title = "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива";
  
      meta = {
        title,
      }
      
    }

    return super.setPageMeta(meta);
  }


  render() {


    const {
      user: currentUser,
      getGeoCoords,
    } = this.context;
    
    // console.log("getGeoCoords", getGeoCoords);

    // return "MainPage";

    const {
      lat,
      lng,
    } = getGeoCoords() || {}

    return super.render(
      <div>




        <Grid
          container
          spacing={16}
          className="intro"
        >

          <Grid
            item
            xs={12}
            md={6}
          >
            <h2 className="h2main">
              Любимое пиво по вкусной цене (на карте города)
            </h2>
            <p>
              На нашем сайте Вы можете выбрать пиво, которое хотели бы отведать и подобрать заведение, где это пиво можно купить. И сколько
              заплатить. Самое главное: не забудьте поделиться впечатлениями, так как Ваше мнение не только невероятно ценно
              само по себе, но полезно сообществу единомышленников, любителям пива!
            </p>
            <Link to="/map" className="mui-btn mui-btn--primary">
              <i className="fas fa-map-marker-alt"></i> НАЙТИ ПИВО НА КАРТЕ
            </Link>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <Link to="/map" >
              <img
                src="img/map.jpg"
                alt=""
                style={{
                  width: "100%",
                }}
              />
            </Link>
          </Grid>

        </Grid>


        <hr />








        {/* <Typography
          variant="headline"
        >
          <Link
            to="/place/showlist/"
          >
            Новые бары и пивоварни
          </Link>
        </Typography> */}


       
        <h3 className="h3main">
          <i className="fas fa-award"></i> ЛУЧШИЕ ЗАВЕДЕНИЯ
        </h3>


        <Places
          // center={{
          //   lat: 55.752,
          //   lng: 37.621,
          // }}
          center={lat && lng ? {
            lat,
            lng,
          } : undefined}
          first={6}
          orderBy="createdAt_DESC"
          where={{
            active: true,
            image_not: null,
            OR: [{
              is_request: null
            }, {
              is_request: 0
            }],
            best: true,
          }}
        />


        <h3 className="h3main">
          <i className="fas fa-bullhorn"></i> НОВЫЕ БАРЫ И ПИВОВАРНИ
        </h3>

        <Places
          // center={{
          //   lat: 55.752,
          //   lng: 37.621,
          // }}
          first={6}
          orderBy="createdAt_DESC"
          where={{
            active: true,
            image_not: null,
            OR: [{
              is_request: null
            }, {
              is_request: 0
            }],
          }}
        />


        {/* <div
          style={{
            marginBottom: 15,
          }}
        >

          <Grid
            container
            spacing={8}
            alignItems="center"
          >

            <Grid
              item
              xs={12}
              md={4}
              className="center"
            >
              <Link
                to="/place/showlist/"
                className="flex-inline-row-center"
              >
                <ListIcon /> Смотреть все
            </Link>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              className="center"
            >
              <Link
                to="/map/"
                className="flex-inline-row-center"
              >
                <PlaceIcon /> Смотреть на карте
            </Link>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              className="center"
            >
              <AuthorizedAction
              // onError={event => {

              // }}
              >
                <AddLink
                  to="/places/create/"
                  title="Добавить заведение"
                />
              </AuthorizedAction>
            </Grid>

          </Grid>

        </div> */}


        {/* <Typography
          variant="headline"
          style={{
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <Link
            to="/blog/showlist/"
          >
            Новые публикации
          </Link>
        </Typography> */}


        <div
          className="maintext"
        >
          <h1 className="h1main">
            ПИВНАЯ КАРТА МОСКВЫ - РОССИИ - МИРА
          </h1>

          <Grid
            container
            spacing={40}
          >
            <Grid
              item
              xs={12}
              md={6}
              className="maintext__text"
            >
              <p>Если на вопрос "Какое пиво предпочитаешь?" вы отвечаете "Да мне, собственно, все равно", то отнести вас к сообществу
                любителей пива просто невозможно. Да и как дискутировать с равнодушным? А вот ответ "Смотря в какой ситуации" дает
                надежду на обстоятельный разговор. Действительно, человек, который мало-мальски погрузился в пивную культуру не
                должен бы выбрать одно и то же пиво для жаркого летнего дня и хмурого осеннего вечера, просмотра важного футбольного
                матча в компании школьных друзей и романтического вечера. Разные стили и марки пива по-разному сочетаются с настроениями,
                событиями, едой, карманом, наконец. Именно "карман" и навел на мысль создания этого сайта.
                </p>

              <p>Так случилось, что мне нравится пиво. Со временем появилось желание узнать об области пивоварения как можно больше.
                      Появилось понимание об отличиях эля и лагера, особенностях различных стилей и истории вопроса. Естественно, теория
                      суха без дегустации, так что когда возникала возможность попробовать те сорта, о которых только читал - предпочитал
                      пробовать. В поиске мест, где бы выпить интересное пиво, помогала сеть, есть даже пара ресурсов, которые позволяют
                      найти заведения с нужным пивом. Но вот ресурса с фильтром по цене на пиво обнаружено не было. Теперь такой ресурс
                      есть: пивная карта с фильтром по цене.
                  </p>

              <p>На нашем сайте представители баров и пабов, пивоварен и ресторанов, магазинов и пивных могут не только разместить
                      информацию о себе, но и добавить пивной ассортимент с ценами. А посетители сайта, любители пива, смогут подобрать
                      интересное для них заведение и из призрачного потенциального клиента стать реальным.
                    </p>


              {!currentUser
                ?
                <p>Любители и профессионалы пивного рынка, <AuthorizedAction>
                  <a href="javascript:;">присоединяйтесь</a>
                </AuthorizedAction>!</p>
                : null
              }

            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="maintext__buttons"
            >
              <p>
                Добавьте пивное заведение на сайт - поделитесь с коллегами и клиентами
              </p>
              <Link to="/places/create/" className="mui-btn mui-btn--primary">
                <i className="fas fa-plus-circle"></i> ДОБАВИТЬ ЗАВЕДЕНИЕ
              </Link>

              <hr />
              <p>
                Мы создаем обширную энциклопедию пива. Присоединйтесь!
              </p>
              <Link to="/beer/showlist/" className="mui-btn mui-btn--primary">
                <i className="fas fa-beer"></i> ЭНЦИКЛОПЕДИЯ ПИВА
              </Link>
              <hr />
              <p>
                Найдите любимое пиво на карте города по лучшей цене!
              </p>
              <Link to="/map" className="mui-btn mui-btn--primary">
                <i className="fas fa-map-marker-alt"></i> НАЙТИ ПИВО НА КАРТЕ
              </Link>
            </Grid>
          </Grid>
        </div>


        <h3 className="h3main">
          <i className="fas fa-beer"></i> ПОСЛЕДНИЕ ДОБАВЛЕННЫЕ СОРТА ПИВА
        </h3>

        <Beers
         
          first={6}
          orderBy="createdAt_DESC"
          
        />


        <h3 className="h3main">
          <Link
            to="/blog/showlist/"
          >
           <i className="fas fa-feather-alt"></i> НОВЫЕ ПУБЛИКАЦИИ
          </Link>
        </h3>


        <Topics
          first={2}
          where={{
            published: true,
          }}
        />


        {/* <Typography
          variant="headline"
          style={{
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <Link
            to="/comments/"
          >
            Новые комментарии
          </Link>
        </Typography> */}


        <h3 className="h3main">
          <Link
            to="/comments/"
          >
           <i className="far fa-comments"></i> НОВЫЕ КОММЕНТАРИИ
          </Link>
        </h3>


        <Comments
        />

      </div>
    )
  }
}
