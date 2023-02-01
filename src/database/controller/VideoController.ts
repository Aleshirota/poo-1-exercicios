import { Video } from "../../models/Video"
import { VideoDatabase } from "../VideoDatabase"
import { Request,Response } from "express"



export class VideoController {

    public getVideos =  async (req: Request, res: Response) => {
       
            try {
                const q = req.query.q as string|undefined
        
                // let videosDB //underfined
        
                // if (q) {
                //     const result: TVideoDB[] = await db("videos").where("titulo", "LIKE", `%${q}%`)
                //     videosDB = result
                // } else {
                //     const result: TVideoDB[] = await db("videos")
                //     videosDB = result //dado cru
                // }
                const videosDatabase = new VideoDatabase()
                const videosDB = await videosDatabase.findVideos(q)
        
                // videosDB[0].titulo = "Homem de Ferro" // não queremos que isso aconteceça
        
                //vamos pegar as informações vindas do videosBD e INSTANCIA-LA em um objeto da classe Video
                            
                const videos: Video[] = videosDB.map((videoDB)=> new Video(
                    videoDB.id,
                    videoDB.titulo,
                    videoDB.duracao,
                    videoDB.created_at
                ))
        
                //videos[0].titulo = "Homem de Ferro" // não permite pq titulo é privado na classe Video
        
                res.status(200).send(videos) //dado instanciado
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
        }

    
    public createVideo = async (req: Request, res: Response)=>{
       
            try {
                const { id, titulo, duracao } = req.body //dado cru
        
                if (typeof id !== "string") {
                    res.status(400)
                    throw new Error("'id' deve ser string")
                }
        
                if (typeof titulo !== "string") {
                    res.status(400)
                    throw new Error("'titulo' deve ser string")
                }
        
                if (typeof duracao !== "string") {
                    res.status(400)
                    throw new Error("'duracao' deve ser string")
                }
        
                // const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id })
                const videoDatabase = new VideoDatabase()
                const videoDBExists = await videoDatabase.findVideoById(id)
        
                if (videoDBExists) {
                    res.status(400)
                    throw new Error("'id' já existe")
                }
        
                const newVideo = new Video(
                    id,
                    titulo,
                    duracao,
                    new Date().toISOString()
                )
        
                const newVideoDB = {
                    id: newVideo.getId(),
                    titulo: newVideo.getTitulo(),
                    duracao: newVideo.getDuracao(),
                    created_at: newVideo.getCreatedAt() 
                }
        
                // await db("videos").insert(newVideoDB)
                  videoDatabase.insertVideo(newVideoDB)                                                  
                res.status(201).send(newVideo) 
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
        }

    }

    
