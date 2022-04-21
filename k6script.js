import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { sleep } from 'k6';
import { Counter } from "k6/metrics";
import { check } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
  },
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s', // 'rate' iterations per second, i.e. 1, 10, 100, 1000 RPS
      duration: '1m',
      preAllocatedVUs: 20, // how large the initial pool of VUs would be
      maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

/////// GET QUESTIONS & GET ANSWERS ///////
export default function () {
  /*use math.random to get random index each iteration
  First 10% Is Slower
  let num = Math.floor(Math.random() * 350000);
  Last 10% is Faster
  let num = 3500000 - (Math.floor(Math.random() * 350000));*/

  //GET QUESTIONS
  let num = Math.floor(Math.random() * 3500000);
  // let num = 1000009;
  console.log('The num', num);
  let res = http.get(`http://localhost:4000/qa/questions?product_id=${num}`);

  //GET ANSWERS
  // let num = Math.floor(Math.random() * 6800000);
  // let res = http.get(`http://localhost:4000/qa/questions/${num}/answers`);
};

// ///////// POST QUESTIONS & POST ANSWER ///////
// export default function () {
//   // //Questions
//   // const questionURL = new URL('http://localhost:4000/qa/questions');
//   // questionURL.searchParams.append('body', 'This is a body from k6');
//   // questionURL.searchParams.append('name', 'Caiwin');
//   // questionURL.searchParams.append('email', 'caiwin@gmail');
//   // questionURL.searchParams.append('product_id', 1);
//   // let res = http.post(questionURL.toString());

//   //Answers
//   //use math.random to get random index each iteration
//   let num = Math.floor(Math.random() * 3500000);
//   const answerURL = new URL(`http://localhost:4000/qa/questions/${num}/answers`);
//   answerURL.searchParams.append('body', 'This is a body from k6');
//   answerURL.searchParams.append('name', 'Caiwin');
//   answerURL.searchParams.append('email', 'caiwin@gmail');
//   answerURL.searchParams.append('photos', "['www.k6photo1.com', 'www.k6photo2.com']");
//   let res = http.post(answerURL.toString());
// };



// ///////// PUT QUESTIONS AND ANSWER ///////
// export default function () {


//Questions
//   // let num = Math.floor(Math.random() * 3500000);
//   // let res = http.put(`http://localhost:4000/qa/questions/${num}/helpful`);
//   // let res = http.put(`http://localhost:4000/qa/questions/${num}/report`);

//   // let num = Math.floor(Math.random() * 6800000);
//   // let res = http.put(`http://localhost:4000/qa/answers/${num}/helpful`);
//   // let res = http.put(`http://localhost:4000/qa/answers/${num}/report`);
// };

