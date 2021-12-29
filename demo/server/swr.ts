import type { IncomingMessage, ServerResponse } from "http"

export default (_req: IncomingMessage, res: ServerResponse, next: () => void) => {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate")
  next()
}
