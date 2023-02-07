import { CourseBusiness } from "../business/CourseBusiness"
import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError"

export class CourseController {
public getCourses = async (req: Request, res: Response) => {

    try {
        const courseBusiness = new CourseBusiness()
        const output = await courseBusiness.getCourses()

        res.status(200).send(output)
    } catch (error) {
        console.log(error)

                if (error instanceof BaseError) {
                    res.status(error.statusCode).send(error.message)
                } else {
                    res.status(500).send("Erro inesperado")
                }
    }
}

public createCourse = async (req: Request, res: Response) => {
    try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            lessons: req.body.lessons
        }

        const courseBusiness = new CourseBusiness()
        const output = await courseBusiness.createCourse(input)

        res.status(201).send(output)
    } catch (error) {
        console.log(error)

                if (error instanceof BaseError) {
                    res.status(error.statusCode).send(error.message)
                } else {
                    res.status(500).send("Erro inesperado")
                }
    }
}

// public editCourseBalance = async (req: Request, res: Response) => {
//     try {
//         const input = {
//             id: req.params.id,
//             name: req.body.name
//         }

//         const courseBusiness = new CourseBusiness()
//         const output = await courseBusiness.editCourseBalance(input)

//         res.status(200).send(output)
//     } catch (error) {
//         console.log(error)

//                 if (error instanceof BaseError) {
//                     res.status(error.statusCode).send(error.message)
//                 } else {
//                     res.status(500).send("Erro inesperado")
//                 }
//     }
// }
}