import { IPayTicketCreateDTO, IPayTicketInputDTO } from './../../../src/models/Show';
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

    test("deve ser possivel fazer uma reserva", async () => {
        const input: IPayTicketInputDTO = {
            showId: "202",
            token:"token-mock-admin"
        }
        const response = await showBusiness.payTicketBusisness(input)

        expect(response.message).toBe("Ingresso reservado com sucesso")
        expect(response.id).toBe("id-mock")

    })
})