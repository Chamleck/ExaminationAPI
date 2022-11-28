/// <reference types="cypress"/>
import {faker} from '@faker-js/faker';

let user = {
  "email": faker.internet.email(),
  "password": faker.internet.password()
};

let post = {
  "userId": 11,
  "title": faker.animal.bird(),
  "body": faker.color.human()
};

let post1 = {
  "userId": 11,
  "title": faker.animal.bear(),
  "body": faker.name.middleName()
};

describe('Api test', () => {
    it(`Get posts with specific id`, () => {
      
      cy.request('GET', `/posts?id=55&id=60`).then(response => {
        let id = response.body[0].id;
        let idd = response.body[1].id;
        
        expect(response.body[0].id).to.be.eq(id);
        expect(response.body[1].id).to.be.eq(idd);
        expect(response.status).to.be.eq(200);
      })
    })
  });