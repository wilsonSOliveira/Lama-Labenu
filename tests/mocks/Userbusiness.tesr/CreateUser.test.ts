import { UserBusiness } from './../../../src/business/UserBusiness';
import{ISignupInputDTO} from "../../../src/models/User"
import {  UserDatabaseMock } from '../UserDatabaseMock';
import { BaseError } from '../../../src/errors/BaseError';
import { IdGeneratorMock } from '../IdGeneratorMock';
import { HashManagerMock } from '../HashManagerMock';
import { AuthenticatorMock } from '../AuthenticatorMock';

describe("Testando o método signup da UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Um token é retornado quando o cadastro é bem-sucedido", async () => {
        const input: ISignupInputDTO = {
            email: "fulano@gmail.com",
            name: "Fulano",
            password: "fulano123"
        }

        const response = await userBusiness.signup(input)
        expect(response.message).toBe("Cadastro realizado com sucesso")
        expect(response.token).toBe("token-mock-normal")
    })

    test("Erro quando 'password' possuir menos de 6 caracteres", async () => {
        expect.assertions(2)

        try {
            const input: ISignupInputDTO = {
                email: "fulano@gmail.com",
                name: "Fulano",
                password: "123"
            }

            await userBusiness.signup(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Parâmetro 'password' inválido")
            }
        }
    })

    test("Erro quando o parametro email não apresenta o formato correto", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                email: "fulano",
                name: "Fulano",
                password: "123456"
            }

            await userBusiness.signup(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe("Parâmetro 'email' inválido")
            }
        }
    })

    test("Erro quando o parametro name apresenta menos que 3 caracteres", async () => {
        expect.assertions(2)
    try {
        const input = {
            email: "fulano@gmail.com",
            name: "Fu",
            password: "123456"
        }

        await userBusiness.signup(input)

    } catch (error) {
        if (error instanceof BaseError) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Parâmetro 'name' inválido")
        }
    }
})

test("Erro quando o email já esta cadastrado", async () => {
    expect.assertions(2)
try {
    const input = {
        email: "usermock@gmail.com",
        name: "Fulano",
        password: "123456"
    }

    await userBusiness.signup(input)

} catch (error) {
    if (error instanceof BaseError) {
        expect(error.statusCode).toBe(409)
        expect(error.message).toBe("Email já cadastrado")
    }
}
})

})