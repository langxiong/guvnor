var expect = require('chai').expect,
  sinon = require('sinon'),
  ClusterManagerRPC = require('../../../../lib/daemon/cluster/ClusterManagerRPC')

describe('ClusterManagerRPC', function () {

  it('should delegate to cluster manager to set number of process workers', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager = {
      setNumWorkers: sinon.stub()
    }
    rpc._parentProcess = {
      send: sinon.stub()
    }
    rpc._os = {
      cpus: sinon.stub().returns([null, null, null, null])
    }

    rpc._clusterManager.setNumWorkers.callsArg(1)

    rpc.setClusterWorkers(2, function (error) {
      expect(error).to.not.exist

      done()
    })
  })

  it('should error when setting number of process workers to a non-number', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager = {
      setNumWorkers: sinon.stub()
    }
    rpc._parentProcess = {
      send: sinon.stub()
    }

    rpc._clusterManager.setNumWorkers.callsArg(1)

    rpc.setClusterWorkers('foo', function (error) {
      expect(error).to.exist

      done()
    })
  })

  it('should error when setting number of process workers to zero', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager = {
      setNumWorkers: sinon.stub()
    }
    rpc._parentProcess = {
      send: sinon.stub()
    }

    rpc._clusterManager.setNumWorkers.callsArg(1)

    rpc.setClusterWorkers(0, function (error) {
      expect(error).to.exist

      done()
    })
  })

  it('should error when setting number of process workers to a negative number', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager = {
      setNumWorkers: sinon.stub()
    }
    rpc._parentProcess = {
      send: sinon.stub()
    }

    rpc._clusterManager.setNumWorkers.callsArg(1)

    rpc.setClusterWorkers(-1, function (error) {
      expect(error).to.exist

      done()
    })
  })

  it('should error when setting number of process workers to a number greater than the available CPUs', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager = {
      setNumWorkers: sinon.stub()
    }
    rpc._parentProcess = {
      send: sinon.stub()
    }
    rpc._os = {
      cpus: sinon.stub().returns([null, null])
    }

    rpc._clusterManager.setNumWorkers.callsArg(1)

    rpc.setClusterWorkers(4, function (error) {
      expect(error).to.exist

      done()
    })
  })

  it('should report status of process and workers', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager.workers = [{
      remote: {
        reportStatus: sinon.stub()
      }
    }, {
      remote: {
        reportStatus: sinon.stub()
      }
    }]
    rpc._usage = {
      lookup: sinon.stub()
    }
    rpc._userInfo = {
      getUserName: sinon.stub(),
      getGroupName: sinon.stub()
    }

    rpc._usage.lookup.callsArgWith(2, undefined, {})
    rpc._clusterManager.workers[0].remote.reportStatus.callsArgWith(0, undefined, {})
    rpc._clusterManager.workers[1].remote.reportStatus.callsArgWith(0, undefined, {})

    rpc.reportStatus(function (error, status) {
      expect(error).to.not.exist

      expect(status.workers.length).to.equal(2)

      done()
    })
  })

  it('should survive unconnected workers', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager.workers = [{}, {}]
    rpc._usage = {
      lookup: sinon.stub()
    }
    rpc._userInfo = {
      getUserName: sinon.stub(),
      getGroupName: sinon.stub()
    }

    rpc._usage.lookup.callsArgWith(2, undefined, {})

    rpc.reportStatus(function (error, status) {
      expect(error).to.not.exist

      expect(status.workers.length).to.equal(2)

      done()
    })
  })

  it('should survive workers timing out', function (done) {
    var rpc = new ClusterManagerRPC()
    rpc._clusterManager.workers = [{
      remote: {
        reportStatus: sinon.stub()
      }
    }, {
      remote: {
        reportStatus: sinon.stub()
      }
    }]
    rpc._usage = {
      lookup: sinon.stub()
    }
    rpc._userInfo = {
      getUserName: sinon.stub(),
      getGroupName: sinon.stub()
    }

    var timeout = new Error('urk!')
    timeout.code = 'TIMEOUT'

    rpc._usage.lookup.callsArgWith(2, undefined, {})
    rpc._clusterManager.workers[0].remote.reportStatus.callsArgWith(0, timeout)
    rpc._clusterManager.workers[1].remote.reportStatus.callsArgWith(0, undefined, {})

    rpc.reportStatus(function (error, status) {
      expect(error).to.not.exist

      expect(status.workers.length).to.equal(2)

      done()
    })
  })
})
