#ifdef __cplusplus
#import "react-native-ns.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNNsSpec.h"

@interface Ns : NSObject <NativeNsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Ns : NSObject <RCTBridgeModule>
#endif

@end
