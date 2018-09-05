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

- [Appliances](#appliances)
- [Billing Accounts](#billing-accounts)
- [Catalogs](#catalogs)
- [Connect App](#connect-app)
- [Deployments](#deployments)
- [Keypairs](#keypairs)
- [Memberships](#memberships)
- [Metrics](#metrics)
- [Networks](#networks)
- [Password Reset](#password-reset)
- [Projects](#projects)
- [Providers](#providers)
- [Rates](#rates)
- [Regions](#regions)
- [Roles](#roles)
- [Servers](#servers)
- [Services](#services)
- [Sessions](#sessions)
- [Status](#status)
- [Tag Keys](#tag-keys)
- [Tags](#tags)
- [Users](#users)
- [Version](#version)
- [VM Profiles](#virtual-machine-profiles)
- [Volumes](#volumes)
- [Zones](#zones)

### Appliances
```javascript
getAppliance(uri, args)
getAppliances(args)
addAppliance(data, args)
updateAppliance(uri, data, args)
removeAppliance(uri, args)
```
### Billing Accounts
```javascript
getBillingAccount(uri, args)
getBillingAccounts(args)
addBillingAccount(data, args)
updateBillingAccount(uri, data, args)
removeBillingAccount(uri, args)
```
### Catalogs
```javascript
getCatalog(uri, args)
getCatalogs(args)
addCatalog(data, args)
updateCatalog(uri, data, args)
getCatalogTypes(args)
```
### Connect App
```javascript
getConnectApp(args)
```
### Deployments
```javascript
getDeployment(uri, args)
getDeployments(args)
addDeployment(data, args)
updateDeployment(uri, data, args)
removeDeployment(uri, args)
actionOnDeployment(uri, data, args)
getDeploymentConsole(uri, args)
getDeploymentKubeconfig(uri, args)
```
### Keypairs
```javascript
getKeyPair(args)
```
### Memberships
```javascript
getMemberships(arg)
addMembership(data, args)
removeMembership(uri, args)
getMembershipRoles(args)
```
### Metrics
```javascript
getMetrics(args)
```
### Networks
```javascript
getNetwork(uri, args)
getNetworks(args)
updateNetwork(uri, data, args)
```
### Password Reset
```javascript
resetSingleUsePassword(data, args)
changePassword(data, args)
```
### Projects
```javascript
getProject(uri, args)
getProjects(args)
addProject(data, args)
updateProject(uri, data, args)
```
### Providers
```javascript
getProvider(uri, args)
getProviders(args)
addProvider(data, args)
updateProvider(uri, data, args)
removeProvider(uri, args)
getProviderTypes(args)
```
### Rates
```javascript
getRate(uri, args)
getRates(args)
```
### Regions
```javascript
getRegion(uri, args)
getRegions(args)
addRegion(data, args)
updateRegion(uri, data, args)
removeRegion(uri, args) // args: { force: true }
getRegionConnection(uri, args)
addRegionConnection(uri, data, args)
removeRegionConnection(uri, args)
getRegionConnectorImage(uri, args)
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
getServiceType(args)
getServiceTypes(args)
```
### Sessions
```javascript
getSession(args)
postSession({ username, password })
getSessionSSO(args)
callbackSessionSSO(args)
```
### Status
```javascript
getStatus(args)
```
### Tag Keys
```javascript
getTagKey(uri, args)
getTagKeys(args)
addTagKey(data, args)
removeTagKey(uri, args)
```
### Tags
```javascript
getTag(uri, args)
getTags(args)
addTag(data, args)
removeTag(uri, args)
```
### Users
```javascript
getUser(uri, args)
getUsers(args)
addUser(data, args)
updateUser(uri, data, args)
removeUser(uri, args)
```
### Version
```javascript
getVersion(args)(args)
```
### Virtual Machine Profiles
```javascript
getVirtualMachineProfile(uri, args)
getVirtualMachineProfiles(args)
```
### Volumes
```javascript
getVolume(uri, args)
getVolumes(args)
addVolume(data, args)
updateVolume(uri, data, args)
removeVolume(uri, args)
```
### Zones
```javascript
getZone(uri, args)
getZones(args)
addZone(data, args)
updateZone(uri, data, args)
removeZone(uri, args)
actionOnZone(uri, data, args)
getZoneApplianceImage(uri, args)
getZoneTaskStatus(uri, args)
getZoneConnections(uri, args)
addZoneConnection(uri, data, args)
updateZoneConnection(uri, data, uuid, args)
removeZoneConnection(uri, uuid, args)
getZoneEndpoint(uri, args)
getZoneTypes(args)
getZoneTypeResourceProfiles(uri, args)
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
