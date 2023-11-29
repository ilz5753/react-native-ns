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
  vector<string> GetIPs(const char *baseIP, const int port);
}

#endif /* NS_H */
