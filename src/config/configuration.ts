export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    queue: process.env.RABBITMQ_QUEUE,
  },
});