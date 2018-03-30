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
  let projectTestDeploymentUri;

  beforeAll((done) => {
    oneSphere = new OneSphere(URL);
    oneSphere.postSession({ username: USERNAME, password: PASSWORD })
      .then(() => {
        const data = {
          'name': 'Api Test Deployment',
          'description': 'Api Test Deployment Description',
          'tagUris': [
            '/rest/tags/environment=development',
          ],
        };
        // add project
        oneSphere.addProject(data)
          .then((project) => {
            projectTestDeploymentUri = project.uri;
            done();
          });
      });
  });

  afterAll((done) => {
    setTimeout(() => {
      oneSphere.removeProject(projectTestDeploymentUri)
        .then(() => done());
    }, 10000); // wait for 10 (arbitrary) seconds to make sure the deployment was stopped
  }, 15000); // wait for 10+5 seconds (arbitrary)

  test('Add, update and remove user', (done) => {
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

      // Update user
      .then(user => oneSphere.updateUser(user.uri, { role: 'analyst' }))
      .then((user) => {
        expect(Object.keys(user)).toMatchSnapshot();
        data.role = 'analyst';
        expect(user).toMatchObject(expect.objectContaining(data));
        return user;
      })

      // Remove user
      .then(user => oneSphere.removeUser(user.uri))
      .then(() => done());

    // ).resolves.toBeDefined();
  }, 10000); // 10s, empirically determined

  test('Add, update and remove project + create and remove deployment', (done) => {
    const data = {
      'name': 'Api Test Project',
      'description': 'Api Test Project Description',
      'tagUris': [
        '/rest/tags/environment=development',
      ],
    };
    // add project
    oneSphere.addProject(data)
      .then((project) => {
        expect(Object.keys(project)).toMatchSnapshot();
        expect(project).toMatchObject(expect.objectContaining(data));
        return project;
      })

      // get project
      .then(project => oneSphere.getProject(project.uri))
      .then((project) => {
        expect(Object.keys(project)).toMatchSnapshot();
        expect(project).toMatchObject(expect.objectContaining(data));
        return project;
      })

      // Update project
      .then(project => oneSphere.updateProject(project.uri, { description: 'updated description' }))
      .then((project) => {
        expect(Object.keys(project)).toMatchSnapshot();
        data.description = 'updated description';
        expect(project).toMatchObject(expect.objectContaining(data));
        return project;
      })

      // remove project
      .then(project => oneSphere.removeProject(project.uri))
      .then(() => done());
  }, 10000); // 10s, empirically determined


  test('Create and delete deployment (+getZones+getServices+getVirtualMachineProfiles+getNetworks)', (done) => {
    // prerequisites: assumes:
    // - your oneSphere instance has a vCenter provider
    // - you have a template that fits one of the profiles provided by oneSphere (https://cic-demo-hpe.hpeonesphere.com/docs/api/endpoint?&path=%2Fvirtual-machine-profiles)
    // - you have networks associated to the vCenter provider
    Promise.all([
      oneSphere.getZones({ count: -1 }),
      oneSphere.getServices({ count: -1 }),
      oneSphere.getVirtualMachineProfiles({ count: -1 }),
    ])
      .then((APIdata) => {
        const zones = APIdata[0];
        const services = APIdata[1];
        const vmProfiles = APIdata[2];
        const vCenterZone = zones.members
          .filter(item => item.zoneTypeUri === '/rest/zone-types/vcenter')[0];

        oneSphere.getNetworks({ count: -1, query: `zoneUri EQ ${vCenterZone.uri}` })
          .then((networks) => {
            const vmProfile = vmProfiles.members
              .filter(item => item.zoneUri === vCenterZone.uri && item.diskSizeGB >= 20)[0];
            const service = services.members
              .filter(item => item.zoneUri === vCenterZone.uri)[0];
            const network = networks.members
              .filter(item => item.zoneUri === vCenterZone.uri)[0];
            const dataDeployment = {
              'assignExternalIP': false,
              'name': 'api-test-deployment',
              'projectUri': projectTestDeploymentUri,
              // 'publicKey': '', // no public key
              'regionUri': vCenterZone.regionUri, // from getZones().members[1]
              'serviceUri': service.uri,
              // 'userData': '', // no user data (<=> cloud-init)
              // 'version': 'string', // ??
              'virtualMachineProfileUri': vmProfile.uri, // from vmProfile mapping to zone
              'zoneUri': vCenterZone.uri,
              'networks': [{
                networkUri: network.uri,
              }],
            };

            oneSphere.addDeployment(dataDeployment)
              .then((deployment) => {
                expect(Object.keys(deployment)).toMatchSnapshot();
                return deployment;
              })
              .then((deployment) => {
                oneSphere.removeDeployment(deployment.uri)
                  .then(() => done());
              });
          });
      });
  }, 20000); // 20 sec

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
