import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const handler = context.getHandler();
    const handlerRoles = new Set(this.reflector.get(Roles, handler));
    if (!handlerRoles.size) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user;
    const userRoles = new Set(user && user.roles);
    if (!userRoles.size) return true;
    return handlerRoles.intersection(userRoles).size > 0;
  }
}
