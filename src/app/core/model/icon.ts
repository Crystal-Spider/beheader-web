/**
 * Locally shipped Material Design SVGs, named by their app role.
 * @type {Readonly<Record<string, string>>}
 */
export const ICON_FILES = {
  upload: 'upload_file',
  image: 'image',
  audio: 'audio_file',
  video: 'movie',
  html: 'code',
  pdf: 'description',
  archive: 'folder_zip',
  download: 'download',
  privacy: 'lock',
  magic: 'auto_awesome'
} as const;

/** A registered local icon name. */
export type IconName = keyof typeof ICON_FILES;
