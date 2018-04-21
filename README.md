# Rate Service

## Notes
* add `rtDependencies` in your (micro)service `package.json` to capture the dependencies your service has on other services at runtime
* at service startup, register your service with the envoy server to publish your swagger in the ecosystem
* request from envoy the actual endpoints of the services defined in rtDependencies and cache them in a `services` section in your environment-specific config file
