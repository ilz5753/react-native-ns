#import "Ns.h"
#import <React/RCTBridgeModule.h>
@implementation Ns
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(GetIpsFromMacAddress:(NSString *)macAddress
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        vector<string> ips = ns::GetIpsFromMacAddress([macAddress UTF8String]);
        // resolve(ips);
        NSMutableArray *ipArray = [NSMutableArray array];
        for (const auto& ip : ips) {
            NSString *nsIp = [NSString stringWithUTF8String:ip.c_str()];
            [ipArray addObject:nsIp];
        }

        resolve(ipArray);
    } @catch (NSException *exception) {
        reject(@"error", exception.reason, nil);
    }
}

// RCT_EXPORT_METHOD(GetIPs:(NSString *)ip
//                   port:(NSInteger)port
//                   resolve:(RCTPromiseResolveBlock)resolve
//                   reject:(RCTPromiseRejectBlock)reject)
// {
//     @try {
//         vector<string> ips = ns::GetIPs([ip UTF8String], port);

//         resolve(ips);
//     } @catch (NSException *exception) {
//         reject(@"error", exception.reason, nil);
//     }
// }
RCT_EXPORT_METHOD(GetIPs:(NSString *)ip
                  port:(NSInteger)port
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        vector<string> ips = ns::GetIPs([ip UTF8String], port);

        NSMutableArray *ipArray = [NSMutableArray array];
        for (const auto& ip : ips) {
            NSString *nsIp = [NSString stringWithUTF8String:ip.c_str()];
            [ipArray addObject:nsIp];
        }

        resolve(ipArray);
    } @catch (NSException *exception) {
        reject(@"error", exception.reason, nil);
    }
}

@end
