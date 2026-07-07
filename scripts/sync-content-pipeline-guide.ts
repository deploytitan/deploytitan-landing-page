import { createClient } from 'next-sanity'

import './load-dotenv'
import { defaultPipelineGuideStages } from '../src/sanity/lib/workflowDefaults'

function getEnv(name: string, fallbackName?: string) {
  return process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
}

function requireEnv(name: string, fallbackName?: string) {
  const value = getEnv(name, fallbackName)
  if (!value) {
    throw new Error(`Missing required environment variable: ${fallbackName ? `${name} or ${fallbackName}` : name}`)
  }

  return value
}

const overview =
  'Use this guide as the operating manual for the DeployTitan content system. The flow is: discover an opportunity, optionally round-trip a document through ChatGPT with Copy for ChatGPT and Import from ChatGPT, turn the accepted opportunity into an article draft with evidence, publish the article as a hub, generate distribution assets, then measure KPI impact and feed learnings back into future opportunities.'

async function main() {
  const client = createClient({
    projectId: requireEnv('SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: requireEnv('SANITY_DATASET', 'NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: getEnv('SANITY_API_VERSION', 'NEXT_PUBLIC_SANITY_API_VERSION') ?? '2026-07-05',
    useCdn: false,
    token: requireEnv('SANITY_API_WRITE_TOKEN'),
  })

  await client.createOrReplace({
    _id: 'content-pipeline-guide',
    _type: 'contentPipelineGuide',
    title: 'DeployTitan Content Pipeline Guide',
    overview,
    stages: defaultPipelineGuideStages(),
  })

  console.log('Synced content-pipeline-guide')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
