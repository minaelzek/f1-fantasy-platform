const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

function logError(error) {
  Sentry.captureException(error);
}

function logPerformance(transactionName, operation) {
  const transaction = Sentry.startTransaction({ name: transactionName });
  operation();
  transaction.finish();
}

module.exports = {
  logError,
  logPerformance,
};
