import { applyDecorators, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { GqlRefreshGuard } from 'src/modules/auth/guards/gql-refresh.guard';
import { TokenTypes } from '../enums';

export const JwtGuard = (type: TokenTypes) => applyDecorators(
    type === TokenTypes.Access ? UseGuards(new GqlAuthGuard(type)) : UseGuards(new GqlRefreshGuard(type))
)