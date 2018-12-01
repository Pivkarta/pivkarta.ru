import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
// import Express from 'express';
import { StaticRouter } from 'react-router';
import { InMemoryCache } from "apollo-cache-inmemory";

import fetch from 'node-fetch';

import React from 'react';

import { getDataFromTree } from "react-apollo"

import ReactDOM from 'react-dom/server';


import { createGenerateClassName } from 'material-ui/styles';

import MainApp from '../../App';


import chalk from "chalk";

import URI from 'urijs';

import cheerio from "cheerio";

var XMLWriter = require('xml-writer');

const { Prisma } = require('prisma-binding')

let api;

const JssProvider = require('react-jss').JssProvider;
const SheetsRegistry = require('react-jss').SheetsRegistry;


const fs = require("fs");

const PWD = process.env.PWD;

const HTML = fs.readFileSync(`${PWD}/build/index.html`, "utf8");


class Server {


  constructor(props = {}) {

    const {
      App,
      ...other
    } = props;

    api = new Prisma({
      typeDefs: 'src/schema/generated/api.graphql',
      endpoint: 'http://localhost:4000',
      secret: 'mysecret123',
      debug: false,
      ...other,
    });

    this.App = App || MainApp;

    this.props = props;

  }


  getApi(){

    return api;
  }


  middleware = async (req, res) => {

    /**
     * Надо сбрасывать этот объект, чтобы не попадали результаты прошлого выполнения
     */
    global.document = undefined;


    const protocol = req.headers["server-protocol"] || req.protocol || "http"; 

    const host = req.get('host');

    const uri = new URI(`${protocol}://${host}${req.url}`);

    const {
      page,
    } = uri.query(true);


    const urlPath = uri.path();


    let response;

    switch (urlPath.toLowerCase()) {


      case "/sitemap.xml":

        response = await this.renderSitemap(req, res, uri)
          .catch(error => {
            console.error(chalk.red("Server error"), error);
            res.status(500);
            res.end(error.message);
            ;
          });

        break;

      default: response = this.renderHTML(req, res, uri)
        .catch(error => {
          console.error(chalk.red("Server error"), error);
          res.status(500);
          res.end(error.message);
          ;
        });

    }

    return response;

  };


