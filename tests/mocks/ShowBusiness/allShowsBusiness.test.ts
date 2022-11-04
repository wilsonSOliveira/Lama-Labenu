import { IGetALLShowsInputDTO, Show } from './../../../src/models/Show';
import { ShowDatabaseMock } from './../ShowDatabaseMock';
import { ShowBusiness } from './../../../src/business/ShowBusiness';
import { IdGeneratorMock } from '../IdGeneratorMock';
import { AuthenticatorMock } from '../AuthenticatorMock';
import { ICreateShowInputDTO, IShowDB } from '../../../src/models/Show';
describe("Testando o método signup da UserBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("retorna todos os shows cadastrados", async () => {
        const input: IGetALLShowsInputDTO = {
            token:"token-mock-admin"
        }
        const response = await showBusiness.allShowsBusiness(input)

        expect(response.shows.length).toBe(2)
        expect(response.shows[0]).toBeInstanceOf(Show)

    })
})