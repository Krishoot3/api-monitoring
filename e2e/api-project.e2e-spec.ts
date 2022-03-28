import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
//import { prepareDb } from './util/prepare-db';
import { randomNumber } from './util/prepare-db';
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

  // beforeEach(async () => {
  //   await prepareDb(app);
  // });

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
            "description": "sapiente dolor voluptates maiores aut sapiente modi consequatur fuga nemo dolorem fugiat nemo corporis aut iusto consequatur ex tenetur sit",
            "name": "projectPath2",
            "visibility": "private",
            "web_url": "https://filiberto.org",
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
    const randomNum: number = randomNumber(10, 200);
    const projectBody = f.newProject('projectPath' + randomNum, randomNum);
    return request(app.getHttpServer())
      .post(`/api/project/`)
      .query({ apiKey: apiKey })
      .send(projectBody)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchInlineSnapshot(`
          Object {
            "description": "distinctio expedita et eum tenetur sit aperiam et porro et autem accusamus eligendi accusantium dicta consequatur fugit necessitatibus tempora autem",
            "name": "projectPath66",
            "visibility": "public",
            "web_url": "https://johnnie.name",
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
              "lang": "JS",
              "percent": 0,
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
                  "architecture": "LIN",
                  "type": "SRC",
                  "url": "http://katharina.net",
                },
              ],
              "created_at": "2019-09-18",
              "description": "harum voluptas sunt omnis et accusantium et quia quos sequi",
              "name": "exercitationem",
              "tag_name": "doloribus",
            },
          ]
        `);
      });
  });
  it(`api/project/:path/releases (GET) 404`, async () => {
    const path = 'abcd123';
    return request(app.getHttpServer())
      .get(`/api/project/${path}/releases`)
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
            "architecture": "LIN",
            "type": "SRC",
            "url": "http://katharina.net",
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
