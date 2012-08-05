var wrench = require('wrench');

if(process.argv[2]) {
	wrench.copyDirSyncRecursive('templates', process.argv[2].toString());
}