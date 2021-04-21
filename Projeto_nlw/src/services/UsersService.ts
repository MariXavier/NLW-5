import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService
{
    private usersRepository: Repository<User>;

    constructor()
    {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email:string)
    {
        

        //verificar se o usuário existe
        const userExists = await this.usersRepository.findOne({email});
       
        //se existir, retornar user
        if(userExists)
        { return userExists; }
        
        //se nao existir, salvar no bd
        const user = this.usersRepository.create({email});
        await this.usersRepository.save(user);

        return user;
    }
}

export { UsersService };

//astronautas