/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SDImageCodersManager.h"
#import <SDWebImageWebPCoder/SDImageWebPCoder.h>

@import GooglePlaces;
@import GoogleMaps;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"stepgether"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  [GMSPlacesClient provideAPIKey:@"AIzaSyCrQ86eayIJRgvULerXdDcu7upOGLx3F6w"];
  [GMSServices provideAPIKey:@"AIzaSyCrQ86eayIJRgvULerXdDcu7upOGLx3F6w"];
  [SDImageCodersManager.sharedManager addCoder:SDImageWebPCoder.sharedCoder];
  return YES;
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *, id> *) options {
    return [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
