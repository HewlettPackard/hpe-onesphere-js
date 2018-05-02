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

  // users

  getUsers(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/users${params}`, { headers: this.headers });
  }

  addUser(data, args) {
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/users${params}`, options);
  }

  getUser(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeUser(uri, args) {
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateUser(uri, data, args) {
    const options = this.patchOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // roles

  getRoles(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/roles${params}`, { headers: this.headers });
  }

  getRole(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // catalog-types

  getCatalogTypes(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/catalog-types${params}`, { headers: this.headers });
  }

  getCatalogType(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
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

  // service-types

  getServiceTypes(args) {
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
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tag-keys${params}`, options);
  }

  removeTagKey(uri, args) {
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
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
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tags${params}`, options);
  }

  removeTag(uri, args) {
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
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
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/providers${params}`, options);
  }

  getProvider(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeProvider(uri, args) {
    const options = this.deleteOptions();
    const params = getUrlParams(args);
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

  // args: { force: true }
  removeRegion(uri, args) {
    const options = this.deleteOptions();
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }
  
  updateRegion(uri, data, args) {
    const options = this.patchOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // zone-types

  getZoneTypes(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/zone-types${params}`, { headers: this.headers });
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
    const options = this.deleteOptions();
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
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
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/projects${params}`, options);
  }

  updateProject(uri, data, args) {
    const options = this.patchOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  removeProject(uri, args) {
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // deployments

  addDeployment(data, args) {
    const options = this.postOptions(data);
    const params = getUrlParams(args);
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
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // metrics

  getMetrics(args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/metrics${params}`, { headers: this.headers });
  }
}
