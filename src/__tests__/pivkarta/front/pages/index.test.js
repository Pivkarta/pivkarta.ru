

import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "../App";
import chalk from 'chalk';



class Renderer extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string,
  }

  constructor(props) {

    super(props);

    const {
      pathname,
      title = "",
    } = props;

    window.history.pushState({}, title, pathname);

  }

  render() {

    return <TestApp
      {...this.props}
    />

  }
}


describe('Pivkarta pages', () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })



  let rules = [
    {
      name: "Main page",
      pathname: "/",
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    },
    {
      name: "Users page",
      pathname: "/users/",
      title: "Пользователи",
    },
    {
      name: "Page not found",
      pathname: "/404/",
      title: "Page not found",
      status: 404,
    },
    // {
    //   name: "Place index",
    //   pathname: "/place/index/",
    // },
    {
      name: "Place showlist",
      pathname: "/place/showlist/",
      title: "Все Бары, пабы, спорт-бары, пивные рестораны | Пивная карта",
    },
    {
      name: "Moscow",
      pathname: "/moskva/",
      // resultPathname: "/moskva/@55.753215,37.622504,12/",
    },
    {
      name: "Moscow map",
      pathname: "/moskva/@55.753215,37.622504,12/",
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    },
    {
      name: "Map",
      pathname: "/map/",
      // resultPathname: "/map/@55.752898,37.621908,11/",
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    },
    // {
    //   name: "Map",
    //   pathname: "/map/@55.752898,37.621908,11/",
    //   title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    // },
    {
      name: "Shops",
      pathname: "/place/index/type/shop/",
      title: "Магазины разливного, крафтового и серийного пива | Пивная карта",
    },
    {
      name: "Bars",
      pathname: "/place/index/type/bar/",
      title: "Бары, пабы, спорт-бары, пивные рестораны | Пивная карта",
    },
    {
      name: "Brewery",
      pathname: "/place/index/type/brewery/",
      title: "Пивоварни разливного, крафтового пива | Пивная карта",
    },
    {
      name: "Place page",
      pathname: "/place/5592/the-beer-store-pivnoy-butik/",
      // title: "The Beer Store, пивной бутик | Пивная карта",
    },
    {
      name: "Beers",
      pathname: "/beer/showlist/",
      title: "Все сорта пива | Пивная карта",
    },
    {
      name: "Beer page",
      pathname: "/beer/851/koff-export",
      // title: "Koff export | Пивная карта",
    },
    {
      name: "Blogs",
      pathname: "/blog/showlist/",
      title: "Все блоги | Пивная карта",
    },
    {
      name: "Blog page",
      pathname: "/topics/novogodnie-i-rojdestvenskie-sorta-piva/",
      // title: "Новогодние и рождественские сорта пива | Пивная карта",
    },
    {
      name: "Contacts",
      pathname: "/contacts.html",
      title: "Контакты | Пивная карта",
    },
    {
      name: "Comments",
      pathname: "/comments/",
      title: "Все комментарии | Пивная карта",
    },
    {
      name: "Comment page",
      pathname: "/comments/comment-23.html",
    },
    // {
    //   name: "Letters",
    //   pathname: "/letters",
    //   // status: 404,
    // },
  ]


  rules.map(rule => {

    // const rule = rules[i];


    // const rule = rules.splice(0, 1)[0];

    const {
      name,
    } = rule;

    it(name, () => {

      return new Promise(resolve => {
        
        const {
          pathname,
          resultPathname,
          title,
          status = 200,
        } = rule;
  
        Object.assign(global.document, {
          title: undefined,
          status: undefined,
        });

        render(<Renderer
          pathname={pathname}
        >
        </Renderer>, node, () => {


          setTimeout(() => {

            const {
              document: {
                title: currentTitle,
                status: currentStatus,
              },
              window: {
                location: {
                  pathname: currentPathname,
                },
              },
            } = global;

            console.log(chalk.green("document status"), global.document.status, currentStatus);

            // expect(currentPathname).toEqual(resultPathname ? resultPathname : pathname);

            // title && expect(currentTitle).toEqual(title);

            if (status) {
              // expect(currentStatus).toBe(status);
            }

            resolve();

          }, 300);

        })

      });

    });

  })


})

