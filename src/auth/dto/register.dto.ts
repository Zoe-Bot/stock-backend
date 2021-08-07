import { IsEmail, IsString, Length, MinLength } from "class-validator"

export class RegisterDto {
    @IsString()
    @Length(3, 20)
    readonly username: string

    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(4)
    readonly password: string

    @IsString()
    readonly role: string
}