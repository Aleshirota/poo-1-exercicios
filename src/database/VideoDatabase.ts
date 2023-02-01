import { BaseDatabase } from "./BaseDatabase";
import { TVideoDB } from "../types";

export class VideoDatabase extends BaseDatabase{

    public static TABLE_VIDEOS = "videos"
 
    public async findVideos(q: string|undefined){
    let videosDB

    if (q) {
        const result: TVideoDB[] = await BaseDatabase
        .connection(VideoDatabase.TABLE_VIDEOS)
        .where("titulo", "LIKE", `%${q}%`)
        videosDB = result
    } else {
        const result: TVideoDB[] = await BaseDatabase.connection("videos")
        videosDB = result 
    }
    return videosDB
}


// =================================================================

public async findVideoById(id: string | undefined):Promise<TVideoDB|undefined>{
    const [ videoDBExists ]: TVideoDB[] | undefined[] = await BaseDatabase
    .connection(VideoDatabase.TABLE_VIDEOS)
    .where({ id })
    return videoDBExists
}
public async insertVideo (newVideoDB:TVideoDB): Promise<void> {
    await BaseDatabase
    .connection(VideoDatabase.TABLE_VIDEOS)
    .insert(newVideoDB)
}


// =================================================================

public async findDeleteVideoById(id: string | undefined):Promise<TVideoDB|undefined>{
    const [ videoIdAlreadyExists ]: TVideoDB[] | undefined[] = await BaseDatabase
    .connection
    .where({ id })
    
    return videoIdAlreadyExists
}
public async insertDeleteVideo (newVideoDB:TVideoDB): Promise<void> {
    await BaseDatabase
    .connection(VideoDatabase.TABLE_VIDEOS)
    .insert(newVideoDB)
}
}