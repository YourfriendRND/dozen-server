import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserDto {
    @IsUUID('all')
    @Field(() => ID)
    id: string;

    @IsString()
    @Field(() => String)
    name: string;

    @IsString()
    @IsEmail()
    @Field(() => String)
    email: string;

    @IsString()
    @Field(() => String)
    password: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @Field(() => Date, { nullable: true })
    createdAt?: Date;
}
