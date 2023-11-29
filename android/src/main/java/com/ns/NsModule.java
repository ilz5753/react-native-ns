package com.ns;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
// import com.ns.NetInterface;
@ReactModule(name = NsModule.NAME)
public class NsModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Ns";

  public NsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("cpp");
  }

  private static native String[] nativeGetIpsFromMacAddress(String mac);
  private static native String[] nativeGetIPs(String ip, int port);
  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void GetIpsFromMacAddress(String macAddress, Promise promise) {
      try {
          String[] ips = nativeGetIpsFromMacAddress(macAddress);

          WritableArray ipsArray = new WritableNativeArray();
          for (String ip : ips) {
              ipsArray.pushString(ip);
          }

          promise.resolve(ipsArray);
      } catch (Exception e) {
          promise.reject("error", e.getMessage());
      }
  }
  @ReactMethod
  public void GetIPs(String ip, int port, Promise promise) {
      try {
          String[] ips = nativeGetIPs(ip, port);

          WritableArray ipsArray = new WritableNativeArray();
          for (String i : ips) {
              ipsArray.pushString(i);
          }

          promise.resolve(ipsArray);
      } catch (Exception e) {
          promise.reject("error", e.getMessage());
      }
  }
}
