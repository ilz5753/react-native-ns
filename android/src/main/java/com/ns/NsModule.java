package com.ns;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import java.util.List;
import java.util.ArrayList;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.Promise;

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

  private static native double nativeMultiply(double a, double b);
  private static native List<String> nativeGetIpsFromMacAddress(String mac);
  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(nativeMultiply(a, b));
  }
  @ReactMethod
  public void GetIpsFromMacAddress(String macAddress, Promise promise) {
      try {
          List<String> ips = nativeGetIpsFromMacAddress(macAddress);

          WritableArray ipsArray = new WritableNativeArray();
          for (String ip : ips) {
              ipsArray.pushString(ip);
          }

          promise.resolve(ipsArray);
      } catch (Exception e) {
          promise.reject("error", e.getMessage());
      }
  }
}
