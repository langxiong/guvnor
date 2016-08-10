'use strict'

const child_process = require('child_process')

const run = (cmd, args, options) => {
  options = options || {}

  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''

    console.info('$', cmd, args.join(' '))

    const proc = child_process.spawn(cmd, args, options)
    proc.stdout.on('data', (data) => {
      const str = data.toString('utf8')
      stdout += str
      console.info(`${str.trim()}`)
    });
    proc.stderr.on('data', (data) => {
      const str = data.toString('utf8')
      stderr += str
      console.error(`${str.trim()}`);
    });

    if (options.ignoreExit) {
      proc.unref()
      return resolve()
    }

    proc.on('close', (code) => {
      if (code === 0) {
        return resolve(stdout.trim())
      }

      const error = new Error(`Child process exited with code ${code}`)
      error.code = code
      error.stderr = stderr.trim()

      reject(error)
    })
  })
}

module.exports = run
