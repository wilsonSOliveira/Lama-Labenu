export interface IShowDB {
    id: string,
    band: string,
    starts_at: Date
}

export interface ITicketDB {
    id: string,
    show_id: string,
    user_id: string
}

export interface ICreateShowInputDTO{
    token:string,
    band:string,
    startsAt:Date
}

export interface ICreateShowOutputDTO{
    message:string
    id:string,
}

export interface IGetALLShowsInputDTO{
    token:string
}
export interface IGetShowsOutputDTO{
    shows:Show[]
}

export interface IPayTicketCreateDTO{
    id:string,
    showId:string,
    userId:string
}

export interface ICreateTicketOutputDTO{
    message:string
    id:string,
}

export interface IPayTicketInputDTO{
    token:string
    showId:string,
}

export interface IDeleteTicketInputDTO{
    token:string
    showId:string,
}
export interface IDeleteTicketOutputDTO{
    message:string
}



export class Show {
    constructor(
        private id: string,
        private band: string,
        private startsAt: Date,
        private tickets: number = 5000
    ) {}

    public getId = () => {
        return this.id
    }

    public getBand = () => {
        return this.band
    }

    public getStartsAt = () => {
        return this.startsAt
    }

    public getTickets = () => {
        return this.tickets
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public setBand = (newBand: string) => {
        this.band = newBand
    }

    public setStartsAt = (newStartsAt: Date) => {
        this.startsAt = newStartsAt
    }

    public setTickets = (newTickets: number) => {
        this.tickets = newTickets
    }
}
