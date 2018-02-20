// (C) Copyright 2017-2018 Hewlett Packard Enterprise Development LP

const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
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

  deleteOptions() {
    return {
      headers: this.headers,
      method: 'DELETE',
    };
  }

  // status

  getStatus() {
    return fetcher(`${this.host}/rest/status`, { headers: this.headers });
  }

  // session

  postSession({ username, password, full }) {
    const options = this.postOptions({ username, password });
    const fullQuery = full ? '?view=full' : '';
    return fetcher(`${this.host}/rest/session${fullQuery}`, options)
      .then((session) => {
        this.headers.authorization = `Bearer ${session.token}`;
        return session;
      });
  }

  getSession() {
    return fetcher(`${this.host}/rest/session`, { headers: this.headers });
  }

  // users

  getUsers() {
    return fetcher(`${this.host}/rest/users`, { headers: this.headers });
  }

  addUser(data) {
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/users`, options);
  }

  getUser(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  removeUser(uri) {
    const options = { headers: this.headers, method: 'DELETE' };
    return fetcher(`${this.host}${uri}`, options);
  }

  // roles

  getRoles() {
    return fetcher(`${this.host}/rest/roles`, { headers: this.headers });
  }

  getRole(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // catalog-types

  getCatalogTypes() {
    return fetcher(`${this.host}/rest/catalog-types`, { headers: this.headers });
  }

  getCatalogType(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // catalogs

  getCatalogs() {
    return fetcher(`${this.host}/rest/catalogs`, { headers: this.headers });
  }

  getCatalog(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // service-types

  getServiceTypes() {
    return fetcher(`${this.host}/rest/service-types`, { headers: this.headers });
  }

  // services

  getServices() {
    return fetcher(`${this.host}/rest/services`, { headers: this.headers });
  }

  getService(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // virtual-machine-profiles

  getVirtualMachineProfiles() {
    return fetcher(`${this.host}/rest/virtual-machine-profiles`, { headers: this.headers });
  }

  getVirtualMachineProfile(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // tag-keys

  getTagKeys() {
    return fetcher(`${this.host}/rest/tag-keys`, { headers: this.headers });
  }

  getTagKey(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // tags

  getTags() {
    return fetcher(`${this.host}/rest/tags`, { headers: this.headers });
  }

  getTag(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // provider-types

  getProviderTypes() {
    return fetcher(`${this.host}/rest/provider-types`, { headers: this.headers });
  }

  // providers

  getProviders() {
    return fetcher(`${this.host}/rest/providers`, { headers: this.headers });
  }

  addProvider(data) {
    const options = this.postOptions(data);
    return fetcher(`${this.host}/rest/providers`, options);
  }

  getProvider(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  removeProvider(uri) {
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}`, options);
  }

  // regions

  getRegions() {
    return fetcher(`${this.host}/rest/regions`, { headers: this.headers });
  }

  getRegion(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // args: { force: true }
  removeRegion(uri, args) {
    const options = this.deleteOptions();
    const params = args ? `?${Object.keys(args).map(k => `${k}=${encodeURIComponent(args[k])}`).join('&')}` : '';
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // zone-types

  getZoneTypes() {
    return fetcher(`${this.host}/rest/zone-types`, { headers: this.headers });
  }

  // zones

  getZones() {
    return fetcher(`${this.host}/rest/zones`, { headers: this.headers });
  }

  getZone(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  removeZone(uri) {
    const options = this.deleteOptions();
    return fetcher(`${this.host}${uri}`, options);
  }

  // rates

  getRates() {
    return fetcher(`${this.host}/rest/rates`, { headers: this.headers });
  }

  getRate(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // projects

  getProjects() {
    return fetcher(`${this.host}/rest/projects`, { headers: this.headers });
  }

  getProject(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // deployments

  getDeployments() {
    return fetcher(`${this.host}/rest/deployments`, { headers: this.headers });
  }

  getDeployment(uri) {
    return fetcher(`${this.host}${uri}`, { headers: this.headers });
  }

  // metrics

  getMetrics(options) {
    const params = options ? `?${Object.keys(options).map(k => `${k}=${encodeURIComponent(options[k])}`).join('&')}` : '';
    return fetcher(`${this.host}/rest/metrics${params}`, { headers: this.headers });
  }
}
