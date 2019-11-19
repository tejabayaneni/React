/*  Create a NeDB datastore for tasks created by a *teacher*
    for use in testing.
*/

const db = require("../models/taskModel");
const tasks = require("./tasks1.json");

function resetTasks() {
  return db
    .remove({}, { multi: true })
    .then(function(numRemoved) {
      // console.log(`Removed ${numRemoved} tasks`);
      let p = db.insert(tasks); // We let NeDB create _id property for us.
      // console.log(p instanceof Promise);
      return p;
    })
    .catch(function(err) {
      console.log(`Some kind of problem: ${err}`);
      return err;
    });
}

module.exports = resetTasks;
