import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator"

export class UpdateImageDto {
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => String)
    @IsOptional()
    readonly tags: string[]

    @IsString()
    @IsOptional()
    readonly category: string
}