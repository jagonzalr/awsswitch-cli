import chalk from 'chalk'
import fs from 'fs'

export function fileHasNewProfile(fileContent, newProfile, isConfig) {
  return isConfig
    ? fileContent.includes(`[profile ${newProfile}]`)
    : fileContent.includes(`[${newProfile}]`)
}

export function logError(fileName, profile) {
  console.error(
    '%s No profile in %s found with name %s.',
    chalk.red.bold('ERROR'),
    chalk.yellowBright(fileName),
    chalk.yellowBright(profile)
  )
}

export function logSuccess(fileName) {
  console.log(
    '%s AWS default profile updated in %s successfully.',
    chalk.green.bold('DONE'),
    chalk.yellowBright(fileName)
  )
}

export function updateFileWithNewProfile(
  file,
  filePath,
  newProfile,
  currentProfile,
  isConfig = false
) {
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
