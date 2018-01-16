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

describe('rollie', () => {
  let oneSphere;

  beforeAll((done) => {
    oneSphere = new OneSphere(URL);
    oneSphere.postSession({ username: USERNAME, password: PASSWORD })
      .then(() => done());
  });

  test('Add and remove user', (done) => {
    const data = {
      email: 'api@test.user',
      name: 'Api Test User',
      password: 'Pa$$w0rd',
      role: 'administrator',
    };
    // return expect(

    // Add user
    oneSphere.addUser(data)
      .then((user) => {
        expect(Object.keys(user)).toMatchSnapshot();
        delete data.password;
        expect(user).toMatchObject(expect.objectContaining(data));
        return user;
      })

      // Get user
      .then(user => oneSphere.getUser(user.uri))
      .then((user) => {
        expect(Object.keys(user)).toMatchSnapshot();
        expect(user).toMatchObject(expect.objectContaining(data));
        return user;
      })

      // Remove user
      .then(user => oneSphere.removeUser(user.uri))
      .then(() => done());

    // ).resolves.toBeDefined();
  }, 10000); // 10s, empirically determined

  // test('Onboard AWS provider', (done) => {
  //   expect(ns.getProviderTypes()
  //     // find AWS provider type URI
  //     .then(providerTypes =>
  //       providerTypes.members
  //         .filter(pt => pt.name === 'Amazon Web Services')[0])
  //
  //     // // add provider
  //     // .then(providerType => {
  //     //   const data = {
  //     //     id: '047977760050',
  //     //     providerTypesUri: providerType.uri,
  //     //     accessKey: '',
  //     //     secretKey: '',
  //     //   };
  //     //   return oneSphere.addProvider(data);
  //     // })
  //     //
  //     // // enable regions?
  //
  //     .then(() => done()));
  // });
  //
  // test('Onboard Private provider', (done) => {
  //   expect(ns.getProviderTypes()
  //     // find Private provider type URI
  //     .then(providerTypes =>
  //       providerTypes.members
  //         .filter(pt => pt.name === 'HPE NewStack')[0])
  //
  //     // // add provider
  //     // .then(providerType =>
  //     //   oneSphere.addProvider({
  //     //     providerTypesUri: providerType.uri,
  //     //     name: 'NewStack API Test Provider',
  //     //   }))
  //     //
  //     // // add region
  //     // .then(provider =>
  //     //   oneSphere.addRegion({
  //     //     providerUri: provider.uri,
  //     //     name: 'NewStack API Test Region - Mountain View',
  //     //     location: {
  //     //       latitude: 37.394817,
  //     //       longitude: -122.077975,
  //     //     }
  //     //   }))
  //     //
  //     // // add zone
  //     // .then(region =>
  //     //   oneSphere.getZoneTypes()
  //     //     .then(zoneTypes =>
  //     //       zoneTypes.members
  //     //         .filter(zt => zt.name === 'VMware Vcenter Availability Zone')[0])
  //     //     .then(zoneType =>
  //     //       oneSphere.addZone({
  //     //         regionUri: region.uri,
  //     //         name: 'NewStack API Test Zone',
  //     //         zoneTypeUri: zoneType.uri,
  //     //       }))
  //
  //     .then(() => done()));
  // });
});
