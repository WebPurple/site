import CMS from 'netlify-cms'

import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('blog', BlogPostPreview)
