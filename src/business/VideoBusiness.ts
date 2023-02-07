import { VideoDatabase } from "../database/VideoDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Video } from "../models/Video"


export class VideoBusiness {

public getVideos = async (q: string| undefined)=>{

    const videosDatabase = new VideoDatabase()
    const videosDB = await videosDatabase.findVideos(q)

    const videos: Video[] = videosDB.map((videoDB)=> new Video(
        videoDB.id,
        videoDB.titulo,
        videoDB.duracao,
        videoDB.created_at
    ))
return ({videos:videos,
message: "Erro inesperado"})
}


public createVideo = async (imput: any)=>{

    const { id, titulo, duracao } = imput //dado cru
        
    if (typeof id !== "string") {
       
        throw new BadRequestError("'id' deve ser string")
    }

    if (typeof titulo !== "string") {
        
        throw new BadRequestError("'titulo' deve ser string")
    }

    if (typeof duracao !== "string") {
        
        throw new BadRequestError("'duracao' deve ser string")
    }

    // const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id })
    const videoDatabase = new VideoDatabase()
    const videoDBExists = await videoDatabase.findVideoById(id)

    if (videoDBExists) {
        
        throw new BadRequestError("'id' já existe")
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
await videoDatabase.insertVideo(newVideoDB)
const output = {
    message: "Cadastro realizado com sucesso",
    video:newVideo
}
return(output)
}

}

