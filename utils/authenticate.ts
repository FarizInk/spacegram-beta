import { Context, HTTPException } from "hono";
import * as bcrypt from "bcrypt";
import { config } from "dotenv";
import db from "../database.ts";

export default (context: Context) => {
  const authorization = context.req.header("authorization");

  if (!authorization) {
    throw new HTTPException(401, { message: "Unathorized" });
  }

  const token = authorization.replace("Bearer ", "");
  const today = (new Date()).toISOString().split("T")[0] // yyyy-mm-dd
  const tickets:Array<Array<string>> = db.query(`SELECT * FROM tickets WHERE created_at = '${today}'`)

  let ticket = null
  for (let i = 0; i < tickets.length; i++) {
    const identifier = tickets[i][0];
    const result = bcrypt.compareSync(identifier + config().KEY, token);
    if (result) {
      ticket = identifier
      break
    }
  }


  if (!ticket) {
    throw new HTTPException(401, { message: "Ticket Expired." });
  } else {
    db.query(`DELETE FROM tickets WHERE id = '${ticket}'`)
  }
}