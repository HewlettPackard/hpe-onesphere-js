// (C) Copyright 2017-2018 Hewlett Packard Enterprise Development LP

const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const getUrlParams = (args) => {
  if (args && (typeof args !== 'object' || Array.isArray(args))) {
    throw new Error('args parameter should be an object');
  }
  return args ? `?${Object.keys(args).map(k => `${k}=${encodeURIComponent(args[k])}`).join('&')}` : '';
};

const fetcher = (url, { proxy, ...rest }) =>
  fetch(url, {
    ...rest,
    agent: (process.env.https_proxy ? new HttpsProxyAgent(process.env.https_proxy) : undefined),
  })
  // Only json() for certain status returns
    .then((response) => {
      if (response.status === 204) {
        return Promise.resolve();
      }
      return response.json()
        .then(json => (response.ok ? json : Promise.reject(json)));
    });

export default class OneSphere {
  constructor(host) {
    this.host = host;
    this.headers = { ...HEADERS };
  }

  postOptions(data) {
    return {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
    };
  }

  patchOptions(data) {
    return {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    };
  }

  deleteOptions() {
    return {
      headers: this.headers,
      method: 'DELETE',
    };
  }

  // status

  getStatus(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/status${params}`, { headers: this.headers });
  }

  //connect-app

  getConnectApp(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/connect-app${params}`, { headers: this.headers });
  }

  // session

  postSession({ username, password }) {
    const options = this.postOptions({ username, password });
    return fetcher(`${this.host}/rest/session`, options)
      .then((session) => {
        this.headers.authorization = `Bearer ${session.token}`;
        return session;
      });
  }

  getSession(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/session${params}`, { headers: this.headers });
  }

  //Not implemented
  getSessionIdp(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/session/idp${params}`, { headers: this.headers });
  }

  getSessionSSO(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/session/sso${params}`, { headers: this.headers });
  }

  callbackSessionSSO(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/users${params}`, { headers: this.headers });
  }

  // version

  getVersion(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/about/versions${params}`, { headers: this.headers });
  }

  // users

  getUsers(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/users${params}`, { headers: this.headers });
  }

  addUser(data, args) {
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/users${params}`, options);
  }

  getUser(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeUser(uri, args) {
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateUser(uri, data, args) {
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // roles

  getRoles(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/roles${params}`, { headers: this.headers });
  }

  // catalog-types

  getCatalogTypes(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/catalog-types${params}`, { headers: this.headers });
  }

  // catalogs

  getCatalogs(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/catalogs${params}`, { headers: this.headers });
  }

  getCatalog(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addCatalog(data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}/rest/catalogs${params}`, { headers: this.headers });
  }

  //Not implemented
  removeCatalog(uri, args){
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateCatalog(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // service-types

  getServiceTypes(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/service-types${params}`, { headers: this.headers });
  }

  getServiceType(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/service-types${params}`, { headers: this.headers });
  }

  // services

  getServices(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/services${params}`, { headers: this.headers });
  }

  getService(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // virtual-machine-profiles

  getVirtualMachineProfiles(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/virtual-machine-profiles${params}`, { headers: this.headers });
  }

  getVirtualMachineProfile(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // tag-keys

  getTagKeys(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tag-keys${params}`, { headers: this.headers });
  }

  getTagKey(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addTagKey(data, args) {
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/tag-keys${params}`, options);
  }

  removeTagKey(uri, args) {
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // no PATCH Tag-key available

  // tags

  getTags(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tags${params}`, { headers: this.headers });
  }

  getTag(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addTag(data, args) {
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/tags${params}`, options);
  }

  removeTag(uri, args) {
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // no PATCH tag available

  // provider-types

  getProviderTypes(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/provider-types${params}`, { headers: this.headers });
  }

  // providers

  getProviders(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/providers${params}`, { headers: this.headers });
  }

  addProvider(data, args) {
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/providers${params}`, options);
  }

  getProvider(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeProvider(uri, args) {
    const params = getUrlParams(args);
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateProvider(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // regions

  getRegions(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/regions${params}`, { headers: this.headers });
  }

  getRegion(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addRegion(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/regions${params}`, options);
  }

  // args: { force: true }
  removeRegion(uri, args) {
    const params = getUrlParams(args);
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateRegion(uri, data, args) {
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  getRegionConnection(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/connection${params}`, { headers: this.headers });
  }

  addRegionConnection(uri, data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}${uri}/connection${params}`, options);
  }

  removeRegionConnection(uri, args){
    const params = getUrlParams(args);
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}/connection${params}`, options);
  }

  getRegionConnectorImage(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/connector-image${params}`, { headers: this.headers });
  }

  // zone-types

  getZoneTypes(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/zone-types${params}${params}`, { headers: this.headers });
  }

  getZoneTypeResourceProfiles(uri, args) {
    const params = getUrlParams(args);
      return fetcher(`${this.host}${uri}/resource-profiles${params}`, { headers: this.headers });
  }

  // zones

  getZones(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/zones${params}`, { headers: this.headers });
  }

  getZone(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeZone(uri, args) {
    const params = getUrlParams(args);
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  addZone(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/zones${params}`, options);
  }

  updateZone(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  actionOnZone(uri, data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}${uri}/actions${params}`, options);
  }

  getZoneApplianceImage(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/appliance-image${params}`, { headers: this.headers });
  }

  getZoneTaskStatus(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/task-status${params}`, { headers: this.headers });
  }

  getZoneConnections(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/connections${params}`, { headers: this.headers });
  }

  addZoneConnection(uri, data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}${uri}/connections${params}`, options);
  }

  removeZoneConnection(uri, uuid, args){
    const params = getUrlParams(args);
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}/connections/${uuid}${params}`, options);
  }

  updateZoneConnection(uri, data, uuid, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}/connections/${uuid}${params}`, options);
  }

  getZoneEndpoint(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/os-endpoints${params}`, { headers: this.headers });
  }

  // rates

  getRates(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/rates${params}`, { headers: this.headers });
  }

  getRate(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // networks

  getNetworks(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/networks${params}`, { headers: this.headers });
  }

  getNetwork(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  updateNetwork(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // projects

  getProjects(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/projects${params}`, { headers: this.headers });
  }

  getProject(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addProject(data, args) {
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/projects${params}`, options);
  }

  updateProject(uri, data, args) {
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  //Not implemented
  removeProject(uri, args) {
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // deployments

  addDeployment(data, args) {
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/deployments${params}`, options);
  }

  getDeployments(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/deployments${params}`, { headers: this.headers });
  }

  getDeployment(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeDeployment(uri, args) {
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateDeployment(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  actionOnDeployment(uri, data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}${uri}/actions${params}`, options);
  }

  getDeploymentConsole(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/console${params}`, { headers: this.headers });
  }

  getDeploymentKubeconfig(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}/kubeconfig${params}`, { headers: this.headers });
  }

  // metrics

  getMetrics(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/metrics${params}`, { headers: this.headers });
  }

  // accounts

  //Not implemented
  getAccount(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/account${params}`, { headers: this.headers });
  }

  // appliances

  getAppliances(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/appliances${params}`, { headers: this.headers });
  }

  getAppliance(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addAppliance(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/appliances${params}`, options);
  }

  updateAppliance(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  removeAppliance(uri, args){
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // events

  //Not implemented
  getEvents(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/events${params}`, { headers: this.headers });
  }

  // keypairs

  getKeyPair(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/keypairs${params}`, { headers: this.headers });
  }

  // membership roles

  getMembershipRoles(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/membership-roles${params}`, { headers: this.headers });
  }

  // memberships

  getMemberships(arg){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/memberships${params}`, { headers: this.headers });
  }

  addMembership(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/memberships${params}`, options);
  }

  //Not implemented
  removeMembership(uri, args){
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // password reset

  resetSingleUsePassword(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/password-reset${params}`, options);
  }

  changePassword(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/password-reset${params}`, options);
  }

  // volumes

  getVolumes(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/volumes${params}`, { headers: this.headers });
  }

  getVolume(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addVolume(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/volumes${params}`, options);
  }

  updateVolume(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  removeVolume(uri, args){
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // billing-accounts

  getBillingAccounts(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/billing-accounts${params}`, { headers: this.headers });
  }

  getBillingAccount(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addBillingAccount(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/billing-accounts${params}`, options);
  }

  removeBillingAccount(uri, args){
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateBillingAccount(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  //servers

  getServers(args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/servers${params}`, { headers: this.headers });
  }

  getServer(uri, args){
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addServer(data, args){
    const params = getUrlParams(args);
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/servers${params}`, options);
  }

  removeServer(uri, args){
    const params = getUrlParams(args);
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateServer(uri, data, args){
    const params = getUrlParams(args);
    const options = this.patchOptions(data);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

}
