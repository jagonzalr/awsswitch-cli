export function fileHasNewProfile(fileContent, newProfile, isConfig = true) {
  return isConfig
    ? fileContent.includes(`[profile ${newProfile}]`)
    : fileContent.includes(`[${newProfile}]`)
}
