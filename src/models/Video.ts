export class Video {
   
    constructor(
        private id:string, 
        private titulo:string, 
        private duracao:string,
        private createdAt:string)
    {
   
    }
    
    public getId():string{
        return this.id
    }
    public setId(newId:string):void{
        this.id = newId
    }

    public getTitulo(){
        return this.titulo
    }
    public setTitulo(newTitulo:string):void{
        this.titulo = newTitulo
    }

    public getDuracao(){
        return this.duracao
    }
    public setDuracao(newDuracao:string):void{
        this.duracao = newDuracao
    }

    public getCreatedAt(){
        return this.createdAt
    }
    public setCreatedAt(newCreatedAt:string):void{
        this.createdAt = newCreatedAt
    }
  
}

const video1 = new Video("001","O Cravo e a Rosa","80 min", "2023-01-30 10:00:00")

video1.setId("010")






















































