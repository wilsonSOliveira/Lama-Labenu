import { IShowDB, Show, ITicketDB, IPayTicketCreateDTO, IPayTicketInputDTO } from './../models/Show';
import { BaseDatabase } from "./BaseDatabase"

export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public createShowData = async (show: Show) => {
        const showDB:IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt(),
        }
        await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
            .insert(showDB)
    }

    public findShowByDateData = async (startsAt: Date):  Promise<IShowDB | undefined> => {
        const result:IShowDB[]|undefined = await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
            .select()
            .where({
                starts_at:startsAt
            })
            return result[0]|| undefined
            
    }
    public findShowByIdData= async (id:string):Promise<IShowDB|undefined> => {
        const result:IShowDB[] = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
            .select("*")
            .where({id:id})
            return result[0]
            
    }

    public getAllShowsData = async () => {
        const result:IShowDB[] = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
            .select("*")

            return result
            
    }

    public payTicketData= async (ticket:ITicketDB) => {
        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .insert({
                id: ticket.id,
                show_id: ticket.show_id,
                user_id: ticket.user_id
            })
    }

    public verifyTicketData= async (userId:string, showId:string ):Promise<ITicketDB|undefined> => {
        const result:ITicketDB[] = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .select("*")
            .where({user_id:userId})
            .andWhere({show_id:showId})

            return result[0]
    }    

    public ticketByIdData = async (showId: string):Promise<number> => {
        const result = await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .select()
            .count("id AS tickets")
            .where({ show_id: showId })
    
        return result[0].tickets as number
    }

    public deleteTicketData = async (id:string) => {

        await BaseDatabase
            .connection(ShowDatabase.TABLE_TICKETS)
            .delete()
            .where({id:id})
    
    }
}