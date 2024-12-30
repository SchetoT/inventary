import compression from "compression";
import zlib from "zlib";

app.use(
    compression({
    filter: (req, res) => {
        if (req.path.startsWith("/api/items") && req.method === "GET") {
        return res.getHeader("Content-Type")?.includes("application/json");
        }
        return false;
    },
    level: zlib.constants.Z_BEST_COMPRESSION,
    threshold: 1024,
    })
);