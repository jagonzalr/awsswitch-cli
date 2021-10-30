import { Command } from 'commander/esm.mjs'

import { updateFileWithNewProfile } from './utils'

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
  updateFileWithNewProfile(currentProfile, newProfile)
  updateFileWithNewProfile(currentProfile, newProfile, false)
  process.exit(0)
}
