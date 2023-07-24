import { ulid } from "ulid";
import db from "../database.ts";
import { HTTPException } from "hono";

export default () => {
  // delete unused or expired tickets
  const today = (new Date()).toISOString().split("T")[0] // yyyy-mm-dd
  db.query(`DELETE FROM tickets WHERE created_at != '${today}'`)

  const id = ulid();
  db.query(`INSERT INTO tickets (id, created_at) VALUES ('${id}','${today}')`);
  const ticket = db.query(`SELECT * FROM tickets WHERE id = '${id}'`)[0]

  if (ticket.length === 0) {
    throw new HTTPException(403, { message: "Something Wrong." });
  }

  return ticket[0];
};
