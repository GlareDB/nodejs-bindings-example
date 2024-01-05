import glaredb from "@glaredb/glaredb"
import path from "path"
import url from "url"

const fname = url.fileURLToPath(import.meta.url)
const reportPath = path.join(path.dirname(fname), "customer_report.csv")

// TODO: Add your GlareDB cloud URL from <https://console.glaredb.com>
const cloudURL = ""

const conn = await glaredb.connect(cloudURL)
const res = await conn.sql(`
    SELECT
        c.c_custkey,
        c.c_name,
        c.c_acctbal,
        r.projection
    FROM my_pg.public.customer c
    INNER JOIN '${reportPath}' r
        ON c.c_custkey = r.cid;
`)
await res.show()
