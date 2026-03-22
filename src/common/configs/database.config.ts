import { registerAs } from "@nestjs/config";
import { IsInt, IsNotEmpty, IsString, Min, Max} from "class-validator";
import { ConfigNameSpaces } from "../enums";
import { validateConfig } from "../utils";

export class DatabaseConfig {
    @IsString()
    @IsNotEmpty()
    connection: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsInt()
    @Min(1024)
    @Max(65535)
    port: number;
}

export default registerAs(ConfigNameSpaces.Database, () => validateConfig(DatabaseConfig, {
    connection: process.env['DATABASE_URL'],
    name: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
}));