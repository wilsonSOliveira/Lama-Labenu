import { ShowDatabaseMock } from './../ShowDatabaseMock';
import { ShowBusiness } from './../../../src/business/ShowBusiness';
import { IdGeneratorMock } from '../IdGeneratorMock';
import { AuthenticatorMock } from '../AuthenticatorMock';
import { ICreateShowInputDTO } from '../../../src/models/Show';
describe("Testando o método signup da UserBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Um id é retornado quando o cadastro é bem-sucedido", async () => {
        const input: ICreateShowInputDTO = {
            startsAt:new Date("2022/12/01"),
            band: "mamonas",
            token:"token-mock-admin"
        }
        const response = await showBusiness.createShowBusiness(input)

        expect(response.message).toBe("Show cadastrado com sucesso")
        expect(response.id).toBe("id-mock")

    })
})