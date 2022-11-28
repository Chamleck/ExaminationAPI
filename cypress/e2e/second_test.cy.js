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
    it(`Get 10 posts`, () => {
      
      cy.request('GET', `/posts?_page=1&_limit=10`).then(response => {
        //перевіряємо чи буде кількість сутностей в боді респонсу дорівнювати 10 за допомогою length результатом порівняння якого буде
        //тру або фолс
        let result = response.body.length===10;
        expect(response.status).to.be.eq(200);
        expect(result).to.be.eq(true);
      })
    })
  });