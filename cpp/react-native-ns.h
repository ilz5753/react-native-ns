#ifndef NS_H
#define NS_H
#include <vector>
#include <string>
using namespace std;
namespace ns
{
  struct NetInterface
  {
    char *ip, *name;
  };
  vector<string> GetIpsFromMacAddress(const char *mac);
  // vector<string> NearestDevicesIps(char *ip, int port);
  vector<NetInterface> findInterfaces();
}

#endif /* NS_H */
