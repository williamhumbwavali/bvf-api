import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Role } from "src/database/entities/user.entity";

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
  },
);

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);