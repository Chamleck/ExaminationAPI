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
  it(`Get all posts`, () => {
    cy.request('GET', `/posts`).then(response => {
      expect(response.status).to.be.eq(200);

    })
  })
});

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

describe('Api test', () => {
  it(`Updating unexisted entity`, () => {

      cy.request({
        method: 'PUT',
        url: `/posts`,
        body: post,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.be.eq(404);
      })
   })
});

describe('Api test', () => {
  it(`Creating post and updating it`, () => {

      cy.request({
        method: 'POST',
        url: `/posts`,
        body: post
      }).then(response => {
        expect(response.body.title).to.be.eq(post.title);
        expect(response.status).to.be.eq(201);
      }).then(response=>{
        let id = response.body.id;
        cy.request({
        method: 'PUT',
        url: `/posts/${id}`,
        body: post1
        }).then(response => {
          expect(response.body.title).to.be.eq(post1.title);
          expect(response.status).to.be.eq(200);
        })
      })
   })
});

describe('Api test', () => {
  it(`Removing unexisted post`, () => {

      cy.request({
        method: 'DELETE',
        url: `/posts`,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.be.eq(404);
      })
   })
});

describe('Api test', () => {
  it(`Creating post and updating it`, () => {

      cy.request({
        method: 'POST',
        url: `/posts`,
        body: post
      }).then(response => {
        expect(response.body.title).to.be.eq(post.title);
        expect(response.status).to.be.eq(201);
      }).then(response=>{
        let id = response.body.id;
        cy.request({
        method: 'PUT',
        url: `/posts/${id}`,
        body: post1
        }).then(response => {
          expect(response.status).to.be.eq(200);
          expect(response.body.title).to.be.eq(post1.title);
        }).then(response => {
          let id = response.body.id;
           cy.request({
            method: 'DELETE',
            url: `/posts/${id}`,
            
          }).then(response => {
          expect(response.body).to.be.empty;
          expect(response.status).to.be.eq(200);
          })
      })
    })
  })
});