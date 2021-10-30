import fs from 'fs'
import os from 'os'
import path from 'path'

const AWS_CONFIG_FILE = '.aws/config'
const AWS_CREDENTIALS_FILE = '.aws/credentials'

export function updateFileWithNewProfile(
  currentProfile,
  newProfile,
  isConfig = true
) {
  const homeDir = os.homedir()
  const fileName = isConfig ? AWS_CONFIG_FILE : AWS_CREDENTIALS_FILE
  const filePath = path.resolve(homeDir, fileName)
  const file = fs.readFileSync(filePath, 'utf-8')

  if (!fileHasNewProfile(file, newProfile, isConfig)) {
    console.error(`No profile in ${fileName} found with name ${newProfile}`)
    process.exit(1)
  }

  const fileWithNoDefault = replaceFileDefaultProfile(
    file,
    currentProfile,
    isConfig
  )
  const fileWithDefault = replaceFileWithDefaultProfile(
    fileWithNoDefault,
    newProfile,
    isConfig
  )

  fs.writeFileSync(filePath, fileWithDefault, 'utf-8')
}

export function fileHasNewProfile(fileContent, newProfile, isConfig) {
  return isConfig
    ? fileContent.includes(`[profile ${newProfile}]`)
    : fileContent.includes(`[${newProfile}]`)
}

export function replaceFileDefaultProfile(
  fileContent,
  currentProfile,
  isConfig
) {
  return isConfig
    ? fileContent.replace('[default]', `[profile ${currentProfile}]`)
    : fileContent.replace('[default]', `[${currentProfile}]`)
}

export function replaceFileWithDefaultProfile(
  fileContent,
  newProfile,
  isConfig
) {
  return isConfig
    ? fileContent.replace(`[profile ${newProfile}]`, '[default]')
    : fileContent.replace(`[${newProfile}]`, '[default]')
}
