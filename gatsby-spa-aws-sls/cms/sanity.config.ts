import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'template',

  projectId: 'if6h1h6p',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), media(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
