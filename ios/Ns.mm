#import "Ns.h"
#import <React/RCTBridgeModule.h>
@implementation Ns
RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_EXPORT_METHOD(multiply:(double)a
                  b:(double)b
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @(ns::multiply(a, b));

    resolve(result);
}
RCT_EXPORT_METHOD(GetIpsFromMacAddress:(NSString *)macAddress
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        vector<string> ips = ns::GetIpsFromMacAddress([macAddress UTF8String]);

        resolve(ips);
    } @catch (NSException *exception) {
        reject(@"error", exception.reason, nil);
    }
}


@end
