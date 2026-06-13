import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your_project_id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'muna-media',
  title: 'Muna Media CMS',
  projectId,
  dataset,
  basePath: '/cms',
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes},
})
