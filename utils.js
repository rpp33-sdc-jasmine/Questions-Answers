const transformPhotosFromClient = (photos) => {
  photos = photos.substring(2, photos.length -2).split(',');
 return photos.map((photo, i) => {
   if (i === 0) {
     photo = photo.slice(0, photo.length - 1);
   } else if (i === photos.length - 1) {
     photo = photo.slice(2, photo.length);
   } else {
     photo = photo.slice(2, photo.length - 1);
   }
   return photo
  });
}

const transformQuestionsAnswersFromDatabase = (questons, answers) => {
  //I deally logic in get route for questions will go here

};

const transformPhotosFromDatabase = (photos) => {
//if I need to transform weird json things from database
};

module.exports = {
  transformPhotosFromClient,
  transformQuestionsAnswersFromDatabase
}