
const pull = require('pull-stream')
const debug = require('debug')('datastore-empty')

const Key = require('interface-datastore').Key

/**
 * A datastore that does not persist anything.
 */
class EmptyDatastore {

  constructor () {}

  open (callback /* : Callback<void> */) /* : void */ {
    callback()
  }

  put (key /* : Key */, value /* : Buffer */, callback /* : Callback<void> */) /* : void */ {
    debug('Write attempted, key=', key, 'value=', value)
    callback(new Error('Write not implemented'))
  }

  get (key /* : Key */, callback /* : Callback<Buffer> */) /* : void */ {
    callback(new Error('Read not implemented'))
  }

  has (key /* : Key */, callback /* : Callback<bool> */) /* : void */ {
    callback(null, false)
  }

  delete (key /* : Key */, callback /* : Callback<void> */) /* : void */ {
    debug('Delete silently ignored, key=', key);
    callback() // cb nonetheless, to match LevelDB behaviour: https://github.com/ideawu/ssdb/issues/12
  }

  close (callback /* : Callback<void> */) /* : void */ {}

  batch () /* : Batch<Buffer> */ {
    const ops = []
    return {
      put: (key /* : Key */, value /* : Buffer */) /* : void */ => {
        debug('batch:put silently ignored, key=', key, 'value=', value)
      },
      delete: (key /* : Key */) /* : void */ => {
        debug('batch:delete silently ignored, key=', key)
      },
      commit: (callback /* : Callback<void> */) /* : void */ => {
        callback(new Error("Batch not implemented"))
      }
    }
  }

  query (q /* : Query<Buffer> */) /* : QueryResult<Buffer> */ {
    pull(
      pull.values([]),
    )
  }
}

module.exports = EmptyDatastore
