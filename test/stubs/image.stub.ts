import { Image } from "../../src/image/schemas/image.schema"
import { Types } from "mongoose"
import { ImageStatus } from "../../src/image/enums/image-status.enum"

export const imageStub = (): Image => {
    return {
        uri: 'example.png',
        author: Types.ObjectId("612e03eb5e94cc24bccd49df"),
        resolution: "1200x200",
        filesize: 20,
        fileformat: 'png',
        category: 'animals',
        tags: ['tag', 'tag2', 'tag3'],
        status: ImageStatus.ACTIVE
    }
}

export const updateImageStub = (): { category: string } => {
    return { 
        category: 'dogs'
    }
}