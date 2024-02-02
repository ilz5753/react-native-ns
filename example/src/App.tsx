import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { Ns } from 'react-native-ns';
import Pagination from '../components/Pagination';
import ContextManager from '../contexts';
import { useStore } from '../contexts/Store';
let startRange = 130,
  endRange = 135;
let gt = <View {...{ style: { paddingTop: 8 } }} />;
let EndErrorMessages = ['Unreachable'];
let StartErrorMessages = ['timeout'];
let Errors = [...EndErrorMessages, ...StartErrorMessages].map((v) =>
  v.toLowerCase()
);
let min = 60;
let ho = min * min;
let zerofy = (t = 0) => `${t < 10 ? '0' : ''}${t}`;
let format = (time = 0) => {
  let s: string = '00',
    m: string = '00',
    h: string = '00';
  if (time < min) s = zerofy(time);
  else if (time >= min && time < ho) {
    let rm = Math.floor(time / min);
    let rs = time - rm * min;
    m = zerofy(rm);
    s = zerofy(rs);
  } else if (time >= ho && time < 24 * ho) {
    let rh = Math.floor(time / ho);
    let rm = Math.floor(time / min);
    let rs = time - rh * ho - rm * min;
    h = zerofy(rh);
    m = zerofy(rm);
    s = zerofy(rs);
  }
  let o: string[] = [];
  if (h) o.push(h);
  if (m) o.push(m);
  if (s) o.push(s);
  return o.join(':');
};

// function App() {
//   const [privateIp, setPrivateIp] = useState('');

//   return (
//     <KeyboardAvoidingView
//       {...{
//         behavior: isAndroid ? 'height' : 'padding',
//         style: [f1],
//       }}
//     >
//       <SafeAreaView
//         {...{
//           style: [
//             f1,
//             {
//               backgroundColor: 'white',
//             },
//           ],
//         }}
//       >
//         <ScrollView keyboardShouldPersistTaps="always">
//           <View
//             {...{
//               style: [
//                 {
//                   alignItems: 'center',
//                   flexDirection: 'row',
//                   justifyContent: 'space-evenly',
//                   marginBottom: 30,
//                 },
//               ],
//             }}
//           >
//             <TouchableOpacity
//               {...{
//                 // onPress,
//                 activeOpacity: 0.75,
//               }}
//             >
//               <Text
//                 {...{
//                   style: [
//                     {
//                       fontSize: 21,
//                       color: 'black',
//                     },
//                   ],
//                 }}
//               >
//                 Find Interfaces
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Text>Private IP: {privateIp}</Text>
//         </ScrollView>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// }

function List({ data = [], title, Ref }: any) {
  return (
    <FlatList
      {...{
        ref: Ref,
        style: styles.f1,
        data,
        renderItem({ item }: any) {
          return (
            <Text
              {...{
                style: [{ color: 'gray', fontSize: 16, textAlign: 'center' }],
              }}
            >
              {item}
            </Text>
          );
        },
        keyExtractor(_, index) {
          return `${index}`;
        },
        ItemSeparatorComponent() {
          return (
            <View
              {...{
                style: [
                  {
                    width: '100%',
                    height: 1,
                    backgroundColor: 'gray',
                    borderRadius: 0.5,
                    marginVertical: 6,
                  },
                ],
              }}
            />
          );
        },
        ListHeaderComponent() {
          return (
            <Text
              {...{
                style: {
                  fontSize: 24,
                  color: 'black',
                  textAlign: 'center',
                  backgroundColor: 'white',
                },
              }}
            >
              {title}
            </Text>
          );
        },
        stickyHeaderIndices: [0],
      }}
    />
  );
}

