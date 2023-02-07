import { CoursesDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"


export class CourseDatabase extends BaseDatabase {
public static TABLE_COURSES = "courses"

    public async findCourses() {
        const coursesDB: CoursesDB[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)

        return coursesDB
    }

    public async findCourseById(id: string) {
        const [ courseDB ]: CoursesDB[] | undefined[] = await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .where({ id })

        return courseDB
    }

    public async insertCourse(newCourseDB: CoursesDB) {
        await BaseDatabase
            .connection(CourseDatabase.TABLE_COURSES)
            .insert(newCourseDB)
    }
}