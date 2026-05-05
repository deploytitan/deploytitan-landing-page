import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'deploytitan',
  title: 'DeployTitan',

  projectId: 'ngz5n084',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
