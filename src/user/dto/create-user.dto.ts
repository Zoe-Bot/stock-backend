import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly username: string

    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(4)
    readonly password: string
}