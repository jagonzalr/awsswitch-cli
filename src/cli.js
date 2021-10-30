import { Command } from 'commander/esm.mjs'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { fileHasNewProfile } from './utils'

const program = new Command()

program
  .argument('current', 'Current default profile')
  .argument('new', 'New default profile')
  .description(
    'Updates current default AWS profile saved in .aws config/credentials files'
  )
  .action(run)

export async function cli() {
  await program.parseAsync()
}

async function run(currentProfile, newProfile) {
  const homeDir = os.homedir()

  const awsConfigFile = '.aws/config'
  const awsConfigPath = path.resolve(homeDir, awsConfigFile)
  const awsConfigContent = fs.readFileSync(awsConfigPath, 'utf-8')

  const awsCredentialsFile = '.aws/credentials'
  const awsCredentialsPath = path.resolve(homeDir, awsCredentialsFile)
  const awsCredentialsContent = fs.readFileSync(awsCredentialsPath, 'utf-8')

  if (!fileHasNewProfile(awsConfigContent, newProfile)) {
    console.error('No profile in .aws/config found with name', newProfile)
    process.exit(1)
  }

  if (!fileHasNewProfile(awsCredentialsContent, newProfile, false)) {
    console.error('No profile in .aws/credentials found with name', newProfile)
    process.exit(1)
  }

  process.exit(0)
}
