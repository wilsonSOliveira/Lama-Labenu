import { IDeleteTicketInputDTO } from './../../../src/models/Show';
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

    test("deve ser possivel cancelar uma reserva", async () => {
        const input: IDeleteTicketInputDTO = {
            showId:"201",
            token:"token-mock-admin"
        }
        const response = await showBusiness.deleteTicketBusiness(input)

        expect(response.message).toBe("reserva cancelada")

    })
})