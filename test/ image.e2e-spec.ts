import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ImageDocument } from '../src/image/schemas/image.schema';
import { imageStub, updateImageStub } from './stubs/image.stub';

describe('ImageController (e2e)', () => {
    let app: INestApplication
    let image: ImageDocument & { createdAt: string, updatedAt: string}

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

    describe('create image', () => {
        it('/image (POST)', async () => {
            const req = request(app.getHttpServer())
                .post('/api/image')
                .send({
                    tags: imageStub().tags,
                    uri: imageStub().uri,
                    category: imageStub().category
                })
                .expect(201)
    
            image = (await req).body
        
            return req
        })

        test('then it should return an image', () => {
            expect(image.tags).toEqual(imageStub().tags)
            expect(image.uri).toEqual(imageStub().uri)
            expect(image.category).toEqual(imageStub().category)
            expect(image._id).toBeDefined()
            expect(image.createdAt).toBeDefined()
            expect(image.updatedAt).toBeDefined()
        })
    
    })

    it('/image/:id (GET)', async () => {
        const req = request(app.getHttpServer())
            .get(`/api/image/${image._id}`)
            .expect(200)
        return req
    })

    describe('update image', () => {
        it('/image/:id (PATCH)', async () => {
            const req = request(app.getHttpServer())
                .patch(`/api/image/${image._id}`)
                .send({
                    category: updateImageStub().category
                })
                .expect(200)

            image = (await req).body

            return req
        })

        test("then it should update the category", () => {
            expect(image.category).toEqual(updateImageStub().category)
            expect(image.category).not.toEqual(imageStub().category)
        })
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