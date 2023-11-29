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
}

#endif /* NS_H */
