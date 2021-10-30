import { Command } from 'commander/esm.mjs'
import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  fileHasNewProfile,
  logError,
  logSuccess,
  updateFileWithNewProfile
} from './utils'

const packageJson = require('../package.json')

const AWS_CONFIG_FILE = '.aws/config'
const AWS_CREDENTIALS_FILE = '.aws/credentials'

const program = new Command()

program
  .version(packageJson.version, '-v, --version', 'Output the current version.')
  .usage('new_profile current_profile')
  .argument('<new_profile>', 'New default profile')
  .argument('<current_profile>', 'Current default profile')
  .description(
    'Updates current default AWS profile saved in .aws config/credentials files.'
  )
  .action(run)
  .showHelpAfterError()

export async function cli() {
  await program.parseAsync()
}

async function run(newProfile, currentProfile) {
  const homeDir = os.homedir()

  const awsConfigPath = path.resolve(homeDir, AWS_CONFIG_FILE)
  const awsCredentialsPath = path.resolve(homeDir, AWS_CREDENTIALS_FILE)

  const awsConfigFile = fs.readFileSync(awsConfigPath, 'utf-8')
  const awsCredentialsFile = fs.readFileSync(awsCredentialsPath, 'utf-8')

  if (!fileHasNewProfile(awsConfigFile, newProfile, true)) {
    logError(AWS_CONFIG_FILE, newProfile)
    process.exit(1)
  }

  if (!fileHasNewProfile(awsCredentialsFile, newProfile)) {
    logError(AWS_CREDENTIALS_FILE, newProfile)
    process.exit(1)
  }

  updateFileWithNewProfile(
    awsConfigFile,
    awsConfigPath,
    newProfile,
    currentProfile,
    true
  )

  logSuccess(AWS_CONFIG_FILE)

  updateFileWithNewProfile(
    awsCredentialsFile,
    awsCredentialsPath,
    newProfile,
    currentProfile
  )

  logSuccess(AWS_CREDENTIALS_FILE)

  process.exit(0)
}
