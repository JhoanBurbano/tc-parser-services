export const log = (
  message: string,
  type: 'error' | 'warning' | 'default' = 'default'
) => {
  const parsedMessage = `[${new Date().toISOString()}] - ${message}`;
  const optionalParams = {
    error: '"\x1b[31m%s\x1b[0m"',
    warning: '"\x1b[33m%s\x1b[0m"',
    default: '"\x1b[32m%s\x1b[0m"',
  };
  switch (type) {
    case 'error':
      console.log(optionalParams[type], parsedMessage);
      break;
    case 'warning':
      console.log(optionalParams[type], parsedMessage);
      break;
    default:
      console.log(optionalParams[type], parsedMessage);
      break;
  }
};
