import express, { Request, Response } from 'express'
import cors from 'cors'
import {TVideoDB} from './types'
// import { db } from './database/BaseDatabase'
import { Video } from './models/Video'
import { VideoDatabase } from './database/VideoDatabase'
import { VideoController } from './database/controller/VideoController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pongpong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

const videoController = new VideoController()

app.get("/videos", videoController.getVideos )

app.post("/videos", videoController.createVideo )

// ==========================Editar Videos=================================================

// app.put("/videos/:id", async (req: Request, res: Response) => {
    
//     try {
//         const id = req.params.id
//         const value = req.body.value

//         if (typeof value !== "number") {
//             res.status(400)
//             throw new Error("'value' deve ser number")
//         }

//         const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

//         if (!accountDB) {
//             res.status(404)
//             throw new Error("'id' não encontrado")
//         }

//         const account = new Account(
//             accountDB.id,
//             accountDB.balance,
//             accountDB.owner_id,
//             accountDB.created_at
//         )

//         const newBalance = account.getBalance() + value
//         account.setBalance(newBalance)

//         await db("accounts").update({ balance: newBalance }).where({ id })
        
//         res.status(200).send(account)
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })



// ==========================Delete Videos=================================================

app.delete("/videos/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete[0] !== "u") {
            res.status(400)
            throw new Error("'id' deve iniciar com a letra 'u'")
        }

        // const [ taskIdToDelete ]= await db("videos").where({ id: idToDelete })
        const videoDatabase = new VideoDatabase()
        const taskIdToDelete = await videoDatabase.findVideoById(idToDelete)

        if (!taskIdToDelete) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        // await db("videos").del().where({ id: idToDelete })
        await videoDatabase.findVideoById(idToDelete)

        res.status(200).send({ message: "Pedido cancelado com sucesso" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})