const app = require('./app');
const { sequelize: db } = require('./models');
const missingRoutes = require('./routes/missing');

app.use('/api/missing', missingRoutes);

async function init() {
  await db.sync();
  console.log('Database running successfully');
  app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
  });
}

init();
