# react-native-ns

React Native Network Scan

## Installation

```sh
npm install react-native-ns
```

## Usage

```js
import Ns from 'react-native-ns';

// ...

Ns.run('ping', 'google.com', 3)
  .then((result) => {
    console.log(result); // 3 line
  })
  .catch((e) => {
    console.error(e);
  });
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
