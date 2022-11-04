import { ICreateShowInputDTO, IGetALLShowsInputDTO, IPayTicketInputDTO } from './../models/Show';
import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) {}

    public CreateShowController = async (req: Request, res: Response) => {
        try {
            const input: ICreateShowInputDTO = {
                band:req.body.band,
                startsAt: req.body.startsAt,
                token: req.headers.authorization as string
            }


            const response = await this.showBusiness.createShowBusiness(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public allShowsController = async (req: Request, res: Response) => {
        try {
            const input: IGetALLShowsInputDTO = {
                token: req.headers.authorization as string
            }

            const response = await this.showBusiness.allShowsBusiness(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public payTicketController = async (req: Request, res: Response) => {
        try {
            const input: IPayTicketInputDTO = {
                showId:req.body.showId,
                token: req.headers.authorization as string
            }

            const response = await this.showBusiness.payTicketBusisness(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public deleteTicketController = async (req: Request, res: Response) => {
        try {
            const input: IPayTicketInputDTO = {
                showId:req.body.showId,
                token: req.headers.authorization as string
            }

            const response = await this.showBusiness.deleteTicketBusiness(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }
}