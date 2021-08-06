import { CanActivate } from "@nestjs/common";

export class UserGuard implements CanActivate {
    canActivate(): boolean {
        return true
    }
}