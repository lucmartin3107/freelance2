import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { getAllUserHandler,getUserHandler,  createUserHandler, updateUserHandler, deleteUsertHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { deleteUserSchema, updateUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
  //  */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // /**
  //  * @openapi
  //  * '/api/users':
  //  *  post:
  //  *     tags:
  //  *     - User
  //  *     summary: Register a user
  //  *     requestBody:
  //  *      required: true
  //  *      content:
  //  *        application/json:
  //  *           schema:
  //  *              $ref: '#/components/schemas/CreateUserInput'
  //  *     responses:
  //  *      200:
  //  *        description: Success
  //  *        content:
  //  *          application/json:
  //  *            schema:
  //  *              $ref: '#/components/schemas/CreateUserResponse'
  //  *      409:
  //  *        description: Conflict
  //  *      400:
  //  *        description: Bad request
  //  */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  
  app.get(
    "/api/users",
    getAllUserHandler
  );
  app.get(
    "/api/users/:userId",
    getUserHandler
  );
  app.put(
    "/api/users/:userId",
    [requireUser, validateResource(updateUserSchema)],
    updateUserHandler
  );
  app.delete(
    "/api/users/:userId",
    [requireUser, validateResource(deleteUserSchema)],
    deleteUsertHandler
  );
 app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  
  
   
}

export default routes;
