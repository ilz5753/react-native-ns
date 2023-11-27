#ifndef NS_H
#define NS_H
#include <vector>
#include <string>
using namespace std;
namespace ns
{
  double multiply(double a, double b);
  vector<string> GetIpsFromMacAddress(const char *mac);
  vector<string> NearestDevicesIps(char *ip, int port);
}

#endif /* NS_H */