function Btn({ onPress, text, disabled = false }: any) {
  return (
    <>
      {gt}
      <View {...{ style: { width: '100%', alignItems: 'center' } }}>
        <TouchableOpacity
          {...{
            activeOpacity: 0.75,
            style: {
              backgroundColor: disabled ? '#cccccc' : '#0070ff',
              paddingHorizontal: 24,
              paddingVertical: 6,
              borderRadius: 6,
            },
            onPress,
            disabled,
          }}
        >
          <Text
            {...{
              style: {
                fontSize: 16,
                color: 'white',
              },
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </View>
      {gt}
    </>
  );
}

/**
 * Finding Device IP
 */
function Step1() {
  let { state, update } = useStore();
  let steps = useMemo(() => state?.steps ?? [], [state]);
  let onPress = useCallback(async () => {
    try {
      let ip = await NetworkInfo.getIPV4Address();
      if (ip) {
        let ns = [...steps];
        ns[1].isDone = true;
        update({ ip, steps: ns, activeIndex: 1 });
      }
    } catch (e) {}
  }, [steps]);
  return <Btn {...{ onPress, text: 'Get IP' }} />;
}

/**
 * Finding Available IPs
 */
function Step2() {
  let { state, update } = useStore();
  let ip = useMemo(() => state?.ip ?? '', [state]);
  let steps = useMemo(() => state?.steps ?? [], [state]);
  let [disabled, setDisabled] = useState(false);
  let [ips, setIPs] = useState<string[]>([]);
  let [founded, setFounded] = useState<string[]>([]);
  let addIPs = useCallback((ip: string) => setIPs((i) => [...i, ip]), []);
  let addFounded = useCallback(
    (ip: string) => setFounded((f) => [...f, ip]),
    []
  );
  let processIP = useCallback((ip: string, index: number) => {
    Ns.run('ping', ip, 2)
      .then((output) => {
        addIPs(ip);
        let lo = output.toLowerCase();
        let error = false;
        for (let e of Errors)
          if (lo.includes(e)) {
            error = true;
            break;
          }
        if (!error) addFounded(ip);
        if (index === endRange) {
          setDisabled(false);
          update({ disabledReset: false });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  let testPing = useCallback((gaIP: string) => {
    setDisabled(true);
    update({ disabledReset: true });
    for (let i = startRange; i <= endRange; i++) {
      let iip = `${gaIP}.${i}`;
      processIP(iip, i);
    }
  }, []);
  let onPress = useCallback(() => {
    if (ip) {
      let ga = ip.split('.');
      let last = ga.pop();
      update({ disabledReset: true });
      try {
        last = parseInt(last);
      } catch (e: any) {}
      if (last) {
        setIPs([]);
        setFounded([]);
        let gaIP = ga.join('.');
        testPing(gaIP);
      }
    }
  }, [ip]);
  let next = useCallback(() => {
    let ns = [...steps];
    ns[2].isDone = true;
    update({ ips, founded, activeIndex: 2, steps: ns });
  }, [ips, founded, steps]);
  return (
    <View {...{ style: [styles.f1, { paddingHorizontal: 8 }] }}>
      <Btn {...{ onPress, text: 'Scan Network', disabled }} />
      <View {...{ style: [styles.f1, { gap: 24 }, { flexDirection: 'row' }] }}>
        <List {...{ data: ips, title: 'All IPs' }} />
        <List {...{ data: founded, title: 'Founded IPs' }} />
      </View>
      {gt}
      <View
        {...{
          style: [
            { width: '100%' },
            { flexDirection: 'row', alignItems: 'center' },
          ],
        }}
      >
        <View
          {...{
            style: [
              styles.f1,
              { justifyContent: 'center', alignItems: 'center' },
            ],
          }}
        >
          {disabled && (
            <ActivityIndicator {...{ color: '#0070ff', size: 'large' }} />
          )}
        </View>
        <View {...{ style: [styles.f1] }}>
          <Btn {...{ onPress: next, text: 'Next', disabled }} />
        </View>
      </View>
    </View>
  );
}

/**
 * Receiving Ports
 */
function Step3() {
  let { state, update } = useStore();
  let steps = useMemo(() => state?.steps ?? [], [state]);
  let initialPorts = useMemo(() => state?.ports ?? [8000, 9100], [state]);
  let [ports, setPorts] = useState<number[]>(initialPorts);
  let [port, setPort] = useState('');
  let addPoprt = useCallback(
    (port: number) => setPorts((p) => (p.includes(port) ? p : [...p, port])),
    []
  );
  let add = useCallback(() => {
    try {
      let p = parseInt(port);
      if (p > 1 && p < 65536) {
        addPoprt(Math.floor(p));
        setPort('');
      }
    } catch (e) {}
  }, [port]);
  let next = useCallback(() => {
    let ns = [...steps];
    ns[3].isDone = true;
    update({ steps: ns, activeIndex: 3, ports });
  }, [steps, ports]);
  return (
    <View {...{ style: [styles.f1, { paddingHorizontal: 8 }] }}>
      <View>
        {gt}
        <TextInput
          {...{
            value: port,
            onChangeText: setPort,
            keyboardType: 'number-pad',
            maxLength: 5,
            style: [
              {
                backgroundColor: '#eaeaea',
                borderRadius: 12,
                color: '#000000',
                fontSize: 18,
                paddingHorizontal: 8,
              },
            ],
            onSubmitEditing: add,
            placeholder: 'Port Number',
            placeholderTextColor: '#999999',
          }}
        />
        <Btn {...{ onPress: add, text: 'Add Port' }} />
      </View>
      <View {...{ style: [styles.f1] }}>
        <List {...{ data: ports, title: 'User Ports' }} />
      </View>
      <Btn {...{ onPress: next, text: 'Next' }} />
    </View>
  );
}

/**
 * Finding Printer Devices
 */
function Step4() {
  let { state, update } = useStore();
  let foundedIps = useMemo(() => state?.founded ?? [], [state]);
  let ports = useMemo(() => state?.ports ?? [], [state]);
  let [urls, setUrls] = useState<string[]>([]);
  let [founded, setFounded] = useState<string[]>([]);
  let [time, setTime] = useState(0);
  let [disabled, setDisabled] = useState(false);
  let timer = useRef<NodeJS.Timeout>();
  let isCancel = useRef(false);
  let nextTime = useCallback(() => setTime((t) => t + 1), []);
  let addUrl = useCallback((url: string) => setUrls((u) => [...u, url]), []);
  let addFounded = useCallback(
    (url: string) => setFounded((f) => [...f, url]),
    []
  );
  let onPress = useCallback(async () => {
    // console.log({ foundedIps, ports });
    update({ disabledReset: true });
    setUrls([]);
    setFounded([]);
    setTime(0);
    setDisabled(true);
    timer.current = setInterval(nextTime, 1000);
    isCancel.current = false;
    for (let ip of foundedIps) {
      for (let port of ports) {
        if (isCancel.current) break;
        let url = `http://${ip}:${port}`;
        addUrl(url);
        try {
          let resp = await fetch(url);
          if (resp.ok) addFounded(url);
        } catch (e) {}
      }
    }
    clearInterval(timer.current);
    timer.current = undefined;
    setDisabled(false);
    update({ disabledReset: false });
  }, [foundedIps, ports]);
  let cancel = useCallback(() => {
    isCancel.current = true;
  }, []);
  return (
    <View {...{ style: [styles.f1, { paddingHorizontal: 8 }] }}>
      <Btn {...{ onPress, text: 'Request Urls', disabled }} />
      <View {...{ style: [styles.f1, { gap: 24 }, { flexDirection: 'row' }] }}>
        <List {...{ data: urls, title: 'All Urls' }} />
        <List {...{ data: founded, title: 'Founded Urls' }} />
      </View>
      {gt}
      <View
        {...{
          style: [
            { width: '100%', flexDirection: 'row', alignItems: 'center' },
          ],
        }}
      >
        <View {...{ style: [styles.f1] }}>
          <Text
            {...{
              style: [
                { fontSize: 13.5, color: '#878787', textAlign: 'center' },
              ],
            }}
          >
            Elapsed Time: {format(time)}
          </Text>
        </View>
        <View {...{ style: [styles.f1] }}>
          <Btn {...{ onPress: cancel, text: 'Cancel', disabled: !disabled }} />
        </View>
      </View>
    </View>
  );
}

function Layout() {
  let { state, update } = useStore();
  let steps = useMemo(() => state?.steps ?? [], [state]);
  let activeIndex = useMemo(() => state?.activeIndex ?? -1, [state]);
  let disabledReset = useMemo(() => state?.disabledReset ?? false, [state]);
  let ip = useMemo(() => state?.ip ?? undefined, [state]);
  let reset = useCallback(() => {
    update({ activeIndex: 0, ip: '', ips: [], founded: [], ports: [] });
  }, []);
  useEffect(() => {
    update({
      steps: [
        {
          id: '0',
          title: '1. Finding Device IP',
        },
        {
          id: '1',
          title: '2. Finding Available IPs',
        },
        {
          id: '2',
          title: '3. Receiving Ports',
        },
        {
          id: '3',
          title: '4. Finding Printer Devices',
        },
      ],
      activeIndex: 0,
      // ip: "No IP yet.",
      ips: [],
      founded: [],
      ports: [9100, 8000, 8081],
      disabledReset: false,
    });
  }, []);
  return (
    <>
      {gt}
      <Pagination {...{ steps, activeIndex }} />
      {ip && (
        <>
          {gt}
          <View {...{ style: { paddingHorizontal: 8 } }}>
            <Text {...{ style: { fontSize: 14.4, color: 'black' } }}>
              IP: {ip}
            </Text>
          </View>
        </>
      )}
      <View {...{ style: styles.f1 }}>
        {activeIndex === 0 && <Step1 />}
        {activeIndex === 1 && <Step2 />}
        {activeIndex === 2 && <Step3 />}
        {activeIndex === 3 && <Step4 />}
      </View>
      <Btn
        {...{ onPress: reset, text: 'Reset Steps', disabled: disabledReset }}
      />
    </>
  );
}
export default function App() {
  return (
    <ContextManager>
      <SafeAreaView
        {...{
          style: [styles.f1, styles.bgw, { padding: 8 }],
        }}
      >
        <Layout />
      </SafeAreaView>
    </ContextManager>
  );
}
let styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  bgw: {
    backgroundColor: '#ffffff',
  },
});
