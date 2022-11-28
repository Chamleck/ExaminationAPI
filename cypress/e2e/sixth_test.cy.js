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
    it(`Creating post`, () => {
  
        cy.request({
          method: 'POST',
          url: `/posts`,
          body: post
        }).then(response => {
          expect(response.body.title).to.be.eq(post.title);
          expect(response.status).to.be.eq(201);
        })
    })
  });