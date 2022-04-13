import http from 'k6/http';
import { Counter } from "k6/metrics";
import { check } from "k6";
export const options = {
  vus: 1000,
  duration: '30s'
};

var myErrorCounter = new Counter("my_error_counter");

export default function () {
  // let res = http.get('http://localhost:4000/qa/questions?product_id=5');
  let res = http.get('http://localhost:4000/qa/questions/1/answers');
  check(res, {
    "is status 200": (r) => r.status === 200
  });
  if(res.status === 404) {
    myErrorCounter.add(1)
  }
}

