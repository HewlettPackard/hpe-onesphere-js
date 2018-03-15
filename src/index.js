// (C) Copyright 2017-2018 Hewlett Packard Enterprise Development LP

const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const getUrlParams = args => args ? `?${Object.keys(args).map(k => `${k}=${encodeURIComponent(args[k])}`).join('&')}` : '';

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
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
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
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/session${params}`, { headers: this.headers });
  }

  // users

  getUsers(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/users${params}`, { headers: this.headers });
  }

  addUser(data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/users${params}`, options);
  }

  getUser(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeUser(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  updateUser(uri, data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.patchOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // roles

  getRoles(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/roles${params}`, { headers: this.headers });
  }

  getRole(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // catalog-types

  getCatalogTypes(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/catalog-types${params}`, { headers: this.headers });
  }

  getCatalogType(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // catalogs

  getCatalogs(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/catalogs${params}`, { headers: this.headers });
  }

  getCatalog(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // service-types

  getServiceTypes(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/service-types${params}`, { headers: this.headers });
  }

  // services

  getServices(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/services${params}`, { headers: this.headers });
  }

  getService(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // virtual-machine-profiles

  getVirtualMachineProfiles(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/virtual-machine-profiles${params}`, { headers: this.headers });
  }

  getVirtualMachineProfile(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // tag-keys

  getTagKeys(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tag-keys${params}`, { headers: this.headers });
  }

  getTagKey(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addTagKey(data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tag-keys${params}`, options);
  }

  removeTagKey(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // no PATCH Tag-key available

  // tags

  getTags(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tags${params}`, { headers: this.headers });
  }

  getTag(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addTag(data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/tags${params}`, options);
  }

  removeTag(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // no PATCH tag available

  // provider-types

  getProviderTypes(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/provider-types${params}`, { headers: this.headers });
  }

  // providers

  getProviders(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/providers${params}`, { headers: this.headers });
  }

  addProvider(data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/providers${params}`, options);
  }

  getProvider(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeProvider(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.deleteOptions();
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // regions

  getRegions(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/regions${params}`, { headers: this.headers });
  }

  getRegion(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // args: { force: true }
  removeRegion(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.deleteOptions();
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // zone-types

  getZoneTypes(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/zone-types${params}`, { headers: this.headers });
  }

  // zones

  getZones(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/zones${params}`, { headers: this.headers });
  }

  getZone(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  removeZone(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.deleteOptions();
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // rates

  getRates(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/rates${params}`, { headers: this.headers });
  }

  getRate(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // projects

  getProjects(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/projects${params}`, { headers: this.headers });
  }

  getProject(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  addProject(data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.postOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/projects${params}`, options);
  }

  updateProject(uri, data, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = this.patchOptions(data);
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  removeProject(uri, args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const options = { headers: this.headers, method: 'DELETE' };
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, options);
  }

  // deployments

  getDeployments(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/deployments${params}`, { headers: this.headers });
  }

  getDeployment(uri, args) {
    const params = getUrlParams(args);
    return fetcher(`${this.host}${uri}${params}`, { headers: this.headers });
  }

  // metrics

  getMetrics(args) {
    if (args && (typeof args !== 'object' || Array.isArray(args))) {
      throw new Error('args parameter should be an object');
    }
    const params = getUrlParams(args);
    return fetcher(`${this.host}/rest/metrics${params}`, { headers: this.headers });
  }
}
