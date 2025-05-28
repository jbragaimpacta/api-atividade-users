import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRequestDto, UserResponseDto } from "./user.model";
import { ExceptionHandler } from "./user.exception.handler";

@Injectable()
export class UserService {
    private users: User[] = [
        { id: 1, nome: "John Doe", email: "johndoe@gmail.com"},
        { id: 2, nome: "Jane Smith", email: "janesmith@gmail.com"}
    ];

    private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    createUser(createUser: UserRequestDto): UserResponseDto {
        if(!createUser.nome || !createUser.email) {
            ExceptionHandler.throwInternalError("Nome e E-mail sao obrigatorios.");
        }
        if(this.users.some(user => user.email === createUser.email)) {
            ExceptionHandler.throwInternalError("E-mail ja cadastrado.");
        }
        if(!this.emailRegex.test(createUser.email)) {
            ExceptionHandler.throwInternalError("E-mail invalido.");
        }

        const newUser: User = {
            id: this.users.length + 1,
            nome: createUser.nome,
            email: createUser.email
        };

        this.users.push(newUser);

        return newUser;
    }

    findAll(): UserResponseDto[] {
        return this.users;
    }
    
    findById(id: number): UserResponseDto | undefined {
        const user = this.users.find(user => user.id === id);
        return user ? { nome: user.nome, email: user.email } : undefined;
    }

    updateUser(id: number, updateUser: UserRequestDto): UserResponseDto | undefined {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            ExceptionHandler.throwNotFoundError("Usuario nao encontrado.");
        }
        if(!updateUser.nome || !updateUser.email) {
            ExceptionHandler.throwInternalError("Nome e E-mail sao obrigatorios.");
        }
        if(!this.emailRegex.test(updateUser.email)) {
            ExceptionHandler.throwInternalError("E-mail invalido.");
        }

        const usuarioAtualizado: User = {
            id: id,
            nome: updateUser.nome,
            email: updateUser.email
        };

        this.users[index] = usuarioAtualizado;

        return this.users[index];
    }

    removeUser(id: number): UserResponseDto | undefined {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            ExceptionHandler.throwNotFoundError("Usuario nao encontrado.");
        }
        return this.users.splice(index, 1)[0];
    }
}