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
    it(`Posting post witout authorization`, () => {
  
      cy.request({
        method: `POST`,
        url:`/664/posts`,
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.be.eq(401);
      })
    })
  });