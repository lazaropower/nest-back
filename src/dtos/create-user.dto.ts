import { IsDate, IsDateString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsDateString()
    birthdate: string;
}