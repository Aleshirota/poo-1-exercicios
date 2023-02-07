import { Course } from "../models/Course"
import { CoursesDB } from "../types"
import { CourseDatabase } from "../database/CourseDatabase"
import { BadRequestError } from "../errors/BadRequestError"

export class CourseBusiness {
    public getCourses = async () => {
        const coursesDatabase = new CourseDatabase()
        const coursesDB: CoursesDB[] = await coursesDatabase.findCourses()

        const courses = coursesDB.map((courseDB) => new Course(
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        ))

        return courses
    }

    public createCourse = async (input: any) => {
        const { id, name, lessons } = input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        const courseDatabase = new CourseDatabase()
        const courseDBExists = await courseDatabase.findCourseById(id)

        if (courseDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newCourse = new Course(
            id,
            name,
            lessons
        
        )

        const newCourseDB: CoursesDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
            
        }

        await courseDatabase.insertCourse(newCourseDB)

        const output = {
            message: "Curso cadastrado com sucesso",
            course: newCourse
        }

        return output
    }


    // public editCourseBalance = async (input: any) => {
    //     const { id, name } = input

    //     if (typeof name !== "string") {
    //         throw new BadRequestError("'name' deve ser string")
    //     }

    //     const courseDatabase = new CourseDatabase()
    //     const courseDB = await courseDatabase.findCourseById(id)

    //     if (!courseDB) {
    //         throw new BadRequestError("'id' não encontrado")
    //     }

    //     const course = new Course(
    //         courseDB.id,
    //         courseDB.name,
    //         courseDB.lessons
    //     )

    //     // const newBalance = account.getBalance() + value
    //     // account.setBalance(newBalance)

    //     // await accountDatabase.updateBalanceById(id, newBalance)

    //     const output = {
    //         message: "Course editado com sucesso",
    //         course:course
    //     }
        
    //     return output
    // }
}

