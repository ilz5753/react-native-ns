import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ns' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Ns = NativeModules.Ns
  ? NativeModules.Ns
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function GetIpsFromMacAddress(macAddress: string): Promise<string[]> {
  return Ns.GetIpsFromMacAddress(macAddress);
}
export function GetIPs(ip: string, port: number): Promise<string[]> {
  return Ns.GetIPs(ip, port);
}
