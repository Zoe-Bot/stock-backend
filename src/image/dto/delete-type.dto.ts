import { IsEnum, IsOptional } from "class-validator";
import { DeleteType } from "../enums/delete-type.enum";

export class DeleteTypeDto {
    @IsOptional()
    @IsEnum(DeleteType)
    readonly type: DeleteType
}