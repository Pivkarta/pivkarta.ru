

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


describe('Sportpoisk page', () => {
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
      name: "Companies page",
      pathname: "/companies/",
      title: "Компании",
    },
    {
      name: "Company create page",
      pathname: "/companies/create/",
      title: "Добавить компанию",
    },
    {
      name: "Company not found page",
      pathname: "/companies/__/",
      // title: "Page not found",
      // status: 404,
    },
    {
      name: "Places page",
      pathname: "/places/",
      title: "Заведения",
      status: 200,
    },
    {
      name: "Place create page",
      pathname: "/places/create",
      title: "Добавить ГеоОбъект",
    },
    {
      name: "Place not found page",
      pathname: "/places/__/",
      // title: "Page not found",
      // status: 404,
    },
    {
      name: "Services page",
      pathname: "/services/",
      title: "Услуги",
      status: 200,
    },
    {
      name: "Services create page",
      pathname: "/services/create",
      title: "Добавить услугу",
    },
    {
      name: "Services not found page",
      pathname: "/services/__/",
      // title: "Page not found",
      // status: 404,
    },
    {
      name: "Page not found",
      pathname: "/404/",
      title: "Page not found",
      status: 404,
    },
    {
      name: "Place index",
      pathname: "/place/index/",
    },
    {
      name: "Place showlist",
      pathname: "/place/showlist/",
      title: "Все Бары, пабы, спорт-бары, пивные рестораны | Пивная карта",
    },
    {
      name: "Moscow",
      pathname: "/moskva/",
    },
    {
      name: "Moscow map",
      pathname: "/moskva/@55.753215,37.622504,12",
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    },
    {
      name: "Map",
      pathname: "/map/",
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    },
    {
      name: "Map",
      pathname: "/map/@55.752898,37.621908,11/",
      title: "Пивная карта: все бары, пабы, пивные рестораны на карте. Магазины разливного пива и все сорта пива",
    },
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
      title: "The Beer Store, пивной бутик | Пивная карта",
    },
    {
      name: "Beers",
      pathname: "/beer/showlist/",
      title: "Все сорта пива | Пивная карта",
    },
    {
      name: "Beer page",
      pathname: "/beer/851/koff-export",
      title: "Koff export | Пивная карта",
    },
    {
      name: "Blogs",
      pathname: "/blog/showlist/",
      title: "Все блоги | Пивная карта",
    },
    {
      name: "Blog page",
      pathname: "/topics/novogodnie-i-rojdestvenskie-sorta-piva/",
      title: "Новогодние и рождественские сорта пива | Пивная карта",
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
    {
      name: "Letters",
      pathname: "/letters",
    },
  ]


  while (rules.length) {

    const rule = rules.splice(0, 1)[0];

    const {
      name,
      pathname,
      title,
      status = 200,
    } = rule;


    it(name, () => {

      render(<Renderer
        pathname={pathname}
      >
      </Renderer>, node, () => {

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


        // console.log("document status", global.document);

        expect(currentPathname).toEqual(pathname);

        title && expect(currentTitle).toEqual(title);

        expect(currentStatus).toBe(status);

      })
    });

  }




})

