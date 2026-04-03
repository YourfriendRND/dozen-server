import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokensResponse {
    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;
}