  async renderHTML(req, res) {


    let context = {}


    const {
      host: hostname,
      protocol = "http:",
      // referer,
    } = req.headers;


    let assetsUrl;

    let js_src;
    let css_src;

    let inline_styles;

    let basePath = process.cwd() + "/";

    let buildPath = basePath + "build/";



    const {
      App: MainApp,
      props: {
        queryFragments,
      },
    } = this;


    const client = new ApolloClient({
      ssrMode: true,
      // Remember that this is the interface the SSR server will use to connect to the
      // API server, so we need to ensure it isn't firewalled, etc
      link: createHttpLink({
        uri: `${protocol}//${hostname}/api/`,
        credentials: 'same-origin',
        headers: {
          cookie: req.header('Cookie'),
        },
        fetch,
      }),
      cache: new InMemoryCache(),
    });

    const sheets = new SheetsRegistry();

    const App = (
      <JssProvider
        registry={sheets}
        generateClassName={createGenerateClassName()}
      >
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={context}>
            <MainApp
              sheetsManager={new Map()}
              queryFragments={queryFragments}
            />
          </StaticRouter>
        </ApolloProvider>
      </JssProvider>
    );



    await getDataFromTree(App)
      .then(async () => {
        // We are ready to render for real
        const content = await ReactDOM.renderToString(App);
        const initialState = await client.extract();


        let {
          title,
          description,
          status,
          canonical,
        } = global.document || {};


        status = status || 200;


        function Html({
          content,
          state,
          sheets = "",
        }) {



          const $ = cheerio.load(HTML, {
            decodeEntities: false,
          })

          // console.log(chalk.green("$"), $);

          /**
           * Remove noscript notifi
           */

          $("noscript#react-noscript-notify").remove();

          let root = $("#root");


          let head = $("head");
          let body = $("body");

          if (title) {
            head.find("title").html(title);
          }

          // description = "Sdfdsfsdf";

          if (description) {

            let meta = head.find("meta[name=description]");

            if (!meta.length) {

              meta = $(`<meta 
                name="description"
              />`)

              head.append(meta);
            }


            // console.log(chalk.green("meta"), meta);

            meta.attr("content", description);
          }

          if (canonical) {

            let meta = head.find("link[rel=canonical]");

            if (!meta.length) {

              meta = $(`<link 
                rel="canonical"
              />`)

              head.append(meta);
            }

            meta.attr("href", canonical);
          }



          head.append(`<style
            id="server-side-jss"
          >
            ${sheets.toString()}
          </style>`);


          // <script dangerouslySetInnerHTML={{
          //   __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
          // }} />

          body.prepend(`<script type="text/javascript">
            ${`window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`}
          </script>`);

          root.html(content);

          return $.html();

          // const response = (
          //   <html>
          //     <head
          //       dangerouslySetInnerHTML={{
          //         __html: headHTML,
          //       }}
          //     >


          //     </head>

          //     <body>
          //       <div id="root" dangerouslySetInnerHTML={{ __html: content }} />

          //     </body>
          //   </html>
          // );


          const response___ = (
            <html>
              <head>
                <title>{title || "Prisma-CMS"}</title>

                <base href="/" />

                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={description || ""} />
                <meta name="language" content="Russian" />
                <meta http-equiv="content-language" content="ru" />

                <link rel="shortcut icon" href="/favicon.ico" />

                {canonical ? <link rel="canonical" href={canonical} /> : ""}

                {css_src ? <link
                  type="text/css"
                  rel="stylesheet"
                  href={css_src}
                /> : null}

                <style
                  id="server-side-jss"
                  key="server-side-jss"
                  type="text/css"
                  dangerouslySetInnerHTML={{ __html: sheets.toString() }}
                />


              </head>

              <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                <script dangerouslySetInnerHTML={{
                  __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
                }} />

                <script dangerouslySetInnerHTML={{
                  __html: `
                    setTimeout(() => {
                      var script = document.createElement('script');

                      script.setAttribute('src', '${js_src}');

                      document.head.appendChild(script);


                    }, 1000);
                    `,
                }} />

              </body>
            </html>
          );



          return response;
        }


        const output = Html({
          content,
          state: initialState,
          sheets,
        });

        res.charset = 'utf-8';

        res.writeHead(status, {
          'Content-Type': 'text/html; charset=utf-8',

        });
        // res.end(`<!doctype html>\n${output}`);
        res.end(output);



      })
      .catch(e => {

        console.error(chalk.red("Server errer"), e);

        res.writeHead(500, {
          'Content-Type': 'text/html; charset=utf-8',
        });
        res.end(e.message);
        ;
      });
  }


  /**
   * Рендеринк карты сайта.
   */
  async renderSitemap(req, res, uri) {

    let {
      section,
    } = uri.query(true);


    switch (section) {


      case "main":

        return this.renderMainSitemap(req, res, uri);
        break;

      default:
        return this.renderRootSitemap(req, res, uri);

    }



  }


  renderRootSitemap(req, res, uri) {

    const cleanUri = uri.clone().query(null)

    /**
     * Выводим ссылки на разделы
     */
    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')

    xml.startElement("sitemapindex")
      .writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    ;


    /**
     * Формируем ссылки на разделы
     */

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "main",
      }).toString())
      .endElement();


    xml.endDocument();



    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());

  }


  /**
   * Основные страницы
   */
  async renderMainSitemap(req, res, uri) {



    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    xml.startElement("urlset")
      .writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    ;



    this.addSitemapDocument(xml, uri, {
      url: `/`,
      priority: 1,
    })

    xml.endDocument();



    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;
  }



  addSitemapDocument(xml, uri, doc) {

    let {
      url,
      updatedAt,
      changefreq,
      priority,
    } = doc;


    const locUri = new URI(uri.origin()).path(url);


    xml.startElement("url")
      .writeElement("loc", locUri.toString())


    updatedAt && xml.writeElement("lastmod", updatedAt)

    changefreq && xml.writeElement("changefreq", changefreq)

    priority && xml.writeElement("priority", priority);

    xml.endElement();

  }

}


module.exports = Server;
