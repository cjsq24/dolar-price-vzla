import cron from 'node-cron';

cron.schedule('52,54,56 * * * *', () => {
  console.log('Dolar Price 9-1');
}, {
  scheduled: true,
  timezone: 'America/Caracas'
});

cron.schedule('51,53,55 * * * *', () => {
  console.log('Dolar Price every 30 minutes');
}, {
  scheduled: true,
  timezone: 'America/Caracas'
});
