import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenTypes } from 'src/common/enums';

@Injectable()
export class GqlAuthGuard extends AuthGuard(TokenTypes.Access) {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }
}