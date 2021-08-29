import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Image } from 'src/image/schemas/image.schema';

describe('ImageController (e2e)', () => {
    let app: INestApplication
    let image: Image

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        app.setGlobalPrefix('api')
        await app.init()
    });

    it('/image (GET)', () => {
        const req = request(app.getHttpServer())
            .get('/api/image')
            .expect(200)

        return req
    })

    it('/image (POST)', async () => {
        const req = request(app.getHttpServer())
            .post('/api/image')
            .send({
                tags: ["dog", "white", "fluffy"],
                uri: "white-dog",
                category: "Animals"
            })
            .expect(201)

        image = (await req).body
        return req
    })

    it('/image/:id (POST)', async () => {
        const req = request(app.getHttpServer())
            .get(`/api/image/${image._id}`)
            .expect(200)
        return req
    })

    it('/image/:id (PATCH)', async () => {
        const req = request(app.getHttpServer())
            .patch(`/api/image/${image._id}`)
            .send({
                category: "Dogs"
            })
            .expect(200)
        return req
    })

    it('/image/:id (DELETE)', async () => {
        const req = request(app.getHttpServer())
            .delete(`/api/image/${image._id}?type=soft`)
            .expect(204)
        return req
    })

    it('/image/:id (DELETE)', async () => {
        const req = request(app.getHttpServer())
            .delete(`/api/image/${image._id}?type=hard`)
            .expect(204)
        return req
    })
});