// (C) Copyright 2017-2018 Hewlett Packard Enterprise Development LP
import OneSphere from '../src';

const URL = process.env.ONESPHERE_URL;
const USERNAME = process.env.ONESPHERE_USERNAME;
const PASSWORD = process.env.ONESPHERE_PASSWORD;

if (!URL) {
  console.error('Missing ONESPHERE_URL environment variable.');
}
if (!USERNAME) {
  console.error('Missing ONESPHERE_USERNAME environment variable.');
}
if (!PASSWORD) {
  console.error('Missing ONESPHERE_PASSWORD environment variable.');
}
if (!URL || !USERNAME || !PASSWORD) {
  process.exit(1);
}

describe('basic', () => {
  let oneSphere;

  beforeAll((done) => {
    oneSphere = new OneSphere(URL);
    oneSphere.postSession({ username: USERNAME, password: PASSWORD })
      .then(() => done());
  });

  test('Status', () =>
    expect(oneSphere.getStatus()
      .then(status => Object.keys(status)))
      .resolves.toMatchSnapshot());

  test('Session', () =>
    expect(oneSphere.getSession()
      .then(session => Object.keys(session)))
      .resolves.toMatchSnapshot());

  test('User', () =>
    expect(oneSphere.getUsers()
      .then(users => Object.keys(users.members[0])))
      .resolves.toMatchSnapshot());

  test('Role', () =>
    expect(oneSphere.getRoles()
      .then(roles => Object.keys(roles.members[0])))
      .resolves.toMatchSnapshot());

  test('Catalog Types', () =>
    expect(oneSphere.getCatalogTypes()
      .then(catalogTypes => Object.keys(catalogTypes.members[0])))
      .resolves.toMatchSnapshot());

  test('Catalog', () =>
    expect(oneSphere.getCatalogs()
      .then(catalogs => Object.keys(catalogs.members[0])))
      .resolves.toMatchSnapshot());

  test('ServiceType', () =>
    expect(oneSphere.getServiceTypes())
      .resolves.toMatchSnapshot());

  test('Service', () =>
    expect(oneSphere.getServices()
      .then(services => Object.keys(services.members[0])))
      .resolves.toMatchSnapshot());

  test('VirtualMachineProfile', () =>
    expect(oneSphere.getVirtualMachineProfiles()
      .then(vmProfiles => Object.keys(vmProfiles.members[0])))
      .resolves.toMatchSnapshot());

  test('TagKey', () =>
    expect(oneSphere.getTagKeys()
      .then(tagKeys => Object.keys(tagKeys.members[0])))
      .resolves.toMatchSnapshot());

  test('Tag', () =>
    expect(oneSphere.getTags()
      .then(tags => Object.keys(tags.members[0])))
      .resolves.toMatchSnapshot());

  test('ProviderType', () =>
    expect(oneSphere.getProviderTypes())
      .resolves.toMatchSnapshot());

  test('Provider', () =>
    expect(oneSphere.getProviders()
      .then(providers => Object.keys(providers.members[0])))
      .resolves.toMatchSnapshot());

  test('Region', () =>
    expect(oneSphere.getRegions()
      .then(regions => Object.keys(regions.members[0])))
      .resolves.toMatchSnapshot());

  test('ZoneType', () =>
    expect(oneSphere.getZoneTypes())
      .resolves.toMatchSnapshot());

  test('Zone', () =>
    expect(oneSphere.getZones()
      .then(zones => Object.keys(zones.members[0])))
      .resolves.toMatchSnapshot());

  test('Rate', () =>
    expect(oneSphere.getRates()
      .then(rates => Object.keys(rates.members[0])))
      .resolves.toMatchSnapshot());

  test('Project', () =>
    expect(oneSphere.getProjects()
      .then(projects => Object.keys(projects.members[0])))
      .resolves.toMatchSnapshot());

  test('Deployment', () =>
    expect(oneSphere.getDeployments()
      .then(deployments => Object.keys(deployments.members[0])))
      .resolves.toMatchSnapshot());

  test('Metric', () =>
    expect(oneSphere.getMetrics({ category: 'projects', period: 'month', name: 'cost.usage' })
      .then(metrics => Object.keys(metrics.members[0])))
      .resolves.toMatchSnapshot());
});

describe('add, update, delete', () => {
  let oneSphere;

  beforeAll((done) => {
    oneSphere = new OneSphere(URL);
    oneSphere.postSession({ username: USERNAME, password: PASSWORD })
      .then(() => done());
  });

  // requires being 'analyst' and not only 'user'
  // => should it be in a separate file analyst.spec.js?

  test('TagKey', (done) => {
    const data = {
      'name': 'Api Test TagKey',
    };
    // add project
    oneSphere.addTagKey(data)
      .then((tagkey) => {
        expect(Object.keys(tagkey)).toMatchSnapshot();
        expect(tagkey).toMatchObject(expect.objectContaining(data));
        return tagkey;
      })

      // get tagkey
      .then(tagkey => oneSphere.getTagKey(tagkey.uri))
      .then((tagkey) => {
        expect(Object.keys(tagkey)).toMatchSnapshot();
        expect(tagkey).toMatchObject(expect.objectContaining(data));
        return tagkey;
      })

      // no PATCH request to update tagkey availables

      // remove tagkey
      .then(tagkey => oneSphere.removeTagKey(tagkey.uri))
      .then(() => done());
  }, 5000); // 5s empirically determined
});
