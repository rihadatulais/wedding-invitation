import { lazy } from 'react'

export const templateRegistry = {
  'template-one': {
    id: 'template-one',
    name: 'Template One',
    accent: 'linear-gradient(135deg, #f2e5d1 0%, #c89f67 100%)',
    description: 'Tampilan elegan bernuansa krem dan emas untuk undangan formal.',
    component: lazy(() =>
      import('../components/templates/TemplateOne/TemplateOne'),
    ),
  },
}

export const templateGallery = Object.values(templateRegistry)
