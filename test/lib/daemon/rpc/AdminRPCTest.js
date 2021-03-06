var expect = require('chai').expect,
  sinon = require('sinon'),
  inherits = require('util').inherits,
  AdminRPC = require('../../../../lib/daemon/rpc/AdminRPC'),
  EventEmitter = require('events').EventEmitter

describe('AdminRPC', function () {

  it('should expose admin methods', function () {
    var rpc = new AdminRPC()
    rpc._config = {
      guvnor: {}
    }
    rpc._processFactory = {
      connect: sinon.stub()
    }
    rpc._guvnor = {
      kill: sinon.stub(),
      remoteHostConfig: sinon.stub(),
      addRemoteUser: sinon.stub(),
      removeRemoteUser: sinon.stub(),
      listRemoteUsers: sinon.stub(),
      rotateRemoteUserKeys: sinon.stub(),
      generateRemoteRpcCertificates: sinon.stub(),
      startProcessAsUser: sinon.stub(),
      dumpProcesses: sinon.stub(),
      restoreProcesses: sinon.stub()
    }
    rpc._dnode = sinon.stub()
    rpc._fileSystem = {
      getRunDir: sinon.stub()
    }
    rpc._fs = {
      existsSync: sinon.stub(),
      unlinkSync: sinon.stub(),
      chown: sinon.stub(),
      exists: sinon.stub()
    }
    rpc._logger = {
      info: sinon.stub(),
      warn: sinon.stub(),
      error: sinon.stub(),
      debug: sinon.stub()
    }

    var socket = new EventEmitter()
    var dnode = new EventEmitter()
    dnode.listen = sinon.stub()
    dnode.listen.returns(socket)
    rpc._dnode.returns(dnode)

    rpc.afterPropertiesSet()

    expect(rpc.kill).to.be.a('function')
    expect(rpc.remoteHostConfig).to.be.a('function')
    expect(rpc.addRemoteUser).to.be.a('function')
    expect(rpc.removeRemoteUser).to.be.a('function')
    expect(rpc.listRemoteUsers).to.be.a('function')
    expect(rpc.rotateRemoteUserKeys).to.be.a('function')
    expect(rpc.dumpProcesses).to.be.a('function')
    expect(rpc.restoreProcesses).to.be.a('function')
  })
})
