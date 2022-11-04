import { AuthorizationError } from './../errors/AuthorizationError';
import { UserDatabase } from "../database/UserDatabase"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { ParamsError } from "../errors/ParamsError"
import { ILoginInputDTO, ILoginOutputDTO, ISignupInputDTO, ISignupOutputDTO, User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

    public signup = async(input : ISignupInputDTO)=>{
        const {name,email,password} = input

        if (!name || !email || !password) {
            throw new ParamsError()
        }

        if (typeof name !== "string" || name.length < 3) {
            throw new ParamsError("Parâmetro 'name' inválido")
        }

        if (typeof email !== "string" || email.length < 3) {
            throw new ParamsError("Parâmetro 'email' inválido")
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new ParamsError("Parâmetro 'email' inválido")
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new ParamsError("Parâmetro 'password' inválido")
        }

        const userByEmail = await this.userDatabase.findByEmail(email)

        if (userByEmail) {
            throw new ConflictError("Email já cadastrado")
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL
        )

        await this.userDatabase.createUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ISignupOutputDTO = {
            message: "Cadastro realizado com sucesso",
            token
        }

        return response
    }

    public login = async (input: ILoginInputDTO) => {
        const email = input.email
        const password = input.password

        if (!email || !password) {
            throw new ParamsError()
        }

        if (typeof email !== "string" || email.length < 3) {
            throw new ParamsError("Parâmetro 'email' inválido")
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new ParamsError("Parâmetro 'email' inválido")
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new ParamsError("Parâmetro 'password' inválido")
        }


        const userDB = await this.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("usuario não cadastrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        
        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())


        if (!isPasswordCorrect) {
            throw new AuthorizationError("Senha incorreta")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }


        const token = this.authenticator.generateToken(payload)

        const response:ILoginOutputDTO = {
            message: "Login realizado com sucesso",
            token
        }

        return response
    }

}