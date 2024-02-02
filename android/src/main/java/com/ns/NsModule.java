package com.ns;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.concurrent.ExecutorService;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.Executors;

@ReactModule(name = NsModule.NAME)
public class NsModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Ns";
  private final ExecutorService executorService;
  public NsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("cpp");
  }
  @ReactMethod
  public void run(String commandName, String options, Integer count, Promise promise) {
    String command = "/system/bin/" + commandName;
    executorService.execute(new Runnable() {
      @Override
      public void run() {
        try {
          ProcessBuilder processBuilder = new ProcessBuilder(command, options);
          Process process = processBuilder.start();
          BufferedReader reader = new BufferedReader(
              new InputStreamReader(process.getInputStream()));
          String line;
          Integer counter = 0;
          StringBuilder output = new StringBuilder();
          while ((line = reader.readLine()) != null && count != counter) {
            output.append(line).append("\n");
            counter++;
          }
          process.destroy();
          promise.resolve(output.toString());
        } catch (Exception e) {
          promise.reject("Error", e.getMessage());
        }
      }
    });
  }
}
