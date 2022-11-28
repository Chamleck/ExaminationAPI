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
    it(`Registrating, using token to create post`, () => {
  
      cy.request({
        method: `POST`,
        url:`/register`,
        body: user
        
    }).then(response => {
        expect(response.status).to.be.eq(201);
      }).then((response) => {
        let token = response.body.accessToken
        cy.request({
          method: 'POST',
          url: `/664/posts`,
          headers:  {
            'Authorization': `Bearer ${token}`
            }
        }).then(response => {
          let id = response.body.id;
          expect(response.body.id).to.be.eq(id);
          expect(response.status).to.be.eq(201);
        })
      })
    })
  });