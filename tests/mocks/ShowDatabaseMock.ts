import { Show, IShowDB, ITicketDB } from './../../src/models/Show';
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class ShowDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "Labook_Posts"
    public static TABLE_LIKES = "Labook_Likes"


    public toUserDBModel = (show: Show) => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt(),

        }

        return showDB
    }

    public createShowData = async (show: Show) => { }

    public findShowByDateData = async (startsAt: Date): Promise<IShowDB|undefined> => {
        switch (startsAt) {
            case new Date ("2022-10-01"):
                const show: IShowDB[] = [{
                    id: "201",
                    band: "mammonas",
                    starts_at: new Date(startsAt),
                }]
                return show[0];
                default:
                return undefined

        }
    }

    public findShowByIdData = async (id: string):Promise<IShowDB|undefined> => {
        switch (id) {
            case "201":
                const show: IShowDB = {
                    id: "201",
                    band: "mammonas",
                    starts_at: new Date("2022-10-01"),
                }
                return show;
                case "202" : 
                const show2: IShowDB = {
                    id: "202",
                    band: "simone",
                    starts_at: new Date("2022-10-02"),
                }
                return show2
        }
    }

    public getAllShowsData = async () => {
        const result:IShowDB[] = [{
            id: "201",
            band: "mammonas",
            starts_at: new Date("2022-10-01")
        }, {
            id: "202",
            band: "bang",
            starts_at: new Date("2022-10-02")

        }]

        return result
    }

    public payTicketData= async (ticket:ITicketDB) => {
    }

    public deleteTicketData = async (id:string) => {

    }

    public verifyTicketData= async (userId:string, showId:string ):Promise<ITicketDB|undefined> => {
        if(userId==="id-mock" && showId ==="201"){
            const ticket = {id: "201",
            show_id: "201",
            user_id: "201"}
            return ticket
        }
    }    

    public ticketByIdData = async (showId: string):Promise<number> => {
        switch (showId) {
            case "201":
                const ticket= 50
                return ticket
                default:
                    return 0
                } 
    }





}

