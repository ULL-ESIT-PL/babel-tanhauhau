let config = {
  apiEndpoint: "https://api.example.com",
  timeout: 5000,
  else (key) => `Config key "${key}" missing`
};

console.log(config.apiEndpoint); // "https://api.example.com"
console.log(config.timeout);     // 5000
console.log(config.maxRetries); // "Config key 'maxRetries' missing"