
// import * as serviceQuery from './service';

import {
  usersConnection,
  users,
  me,
  user,
  updateUser,
  signin,
  signup,
  userFieldsFragment,
  fragmentUser,
  resetPassword,
} from './user';

import {
  topicsConnection,
  topic,
  updateTopicProcessor,
  createTopicProcessor,
} from './topic';

import {
  beersConnection,
  beer,
  updateBeer,
  createBeer,
} from './beer';

import {
  placeByPlaceId,
  mapPlacesConnection,
  places,
  placesConnection,
  place,
  // updatePlace,
  updatePlaceProcessor,
  updatePlaceData,
  togglePlaceBeer,
  updatePlaceBeer,
  createPlace,
} from './place';

import {
  comment,
  commentsConnection,
  createCommentProcessor,
  updateCommentProcessor,
} from './comment';

import {
  mapGeoObjectsConnection,
} from './map';

import {
  tarifs,
} from './tarif';

import {
  letter,
  lettersConnection,
  createLetter,
  createLetterProcessor,
  updateLetterProcessor,
} from "./letter";

import {
  cities,
  city,
} from "./city";

// const query = Object.assign(
//   {},
//   {...serviceQuery},
//   {...userQuery},
// );
  
export {
  usersConnection,
  users,
  me,
  user,
  updateUser,
  signin,
  signup,
  userFieldsFragment,
  fragmentUser,
  resetPassword,
}
  
export {
  topicsConnection,
  topic,
  updateTopicProcessor,
  createTopicProcessor,
}

export {
  beersConnection,
  beer,
  updateBeer,
  createBeer,
}

export {
  placeByPlaceId,
  mapPlacesConnection,
  places,
  placesConnection,
  place,
  // updatePlace,
  updatePlaceProcessor,
  updatePlaceData,
  togglePlaceBeer,
  updatePlaceBeer,
  createPlace,
}

export {
  comment,
  commentsConnection,
  createCommentProcessor,
  updateCommentProcessor,
}

export {
  mapGeoObjectsConnection,
}

export {
  tarifs,
}

export {
  letter,
  lettersConnection,
  createLetter,
  createLetterProcessor,
  updateLetterProcessor,
}

export {
  cities,
  city,
}

// export default {...query};

// module.exports = query;
