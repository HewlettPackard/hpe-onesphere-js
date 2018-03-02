# hpe-onesphere-js
Javascript bindings to the HPE OneSphere REST API.

## Usage

Install dependency

```
npm i @hpe/hpe-onesphere-js
```

Example usage

```
import OneSphere from 'hpe-onesphere-js';

const oneSphere = new OneSphere(host);
oneSphere.postSession({ username: ..., password: ... })
  .then(() => oneSphere.getSession())
  .then(session => console.log('Session:', session));
```

## APIs

```
getStatus()
postSession({ username, password })
getSession(args)

getUsers()
addUser(...)
getUser(uri)
removeUser(uri)
getRoles()
getRole(uri)

getCatalogs()
getCatalog(uri)
getServiceTypes()
getServices()
getService(uri)
getVirtualMachineProfiles()
getVirtualMachineProfile(uri)
getTagKeys()
getTagKey(uri)
addTagKey(data)
removeTagKey(uri)
getTags()
getTag(uri)
addTag(data)
removeTag(uri)

getProviderTypes()
getProviders()
getProvider(uri)
getRegions(args)
getRegion(uri)
getZoneTypes()
getZones()
getZone(uri)
getRates()
getRate(uri)

getProjects(args)
getProject(uri)
addProject(data)
updateProject(uri, data)
removeProject(uri)
getDeployments()
getDeployment(uri)
getMetrics(options)
```

## Development

Install
```
yarn install
```

Test
```
npm test
```

The tests are full integration tests and require the following environment variables:

```
ONESPHERE_URL='https://my.onesphere.com'
ONESPHERE_USERNAME='eric.soderberg@hpe.com'
ONESPHERE_PASSWORD='...'
```
