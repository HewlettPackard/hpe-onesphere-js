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
getStatus(args)
postSession({ username, password })
getSession(args)

getUsers(args)
addUser(data, args)
getUser(uri, args)
removeUser(uri, args)
getRoles(args)
getRole(uri, args)

getCatalogs(args)
getCatalog(uri, args)
getServiceTypes(args)
getServices(args)
getService(uri, args)
getVirtualMachineProfiles(args)
getVirtualMachineProfile(uri, args)
getTagKeys(args)
getTagKey(uri, args)
addTagKey(data, args)
removeTagKey(uri, args)
getTags(args)
getTag(uri, args)
addTag(data, args)
removeTag(uri, args)

getProviderTypes(args)
getProviders(args)
getProvider(uri, args)
getRegions(args)
getRegion(uri, args)
getZoneTypes(args)
getZones(args)
getZone(uri, args)
getRates(args)
getRate(uri, args)

getProjects(args)
getProject(uri, args)
addProject(data, args)
updateProject(uri, data, args)
removeProject(uri, args)
getDeployments(args)
getDeployment(uri, args)
getMetrics(args)
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
