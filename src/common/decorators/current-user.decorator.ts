import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context);
      // Возвращает объект user, который был прикреплен Passport'ом к req
      return ctx.getContext().req.user;
    },
);
