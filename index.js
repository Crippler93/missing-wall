const app = require('./app');
const { sequelize: db } = require('./models');

app.get('/', async (req, res) => {
  const missings = await db.models.Missing.findAll({ include: db.models.Images });
  res.json(missings);
});

async function init() {
  await db.sync();
  console.log('Database running successfully');
  app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
  });
}

init();
