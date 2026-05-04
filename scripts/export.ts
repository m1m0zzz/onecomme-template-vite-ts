import archiver from "archiver"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const TEMPLATE_NAME = "PROJECT_NAME"
const VERSION = "1.0"

const root = path.resolve(fileURLToPath(import.meta.url), "../..")
const distDir = path.join(root, "dist")
const outFile = path.join(root, `${TEMPLATE_NAME}-${VERSION}.zip`)

if (!fs.existsSync(distDir)) {
  console.error("dist/ not found. Run `npm run build` first.")
  process.exit(1)
}

const output = fs.createWriteStream(outFile)
const archive = archiver("zip", { zlib: { level: 9 } })

output.on("close", () => {
  fs.rmSync(distDir, { recursive: true })
  console.log(`Exported: ${TEMPLATE_NAME}-${VERSION}.zip (${archive.pointer()} bytes)`)
})
archive.on("error", (err: Error) => {
  throw err
})

archive.pipe(output)
archive.directory(distDir, false)
await archive.finalize()
