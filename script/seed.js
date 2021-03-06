/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User } = require('../server/db/models');
const { Room } = require('../server/db/models');

async function seed () {
  await db.sync({force: true});
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', nickname: 'cody', password: '123'}),
    User.create({email: 'murphy@email.com', nickname: 'murphy', password: '123'}),
    User.create({email: 'josh@josh.com', nickname: 'retrofuturejosh', password: '123'}),
    User.create({email: 'matt@matt.com', nickname: 'MattyAmazing', password: '123'}),
  ]);
  const rooms = await Promise.all([
    Room.create({name: 'fun timez', game: 'DnD', adminId: '1'}),
    Room.create({name: 'more fun timez', game: 'Sorry', adminId: '2'}),
    Room.create({name: 'Matt is kool', game: 'Pictionary', adminId: '3'})
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log('seeded successfully');
}



// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');