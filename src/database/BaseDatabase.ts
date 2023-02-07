import { knex } from "knex"
import { CourseDatabase } from "./CourseDatabase"


export abstract class BaseDatabase{
   protected static connection = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/poo-1-exercicios.db",
    },
    useNullAsDefault: true,
    pool: { 
        min: 0,
        max: 1,
        afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        }
    }
})

public async updateBalanceById(id: string, newBalance: number) {
    await BaseDatabase
        .connection(CourseDatabase.TABLE_COURSES)
        .update({ balance: newBalance })
        .where({ id })
}

}


   