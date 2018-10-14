
import PageLayout from "@prisma-cms/front/lib/modules/pages/layout";

// export default PageLayout;


import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import AuthorizedAction from 'src/modules/authorized-action';

// import CustomComponent from "Component";

export default class PivkartaPageLayout extends PageLayout {

  static propTypes = {
    // ...CustomComponent.propTypes,
    ...PageLayout.propTypes,
    renderWithPagination: PropTypes.bool.isRequired,
    createUrl: PropTypes.string,
  }

  static defaultProps = {
    // ...CustomComponent.defaultProps,
    ...PageLayout.defaultProps,
    renderWithPagination: false,
  }

  static contextTypes = {
    // ...CustomComponent.contextTypes,
    ...PageLayout.contextTypes,
    errors: PropTypes.array,
    // encrypt: PropTypes.func.isRequired,
    // decrypt: PropTypes.func.isRequired,
    user: PropTypes.object,
    // web3: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    // userAction: PropTypes.object.isRequired,
    getGeoCoords: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    // ...CustomComponent.childContextTypes,
    ...PageLayout.childContextTypes,
    setPageMeta: PropTypes.func,
  }


  // state = {}


  // getChildContext() {

  //   return {

  //     // Надо биндить, так как иначе не в том контексте вызывается
  //     setPageMeta: this.setPageMeta.bind(this),
  //   };
  // }

  // setPageMeta = (meta) => {
  setPageMeta(meta = {}) {



    let {
      title,
      description = "",
      // canonical,
      status = 200,
      ...other
    } = meta;

    if (!global.document) {
      global.document = {}
    }

    let {
      document,
    } = global;


    if (title) {



      const suffix = " | Пивная карта";

      // Проверять надо именно так, потому что new RegExp не понимает экранирование |
      if (!/ \| Пивная карта$|^Пивная карта\:/.test(title)) {
        title += suffix;
      }

      if (document.title !== title) {
        document.title = title;
      }

    }


    if (description !== undefined) {

      if (typeof window !== "undefined") {

        let head = document.querySelector("head");

        if(head){
          let descMeta = head.querySelector("meta[name=description]");
          if(descMeta){
            descMeta.content = description || "";
          }
        }

      }
      else {
        document.description = description;
      }

    }

    Object.assign(document, {
      ...other,
      status,
    });

  }


  // componentWillMount() {

  //   this.setPageMeta();

  //   super.componentWillMount && super.componentWillMount();
  // }


  render(content) {

    const {
      renderWithPagination,
    } = this.props;


    if (renderWithPagination) {

      content = this.renderWithPagination();

    }




    let footer = <footer
    >

      <Grid
        container
        className="footernew"
      >
        <Grid
          // className="mui-col-sm-4 mui-col-xs-12"
          item
          xs={12}
          sm={4}
        >
          <ul className="footernew__menu">
            <li>
              <Link to="/place/showlist/">Все заведения</Link>
            </li>
            <li>
              <Link to="/place/index/type/shop/">Магазины</Link>
            </li>
            <li>
              <Link to="/place/index/type/bar/">Бары</Link>
            </li>
            <li>
              <Link to="/place/index/type/brewery/">Пивоварни</Link>
            </li>
            <li>
              <Link to="/beer/showlist/">Энциклопедия пива</Link>
            </li>
            <li> 
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                  <!-- Yandex.Metrika informer -->
                  <a href="https://metrika.yandex.ru/stat/?id=40088775&amp;from=informer"
                  target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/40088775/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
                  style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" className="ym-advanced-informer" data-cid="40088775" data-lang="ru" /></a>
                  <!-- /Yandex.Metrika informer -->
                  `
                }}
              />
            </li>
          </ul>


        </Grid>
        <Grid
          // className="mui-col-sm-4 mui-col-xs-12"
          item
          xs={12}
          sm={4}
        >
          <ul className="footernew__menu">
            <li>
              <Link to="/blog/showlist/">Блоги</Link>
            </li>
            <li>
              <Link to="/profile/showlist/">Участники</Link>
            </li>
            <li>
              <Link to="/comments/">Комментарии</Link>
            </li>
            <li>
              <Link to="/contacts.html">Контакты</Link>
            </li>
          </ul>
        </Grid>
        <Grid
          // className="mui-col-sm-4 mui-col-xs-12"
          item
          xs={12}
          sm={4}
          className="footernew__buttons"
        >
          <Link to="/places/create/" className="mui-btn">
            <i className="fas fa-plus-circle"></i> ДОБАВИТЬ ЗАВЕДЕНИЕ
          </Link>
          <hr />
          <Link to="/beer/showlist/" className="mui-btn">
            <i className="fas fa-beer"></i> ЭНЦИКЛОПЕДИЯ ПИВА
          </Link>
          <hr />
          <Link to="/map/" className="mui-btn">
            <i className="fas fa-map-marker-alt"></i> НАЙТИ ПИВО НА КАРТЕ
          </Link>
        </Grid>
      </Grid>


      <div className="mui-row bottomline">
        <div className="mui-container-fluid">
          <div className="mui-row">
            <div className="mui-col-xs-12">
              <span className="bottomline__slogan">
                Чрезмерное употребление алкоголя вредит вашему здоровью
          </span>
            </div>
          </div>
        </div>
      </div>


    </footer>


    return content ? <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flexBasis: "100%",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          margin: "20px auto 0",
          padding: "0 10px",
          maxWidth: 1260,
          width: "100%",
        }}
      >
        {content}
      </div>

      {footer}

    </div> : null;

  }



  // getCoords() {

  //   const {
  //     location,
  //     router,
  //     user: currentUser,
  //     getGeoCoords,
  //   } = this.context;

    
  //   let currentCoords = getGeoCoords();




  //   let {
  //     route: {
  //       match: {
  //         params: {
  //           lat,
  //           lng,
  //         },
  //       },
  //     },
  //   } = router;

  //   let center;

  //   if (!lat || !lng) {
  //     lat = 55.752;
  //     lng = 37.621;
  //   }


  //   if (lat && lng) {
  //     center = {
  //       lat,
  //       lng,
  //     }
  //   }

  //   return center;

  // }


  getCoords() {

    const { 
      getGeoCoords,
    } = this.context;

    
    let currentCoords = getGeoCoords();


 
    const {
      lat,
      lng,
    } = currentCoords;

    let center = {}

    if (lat && lng) {
      center = {
        lat,
        lng,
      }
    }

    return center;

  }

  renderWithPagination() {

    const {
      View,
      first: limit,
      createUrl,
      ...other
    } = this.props;


    const {
      Renderer,
    } = this.state;

    const {
      location,
      user: currentUser,
    } = this.context;


    const {
      search,
    } = location;



    let {
      page,
    } = search || {};

    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * limit : 0;


    return (<Fragment>

      {createUrl ? <div
        style={{
          marginBottom: 20,
        }}
      >
        <AuthorizedAction
        // onError={event => {

        // }}
        >
          <Link
            to={createUrl}
          >
            Добавить публикацию
          </Link>
        </AuthorizedAction>
      </div>
        : null
      }

      <Renderer
        addObject={event => {
          this.addObject(event);
        }}
        page={page}
        skip={skip}
        first={limit}
        limit={limit}
        {...other}
      />
    </Fragment>)

  }

}
