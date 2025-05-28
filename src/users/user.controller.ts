import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserRequestDto, UserResponseDto } from "./user.model";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUser: UserRequestDto): UserResponseDto {
        return this.userService.createUser(createUser);
    }

    @Get()
    findAll(nome: string, email: string): UserResponseDto[] {
        return this.userService.findAll();
    } 

    @Get('/:id')
    getUser(@Param('id') id: string) : UserResponseDto | undefined {
        return this.userService.findById(Number(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updateUser: UserRequestDto): UserResponseDto | undefined {
        return this.userService.updateUser(Number(id), updateUser);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): UserResponseDto | undefined {
        return this.userService.removeUser(Number(id));
    }
}