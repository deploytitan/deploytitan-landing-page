import path from 'node:path'

import { config as loadDotenv } from 'dotenv'

const PROJECT_ROOT = process.cwd()

const envFiles = [
  '.env.local',
  '.env',
]

for (const file of envFiles) {
  loadDotenv({
    path: path.join(PROJECT_ROOT, file),
    override: false,
  })
}
