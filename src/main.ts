import glaredb from "@glaredb/glaredb"
import path from "path"
import url from "url"

const fname = url.fileURLToPath(import.meta.url)
const csvPath = path.join(path.dirname(fname), "students.csv")

const conn = await glaredb.connect()
const res = await conn.sql(
    `SELECT
        id,
        username,
        score
    FROM '${csvPath}'
    WHERE active = true`,
)
await res.show()
