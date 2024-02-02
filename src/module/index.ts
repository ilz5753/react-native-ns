import { NativeModules } from 'react-native';
import { Platform } from 'react-native';

export type CommandName =
  | 'ping'
  | 'abb'
  | 'abx'
  | 'cat'
  | 'chmod'
  | 'clear'
  | 'cmd'
  | 'cmp'
  | 'cp'
  | 'curl'
  | 'cut'
  | 'date'
  | 'dirname'
  | 'echo'
  | 'env'
  | 'file'
  | 'find'
  | 'free'
  | 'grep'
  | 'ifconfig'
  | 'input'
  | 'ip'
  | 'iptables'
  | 'kill'
  | 'ln'
  | 'log'
  | 'ls'
  | 'mkdir'
  | 'mv'
  | 'netcat'
  | 'netstat'
  | 'pmap'
  | 'printf'
  | 'pwd'
  | 'reboot'
  | 'rm'
  | 'rmdir'
  | 'rmmod'
  | 'screencap'
  | 'screenrecord'
  | 'settings'
  | 'sh'
  | 'showmap'
  | 'sleep'
  | 'start'
  | 'stat'
  | 'stop'
  | 'sync'
  | 'sysctl'
  | 'tar'
  | 'tee'
  | 'telecom'
  | 'time'
  | 'timeout'
  | 'top'
  | 'touch'
  | 'uname'
  | 'unlink'
  | 'unzip'
  | 'watch'
  | 'wc'
  | 'which'
  | 'whoami'
  | 'zcat';
export interface NsModule {
  /**
   * perform android shell based commands through js
   * @example
   * ```ts
   * run("ping", "google.com", 3)
   *  .then((result) => {
   *    console.log(result); // 3 line
   *  })
   *  .catch((e) => {
   *    console.error(e);
   *  });
   * ```
   *
   * @param commandName e.g. `ping`
   * @param options command options e.g. `google.com` for `ping` commmand
   * @param count number of shell output lines joining by `\n`
   * @default android only
   */
  run(
    commandName: CommandName,
    options: string,
    count: number
  ): Promise<string>;
}
const LINKING_ERROR =
  `The package 'react-native-ns' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const Ns: NsModule =
  NativeModules.Ns ??
  new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
