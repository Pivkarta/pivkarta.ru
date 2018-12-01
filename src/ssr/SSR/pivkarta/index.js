

var XMLWriter = require('xml-writer');

import SSR from "../";

export class PivkartaSSR extends SSR {


  /**
   * Рендеринк карты сайта.
   * Отдельные разделы с постраничностью:
   * 1. Пользователи
   * 2. Ресурсы
   * 3. Теги
   */
  async renderSitemap(req, res, uri) {

    let {
      section,
    } = uri.query(true);


    switch (section) {


      case "main":

        return this.renderMainSitemap(req, res, uri);
        break;

      case "users":

        return this.renderUsersSitemap(req, res, uri);
        break;

      case "beers":

        return this.renderBeersSitemap(req, res, uri);
        break;

      case "places":

        return this.renderPlacesSitemap(req, res, uri);
        break;

      case "topics":

        return this.renderTopicsSitemap(req, res, uri);
        break;

      case "comments":

        return this.renderCommentsSitemap(req, res, uri);
        break;

      default:
        return this.renderRootSitemap(req, res, uri);

    }



  }


  renderRootSitemap(req, res, uri) {

    const cleanUri = uri.clone().query(null)
    // .hostname("mamba.zone");

    /**
     * Выводим ссылки на разделы
     */
    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')

    xml.startElement("sitemapindex")
      .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
    ;


    /**
     * Формируем ссылки на разделы
     */

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "main",
      }).toString())
      .endElement();

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "users",
      }).toString())
      .endElement();

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "beers",
      }).toString())
      .endElement();

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "places",
      }).toString())
      .endElement();

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "topics",
      }).toString())
      .endElement();

    xml.startElement("sitemap")
      .writeElement("loc", cleanUri.clone().query({
        section: "comments",
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
      .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
    ;


    this.addSitemapDocument(xml, uri, {
      url: `/`,
      priority: 1,
    })

    this.addSitemapDocument(xml, uri, {
      url: `/contacts.html`,
      priority: 1,
    })

    this.addSitemapDocument(xml, uri, {
      url: `/comments/`,
      priority: 0.6,
    })

    this.addSitemapDocument(xml, uri, {
      url: `/profile/showlist/`,
      priority: 0.5,
    })



    xml.endDocument();



    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;
  }

  /**
   * Пользователи
   */
  async renderUsersSitemap(req, res, uri) {

    const api = this.getApi();

    let {
      page,
    } = uri.query(true);

    page = page && parseInt(page) || undefined;

    let limit = 1000;


    const usersSchema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            username
            updatedAt
          }
        }
      }
    `;

    let usersResult = await api.query.usersConnection({
      first: limit,
      skip: page > 1 ? (page - 1) * limit : undefined,
      where: {
        active: true,
        deleted: false,
      },
      orderBy: "updatedAt_DESC",
    }, usersSchema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: {
        count: total,
      },
      edges: usersEdges,
    } = usersResult;


    const users = usersEdges.map(({ node }) => node)

    /**
     * Плюсуем количество статических страниц
     */
    // let total = totalUsers;

    let pages = Math.ceil(total / limit);


    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    if (page) {

      xml.startElement("urlset")
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
      ;


      users.map(user => {

        const {
          username,
          updatedAt,
        } = user;

        this.addSitemapDocument(xml, uri, {
          url: `/profile/${username}/`,
          updatedAt,
          priority: 0.8,
        })

      });

    }
    else {

      xml.startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

      let i = 0;

      while (pages > i) {
        i++;

        const pageUri = uri.clone().query({
          section: "users",
          page: i,
        })

        xml.startElement("sitemap")
          .writeElement("loc", pageUri.toString())
          .endElement();
      }

    }


    xml.endDocument();


    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;

  }

  /**
   * Пиво
   */
  async renderBeersSitemap(req, res, uri) {

    const api = this.getApi();

    let {
      page,
    } = uri.query(true);

    page = page && parseInt(page) || undefined;

    let limit = 1000;


    const listSchema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            beer_id
            url_name
            uri
          }
        }
      }
    `;

    let objectsResult = await api.query.beersConnection({
      first: limit,
      skip: page > 1 ? (page - 1) * limit : undefined,
      where: {
        // active: true,
        // deleted: false,
      },
      orderBy: "updatedAt_DESC",
    }, listSchema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: {
        count: total,
      },
      edges: objectsEdges,
    } = objectsResult;


    const objects = objectsEdges.map(({ node }) => node)

    /**
     * Плюсуем количество статических страниц
     */
    // let total = totalBeers;

    let pages = Math.ceil(total / limit);


    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    if (page) {

      xml.startElement("urlset")
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
      ;


      objects.map(object => {

        const {
          username,
          updatedAt,
          uri: objectUri,
        } = object;

        this.addSitemapDocument(xml, uri, {
          url: objectUri,
          updatedAt,
          priority: 0.8,
        })

      });

    }
    else {

      xml.startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

      let i = 0;

      while (pages > i) {
        i++;

        const pageUri = uri.clone().query({
          section: "beers",
          page: i,
        })

        xml.startElement("sitemap")
          .writeElement("loc", pageUri.toString())
          .endElement();
      }

    }


    xml.endDocument();


    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;

  }

  /**
   * Заведение
   */
  async renderPlacesSitemap(req, res, uri) {

    const api = this.getApi();

    let {
      page,
    } = uri.query(true);

    page = page && parseInt(page) || undefined;

    let limit = 1000;


    const listSchema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            place_id
            url_name
            uri
          }
        }
      }
    `;

    let objectsResult = await api.query.placesConnection({
      first: limit,
      skip: page > 1 ? (page - 1) * limit : undefined,
      where: {
        // active: true,
        // deleted: false,
      },
      orderBy: "updatedAt_DESC",
    }, listSchema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: {
        count: total,
      },
      edges: objectsEdges,
    } = objectsResult;


    const objects = objectsEdges.map(({ node }) => node)

    /**
     * Плюсуем количество статических страниц
     */
    // let total = totalBeers;

    let pages = Math.ceil(total / limit);


    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    if (page) {

      xml.startElement("urlset")
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
      ;


      objects.map(object => {

        const {
          updatedAt,
          uri: objectUri,
        } = object;

        this.addSitemapDocument(xml, uri, {
          url: objectUri,
          updatedAt,
          priority: 0.8,
        })

      });

    }
    else {

      xml.startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

      let i = 0;

      while (pages > i) {
        i++;

        const pageUri = uri.clone().query({
          section: "places",
          page: i,
        })

        xml.startElement("sitemap")
          .writeElement("loc", pageUri.toString())
          .endElement();
      }

    }


    xml.endDocument();


    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;

  }

  /**
   * Топики
   */
  async renderTopicsSitemap(req, res, uri) {

    const api = this.getApi();

    let {
      page,
    } = uri.query(true);

    page = page && parseInt(page) || undefined;

    let limit = 1000;


    const listSchema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            topic_id
            uri
          }
        }
      }
    `;

    let objectsResult = await api.query.topicsConnection({
      first: limit,
      skip: page > 1 ? (page - 1) * limit : undefined,
      where: {
        // active: true,
        // deleted: false,
      },
      orderBy: "updatedAt_DESC",
    }, listSchema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: {
        count: total,
      },
      edges: objectsEdges,
    } = objectsResult;


    const objects = objectsEdges.map(({ node }) => node)

    /**
     * Плюсуем количество статических страниц
     */
    // let total = totalBeers;

    let pages = Math.ceil(total / limit);


    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    if (page) {

      xml.startElement("urlset")
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
      ;


      objects.map(object => {

        const {
          updatedAt,
          uri: objectUri,
        } = object;

        this.addSitemapDocument(xml, uri, {
          url: objectUri,
          updatedAt,
          priority: 0.8,
        })

      });

    }
    else {

      xml.startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

      let i = 0;

      while (pages > i) {
        i++;

        const pageUri = uri.clone().query({
          section: "topics",
          page: i,
        })

        xml.startElement("sitemap")
          .writeElement("loc", pageUri.toString())
          .endElement();
      }

    }


    xml.endDocument();


    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;

  }

  /**
   * Комментарии
   */
  async renderCommentsSitemap(req, res, uri) {

    const api = this.getApi();

    let {
      page,
    } = uri.query(true);

    page = page && parseInt(page) || undefined;

    let limit = 1000;


    const listSchema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            comment_id
            uri
          }
        }
      }
    `;

    let objectsResult = await api.query.commentsConnection({
      first: limit,
      skip: page > 1 ? (page - 1) * limit : undefined,
      where: {
        // active: true,
        // deleted: false,
      },
      orderBy: "updatedAt_DESC",
    }, listSchema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: {
        count: total,
      },
      edges: objectsEdges,
    } = objectsResult;


    const objects = objectsEdges.map(({ node }) => node)

    /**
     * Плюсуем количество статических страниц
     */
    // let total = totalBeers;

    let pages = Math.ceil(total / limit);


    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    if (page) {

      xml.startElement("urlset")
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
      ;


      objects.map(object => {

        const {
          updatedAt,
          uri: objectUri,
        } = object;

        this.addSitemapDocument(xml, uri, {
          url: objectUri,
          updatedAt,
          priority: 0.8,
        })

      });

    }
    else {

      xml.startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

      let i = 0;

      while (pages > i) {
        i++;

        const pageUri = uri.clone().query({
          section: "comments",
          page: i,
        })

        xml.startElement("sitemap")
          .writeElement("loc", pageUri.toString())
          .endElement();
      }

    }


    xml.endDocument();


    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;

  }


  /**
   * Ресурсы
   */
  async renderResourcesSitemap(req, res, uri) {


    const api = this.getApi();

    let {
      page,
    } = uri.query(true);

    uri = uri.query({
      section: "resources",
    });


    page = page && parseInt(page) || undefined;

    let limit = 1000;


    const schema = `
      {
        aggregate{
          count
        }
        edges{
          node{
            id
            uri
            updatedAt
          }
        }
      }
    `;

    let objectsResult = await api.query.resourcesConnection({
      first: limit,
      skip: page > 1 ? (page - 1) * limit : undefined,
      where: {
        published: true,
        searchable: true,
        deleted: false,
      },
      orderBy: "updatedAt_DESC",
    }, schema)
    // .catch(error => {
    //   res.status(500);
    //   res.end(error.message);
    //   ;
    // });

    const {
      aggregate: {
        count: total,
      },
      edges: edges,
    } = objectsResult;


    const objects = edges.map(({ node }) => node)


    let pages = Math.ceil(total / limit);


    const xml = new XMLWriter();

    xml.startDocument('1.0', 'UTF-8')



    if (page) {

      xml.startElement("urlset")
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');
      ;



      objects.map(n => {

        const {
          uri: url,
          updatedAt,
        } = n;

        this.addSitemapDocument(xml, uri, {
          url,
          updatedAt,
          priority: 0.9,
        })

      });

    }
    else {

      xml.startElement('sitemapindex')
        .writeAttribute('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

      let i = 0;

      while (pages > i) {
        i++;

        const pageUri = uri.clone().addQuery({
          page: i,
        })


        xml.startElement("sitemap")
          .writeElement("loc", pageUri.toString())
          .endElement();
      }

    }


    xml.endDocument();


    res.charset = 'utf-8';

    res.writeHead(200, {
      'Content-Type': 'application/xml',

    });

    res.end(xml.toString());


    return;

  }



}


module.exports = PivkartaSSR;
