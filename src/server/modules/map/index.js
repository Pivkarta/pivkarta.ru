import PrismaModule from "@prisma-cms/prisma-module";


//  Получаем координаты для карты
const mapGeoObjectsConnection = async function (source, args, ctx, info) {


  const {
    db,
    knex,
  } = ctx;


  let {
    first: limit,
    skip,
    type,
    center,
    where,
  } = args;

  let ids = [];
  let count = 0;


  let beerWhere;

  // console.log("mapGeoObjectsConnection center", center);
  // console.log("where", where.beers_some.Beer);

  const {
    fieldNodes: {
      0: {
        selectionSet,
      }
    },
  } = info;

  // const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "count");

  const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "aggregate");

  const objectsSelection = selectionSet.selections.find(n => n.name.value === "objects");

  // console.log("objectsSelection", objectsSelection.selectionSet.selections);

  let pricesSelection = false;

  if (objectsSelection) {

    pricesSelection = objectsSelection.selectionSet.selections.findIndex(n => ["minMax", "maxPrice"].indexOf(n.name.value) !== -1) !== -1;

    // console.log("pricesSelection", pricesSelection);

  }

  // objectsSelection.selectionSet.selections.map(n => {

  //   console.log("selectionSet", n.selectionSet.selections);

  // });

  const q = knex("Place as t1");



  /**
   * Исключаем дубли
   */
  q.whereRaw(`(is_request is null OR is_request = 0)`);



  // Если указаны условия поиска, то сначала выполняем поиск средствами призмы
  if (where && Object.keys(where).length > 0) {

    if (where.beers_some && where.beers_some.Beer) {
      beerWhere = where.beers_some.Beer;
    }

    // if (where.OR) {
    //   beerWhere = where.OR.find(n => n.beers_some);

    //   beerWhere = beerWhere && beerWhere.beers_some && beerWhere.beers_some.Beer || null;
    // }

    let placesIDs = []

    const query = `
      query (
        $where: PlaceWhereInput!
      ){
        places(
          where: $where
        ){
          id,
        }
      }
    `;

    const result = await db.request(query, {
      where,
    }).then(r => {

      return r && r.data && r.data.places || null;
    });
    // .catch(console.error);

    result && result.map(n => {
      placesIDs.push(n.id);
    });

    // console.log("mapGeoObjectsConnection places", result);
    // console.log("placesIDs", placesIDs);

    if (placesIDs.length) {
      q.whereIn("t1.id", placesIDs);
    }
    else {

      return {
        aggregate: {
          count: 0,
        },
        objects: [],
      }
    }
  }


  if (totalSelection) {

    let q2 = knex.select(knex.raw(`count(*) as total`))
      .from(q.clone().clearSelect().select('t1.id').as('count'));

    await q2.then(r => {

      count = r && r[0].total || 0;

    });

  }

  if (limit > 0) {
    q.limit(limit);
  }

  if (skip > 0) {
    q.offset(skip);
  }


  if (center) {

    const {
      lat,
      lng,
    } = center;


    if (lat && lng) {

      q.whereNotNull("lat");
      q.whereNotNull("lng");

      q.orderByRaw(`sqrt(pow(abs(${lat} - lat), 2) + pow(abs(${lng} - lng), 2))`);
    }

  }

  q.select("t1.*");

  if (pricesSelection) {
    // q.select(knex.raw("10 as minPrice"));

    let priceQ = knex("PlaceBeer as pb");
    priceQ.innerJoin("_PlaceBeerPlace as pbp", "pbp.B", "pb.id");

    priceQ.min("pb.price as minPrice");
    priceQ.max("pb.price as maxPrice");
    priceQ.select("pbp.A as place_id");

    priceQ.groupBy("pbp.A");

    priceQ.whereNotNull("pb.price");


    if (beerWhere) {

      // console.log("beerWhere", beerWhere);

      let fields = Object.keys(beerWhere);

      let conditions = [];

      fields.map(field => {

        let value = beerWhere[field];

        switch (field) {

          case "AND":

            value.map(n => {

              let k = Object.keys(n)[0];
              let v = n[k];

              conditions.push({
                field: k,
                value: v,
              });

            });

            break;

          default:

            conditions.push({
              field,
              value,
            });
            ;

        }

      });


      if (conditions.length) {

        let beerQuery = knex("Beer");

        beerQuery.innerJoin("_PlaceBeerBeer as pbb", "Beer.id", "pbb.A");

        // beerQuery.select("pbb.B as placeBeerId");
        beerQuery.select(knex.raw("NULL"));

        // beerQuery

        conditions.map(condition => {

          const {
            field,
            value,
          } = condition;

          switch (field) {

            case "name_contains":

              beerQuery.where("name", "like", `%${value}%`);

              break;

            default:

              const reg = /\_in$/;

              if (reg.test(field)) {

                beerQuery.whereIn(field.replace(reg, ""), value);
              }
              else {

                beerQuery.where(field, "=", value);
              }
              ;

          }

        });

        // console.log("Places conditions", conditions);
        // console.log("beerQuery toSQL", beerQuery.toString());


        priceQ.whereExists(beerQuery.whereRaw("pbb.B = pb.id"));

      }

    }


    // console.log("priceQ toSQL", priceQ.toString());

    q.leftJoin(priceQ.as("t2"), "t1.id", "t2.place_id");

    q.select("t2.minPrice");
    q.select("t2.maxPrice");

  }

  // console.log("q toSQL", q.toString());

  const objects = await q
    .then(r => {

      // return r ? r.map(n => n.id) : [];
      return r;

    })
    .catch(e => {
      console.error(e);
      throw (e);
    });

  return {
    aggregate: {
      count: count || 0,
    },
    objects,
  }

}

 

export default class MapModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, { 
      mapGeoObjectsConnection,
    });


    Object.assign(resolvers.Mutation, { 
    });




    Object.assign(resolvers, { 
    });


    return resolvers;
  }


}

