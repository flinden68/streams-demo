import { Router, Request, Response } from 'express';
import {TodoController} from "../controller/todo.controller";

const router: Router = Router();
const todoController = new TodoController();

router.use(function timeLog (req, res, next) {
    next()
})

router.post('/todo', (req: Request, res: Response) => {
  todoController.create(req,res).then(function(result) {
        res.send(result);
    });
});

export const ApiRoutes: Router = router;
