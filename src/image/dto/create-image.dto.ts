import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsOptional, IsString, Length } from "class-validator"

export class CreateImageDto {
    @IsString()
    @Length(3, 256)
    readonly uri: string

    @IsArray()
    @ArrayMinSize(3)
    @Type(() => String)
    readonly tags: string[]

    @IsString()
    @IsOptional()
    readonly category: string
}