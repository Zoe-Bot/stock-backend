import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator"

export class CreateImageDto {
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => String)
    tags: string[]

    @IsString()
    @IsOptional()
    category: string
}