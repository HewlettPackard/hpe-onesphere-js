# hpe-onesphere-js
Javascript bindings to the HPE OneSphere REST API.

## Usage

Install dependency

```zsh
npm i @hpe/hpe-onesphere-js
```

Example usage

```javascript
import OneSphere from '@hpe/hpe-onesphere-js';

const oneSphere = new OneSphere(host);
oneSphere.postSession({ username: ..., password: ... })
  .then(() => oneSphere.getSession())
  .then(session => console.log('Session:', session));
```

## APIs

- [Catalogs](#catalogs)
- [Deployments](#deployments)
- [Metrics](#metrics)
- [Networks](#networks)
- [Projects](#projects)
- [Providers](#providers)
- [Rates](#rates)
- [Regions](#regions)
- [Roles](#roles)
- [Services](#services)
- [Sessions](#sessions)
- [Status](#status)
- [Tag Keys](#tag-keys)
- [Tags](#tags)
- [Users](#users)
- [VM Profiles](#virtual-machine-profiles)
- [Zones](#zones)

### Catalogs
```javascript
getCatalog(uri, args)
getCatalogs(args)
getCatalogType(uri, args)
getCatalogTypes(args)
```
### Deployments
```javascript
addDeployment(data, args)
getDeployment(uri, args)
getDeployments(args)
removeDeployment(uri, args)
```
### Metrics
```javascript
getMetrics(args)
```
### Networks
```javascript
getNetworks(args)
```
### Projects
```javascript
addProject(data, args)
getProject(uri, args)
getProjects(args)
updateProject(uri, data, args)
removeProject(uri, args)
```
### Providers
```javascript
addProvider(data, args)
getProvider(uri, args)
getProviders(args)
getProviderTypes(args)
removeProvider(uri, args)
```
### Rates
```javascript
getRates(args)
getRate(uri, args)
```

### Regions
```javascript
getRegion(uri, args)
getRegions(args)
removeRegion(uri, args) // args: { force: true }
```
### Roles
```javascript
getRole(uri, args)
getRoles(args)
```
### Services
```javascript
getService(uri, args)
getServices(args)
getServiceTypes(args)
```
### Sessions
```javascript
getSession(args)
postSession({ username, password })
```
### Status
```javascript
getStatus(args)
```
### Tag Keys
```javascript
addTagKey(data, args)
getTagKeys(args)
getTagKey(uri, args)
removeTagKey(uri, args)
```
### Tags
```javascript
addTag(data, args)
getTags(args)
getTag(uri, args)
removeTag(uri, args)
```
### Users
```javascript
addUser(data, args)
getUsers(args)
getUser(uri, args)
updateUser(uri, data, args)
removeUser(uri, args)
```
### Virtual Machine Profiles
```javascript
getVirtualMachineProfile(uri, args)
getVirtualMachineProfiles(args)
```
### Zones
```javascript
getZone(uri, args)
getZones(args)
getZoneTypes(args)
removeZone(uri, args)
```

## Development

Install
```zsh
yarn install
```

Test
```zsh
npm test
```

The tests are full integration tests and require the following environment variables:

```javascript
ONESPHERE_URL='https://my.onesphere.com'
ONESPHERE_USERNAME='eric.soderberg@hpe.com'
ONESPHERE_PASSWORD='...'
```
