## About
This API serves the Questions and Answer portion of the [Atelier](https://github.com/rpp33-fec-yellow/project-atelier) e-commerce site


## Routes
The Questions-Answers microservice servers the following routes for the Atelier API
 ### Get Questions For Product
 `GET /qa/questions`<br>

 | Parameter      | Type |
| ----------- | ----------- |
| product_id | integer |


 ### Submit Question For Product
 `POST /qa/questions`<br>

  | Parameter      | Type |
| ----------- | ----------- |
| product_id | integer |
| question_body | string |
| asker_name | string |
| email | string |


### Get Answers for Question
`GET /qa/questions/:question_id/answers`<br>

  | Parameter      | Type |
| ----------- | ----------- |
| question_id | integer |

 ### Submit Answer For Question
`POST /qa/questions/:question_id/answers`<br>

  | Parameter      | Type |
| ----------- | ----------- |
| question_id | integer |
| body | string |
| answerer_name | string |
| email | string |

### Update Question Helpfulness
`PUT /qa/questions/:question_id/helpful`<br>

  | Parameter      | Type |
| ----------- | ----------- |
| question_id | integer |

### Update Answer Helpfulness
 `PUT /qa/answers/:answer_id/helpful` <br>

  | Parameter      | Type |
| ----------- | ----------- |
| answer_id | integer |

### Update Question Reported
`PUT /qa/questions/:question_id/report`<br>

  | Parameter      | Type |
| ----------- | ----------- |
| question_id | integer |

### Update Answer Reported
 `PUT /qa/answers/:answer_id/report` <br>

  | Parameter      | Type |
| ----------- | ----------- |
| answer_id | integer |
## Technologies
- Server
    - Node.js / Express.js
- Database
    - MySQL

## Performance

This microservice was deployed and scaled to a throughput of 4000rps with a latency of 52ms and an error rate of 0% utilizing the following technologies
- Servers deployed on 3 [AWS EC2 t2.micro instances](https://aws.amazon.com/pm/ec2/?trk=36c6da98-7b20-48fa-8225-4784bced9843&sc_channel=ps&sc_campaign=acquisition&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Compute|EC2|US|EN|Text&s_kwcid=AL!4422!3!488982705483!p!!g!!amazon%20ec2&ef_id=CjwKCAjwzeqVBhAoEiwAOrEmzZ1WzrsAKGLzVGmNhdA0QhpIPcdeqnH_zmUAQa25qryyDz5J_03i9BoCH3wQAvD_BwE:G:s&s_kwcid=AL!4422!3!488982705483!p!!g!!amazon%20ec2)
- [NGINX](https://nginx.org/en/docs/?_ga=2.222689757.759896580.1656443043-200779045.1656443043) load balancer distributing requests (round robin)
- [Redis](https://redis.io/) cache
- NGINX proxy cache
- Bottlenecks were determined using [New Relic](https://docs.newrelic.com/)
- Performance was measured on a warm cache (approximately 30%) using [k6](https://k6.io/docs/) (locally) and [loader.io](https://loader.io/) (deployed)<br>
  ### Example test from loader.io
  Please note "clients per second" was tested, despite the read-out from loader.io stating "4000 clients over 1 min" <br>
  ## ------------------------------------------------------
![loader.io results](https://i.ibb.co/Mnkfzpw/q-4000-after-cache.png)
