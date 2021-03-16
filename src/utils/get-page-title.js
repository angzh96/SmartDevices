import defaultSettings from '@/settings'

const title = defaultSettings.title || 'UAV/CAR Management Sys'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
