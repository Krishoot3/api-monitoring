import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { prepareDb } from './util/prepare-db';
import * as f from './util/data.factory';
import { Connection } from 'typeorm';
import { ReleaseAssets } from '../src/entities/ReleaseAssets';

describe('API-Project E2E test', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    connection = app.get(Connection);
    await app.init();
  });

  beforeEach(async () => {
    await prepareDb(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`api/project/:path (GET)`, async () => {
    const path = 'projectPath1';
    return request(app.getHttpServer())
      .get(`/api/project/${path}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Object {
            "description": "optio quo quis molestiae tempora eligendi omnis quisquam quisquam quos nihil dolor voluptatibus velit nobis culpa deleniti eos reprehenderit in",
            "name": "projectPath1",
            "visibility": "private",
            "web_url": "http://liza.net",
          }
        `);
      });
  });
  it(`api/project/:path (GET) 404`, async () => {
    const path = 'abcd123';
    return request(app.getHttpServer())
      .get(`/api/project/${path}`)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it(`api/project/:path (PUT)`, async () => {
    const path = 'projectPath2';
    const apiKey = process.env.API_KEY;
    const projectBody = f.newProject('projectPath2', 1);
    delete projectBody.id;
    return request(app.getHttpServer())
      .put(`/api/project/${path}`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Object {
            "description": "in unde nihil iste asperiores consequatur ex quidem omnis inventore deserunt ipsa eligendi officiis voluptatem nostrum in omnis labore consequatur",
            "name": "projectPath2",
            "visibility": "private",
            "web_url": "http://schuyler.name",
          }
        `);
      });
  });
  it(`api/project/:path (PUT) 404`, async () => {
    const path = 'abc123';
    const apiKey = process.env.API_KEY;
    const projectBody = f.newProject('projectPath2', 1);
    delete projectBody.id;
    return request(app.getHttpServer())
      .put(`/api/project/${path}`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(404);
  });
  it(`api/project/:path (PUT) 401`, async () => {
    const path = 'projectPath2';
    const apiKey = 'wrongApi';
    const projectBody = f.newProject('projectPath2', 1);
    delete projectBody.id;
    return request(app.getHttpServer())
      .put(`/api/project/${path}`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(401);
  });

  it(`api/project/:path (POST)`, async () => {
    const apiKey = process.env.API_KEY;
    const projectBody = f.newProject('projectPath234', 123);
    return request(app.getHttpServer())
      .post(`/api/project/`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Object {
            "description": "in unde nihil iste asperiores consequatur ex quidem omnis inventore deserunt ipsa eligendi officiis voluptatem nostrum in omnis labore consequatur",
            "name": "projectPath234",
            "visibility": "private",
            "web_url": "http://schuyler.name",
          }
        `);
      });
  });
  it(`api/project/:path (POST) 400`, async () => {
    const apiKey = process.env.API_KEY;
    const projectBody = f.newProject('projectPath2', 123);
    return request(app.getHttpServer())
      .post(`/api/project/`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(400);
  });
  it(`api/project/:path (POST) 401`, async () => {
    const apiKey = 'wrongApi';
    const projectBody = f.newProject('projectPath234', 1234);
    return request(app.getHttpServer())
      .post(`/api/project`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(401);
  });

  it(`api/project/:path/langs (GET)`, async () => {
    const path = 'projectPath2';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/langs`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Array [
            Object {
              "lang": "PHP",
              "percent": 2,
              "project": 2,
            },
          ]
        `);
      });
  });
  it(`api/project/:path/langs (GET) 404`, async () => {
    const path = 'abcd123';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/langs`)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it(`api/project/:path/releases (GET)`, async () => {
    const path = 'projectPath1';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/releases`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Array [
            Object {
              "assets": Array [
                Object {
                  "architecture": "MAC",
                  "type": "SRC",
                  "url": "http://modesta.net",
                },
              ],
              "created_at": "2019-09-18",
              "description": "harum sit odio quia vitae provident quo provident molestiae harum",
              "name": "deserunt",
              "tag_name": "id",
            },
          ]
        `);
      });
  });
  it(`api/project/:path/langs (GET) 404`, async () => {
    const path = 'abcd123';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/langs`)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it(`api/project/:path/last-release (GET)`, async () => {
    const path = 'projectPath1';
    const releaseAsset = await connection
      .getRepository(ReleaseAssets)
      .findOne(1);
    return request(app.getHttpServer())
      .get(`/api/project/${path}/last-release`)
      .set('Accept', 'application/json')
      .query({
        architecture: releaseAsset.architecture,
        type: releaseAsset.type,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Object {
            "architecture": "MAC",
            "type": "SRC",
            "url": "http://modesta.net",
          }
        `);
      });
  });
  it(`api/project/:path/last-release (GET) 404`, async () => {
    const path = 'projectPath1';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/last-release`)
      .set('Accept', 'application/json')
      .query({
        architecture: 'TST',
        type: 'WIN',
      })
      .expect(404);
  });
  it(`api/project/:path/last-release (GET) 404`, async () => {
    const path = 'abcd123';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/langs`)
      .set('Accept', 'application/json')
      .expect(404);
  });
});
