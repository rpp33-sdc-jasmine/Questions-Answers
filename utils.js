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
  //for each questions I need to find the corresponding answer (will have question_id)
  //I need to add
  return [questions, answers];

};

const transformPhotosFromDatabase = (photos) => {

};

module.exports = {
  transformPhotosFromClient,
  transformQuestionsAnswersFromDatabase
}