import "./css/styles.css"

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid } from "material-ui";

import { Link } from "react-router-dom";

class LandingPage extends Component {

  render() {

    return (
      <Fragment>

        <div
          className="landing--bg"
        >
          <div className="mui-container-fluid">
            <Grid
              // className="mui-row"
              container
              style={{
                textAlign: "center",
                paddingTop: 50,
              }}
            >
              <Grid
                // className="mui-col-sm-2 mui-col-xs-0"
                item
                xs={0}
                sm={2}
              >
              </Grid>
              <Grid
                // className="mui-col-sm-8 mui-col-xs-12"
                item
                xs={12}
                sm={8}
              >
                <h2 className="h2main">
                  Все пабы Москвы на карте города (с ценами)
                </h2>
                <p style={{
                  color: "#fff",
                }}>
                  На нашем сайте Вы можете выбрать пенное, которое хотели бы отведать и подобрать заведение, где его можно купить. И сколько заплатить.
                  Самое главное: не забудьте поделиться впечатлениями, так как Ваше мнение не только невероятно ценно само по себе, но полезно сообществу
                  единомышленников!
                </p>
                <Link to="/map/@55.752898,37.621908,11/" className="mui-btn mui-btn--primary"
                  style={{
                    marginBottom: 25,
                    marginTop: 25,
                  }}
                >
                  ПЕРЕЙТИ НА КАРТУ - МНЕ УЖЕ ИСПОЛНИЛОСЬ 18 ЛЕТ
                </Link>
                <Link to="/map/@55.752898,37.621908,11/">
                  <img src="img/map.jpg" alt="" width="100%" />
                </Link>
              </Grid>
              <Grid
                item
                xs={0}
                sm={2}
              >
              </Grid>

            </Grid>

          </div>
        </div>

      </Fragment>
    );
  }
}


export default LandingPage;