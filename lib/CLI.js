var commander = require("commander"),
	pkg = require(__dirname + "/../package.json"),
	path = require("path"),
	Autowire = require("wantsit").Autowire;

var CLI = function() {
	this._boss = Autowire;
};

CLI.prototype.afterPropertiesSet = function() {

	commander
		.version(pkg.version);

	commander
		.command("list")
		.description("List all running processes")
		.action(this.list.bind(this));

	commander
		.command("start <script>")
		.description("Start a process")
		.option("-u, --user", "The user to start a process as")
		.option("-g, --group", "The group to start a process as")
		.action(this.start.bind(this));

	commander
		.command("stop [name]")
		.description("Stop a process")
		.action(this.stop.bind(this));

	commander
		.command("kill")
		.description("Stop all processes and kill the daemon")
		.action(this.kill.bind(this));

	commander
		.command("key")
		.description("Manage client RSA keys")
		.action(this.key.bind(this))
			.command("add")
				.option("-n, --name", "A key name")
				.option("-k, --key", "The path to the key")
				.description("Add a key")
				.action(this.key.bind(this))
			.command("rm")
				.option("-n, --name", "A key name")
				.description("Remove a key")
				.action(this.key.bind(this))
			.command("list")
				.description("List the keys")
				.action(this.key.bind(this));

	commander.on('--help', function(){
		console.log("\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;255m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;146m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;109m\u2588\u001b[38;5;109m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;7m\u2588\u001b[38;5;68m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;111m\u2588\u001b[38;5;117m\u2588\u001b[38;5;117m\u2588\u2588\u001b[38;5;117m\u2588\u001b[38;5;111m\u2588\u001b[38;5;117m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;250m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;256m\u2588\u001b[38;5;252m\u2588\u001b[38;5;244m\u2588\u001b[38;5;242m\u2588\u001b[38;5;241m\u2588\u001b[38;5;59m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;60m\u2588\u001b[38;5;240m\u2588\u001b[38;5;242m\u2588\u001b[38;5;244m\u2588\u001b[38;5;252m\u2588\u001b[38;5;256m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;242m\u2588\u001b[38;5;241m\u2588\u001b[38;5;59m\u2588\u001b[38;5;240m\u2588\u001b[38;5;239m\u2588\u001b[38;5;238m\u2588\u001b[38;5;237m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;109m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;67m\u2588\u001b[38;5;238m\u2588\u001b[38;5;239m\u2588\u001b[38;5;240m\u2588\u001b[38;5;59m\u2588\u001b[38;5;241m\u2588\u001b[38;5;242m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;239m\u2588\u001b[38;5;239m\u2588\u001b[38;5;239m\u2588\u001b[38;5;238m\u2588\u001b[38;5;238m\u2588\u001b[38;5;236m\u2588\u001b[38;5;234m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;103m\u2588\u001b[38;5;239m\u2588\u001b[38;5;60m\u2588\u001b[38;5;60m\u2588\u001b[38;5;103m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;110m\u2588\u001b[38;5;111m\u2588\u001b[38;5;111m\u2588\u001b[38;5;234m\u2588\u001b[38;5;236m\u2588\u001b[38;5;238m\u2588\u001b[38;5;238m\u2588\u001b[38;5;239m\u2588\u001b[38;5;239m\u2588\u001b[38;5;239m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;238m\u2588\u001b[38;5;238m\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;110m\u2588\u001b[38;5;111m\u2588\u001b[38;5;110m\u2588\u001b[38;5;67m\u2588\u001b[38;5;74m\u2588\u001b[38;5;52m\u2588\u001b[38;5;52m\u2588\u001b[38;5;130m\u2588\u001b[38;5;124m\u2588\u001b[38;5;52m\u2588\u001b[38;5;74m\u2588\u001b[38;5;67m\u2588\u001b[38;5;110m\u2588\u001b[38;5;111m\u2588\u001b[38;5;110m\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;238m\u2588\u001b[38;5;238m\u2588\u001b[38;5;238m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;237m\u2588\u001b[38;5;237m\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;67m\u2588\u001b[38;5;74m\u2588\u001b[38;5;111m\u2588\u001b[38;5;111m\u2588\u001b[38;5;239m\u2588\u001b[38;5;52m\u2588\u001b[38;5;52m\u2588\u001b[38;5;68m\u2588\u001b[38;5;111m\u2588\u001b[38;5;74m\u2588\u001b[38;5;67m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;236m\u2588\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;67m\u2588\u001b[38;5;110m\u2588\u001b[38;5;111m\u2588\u001b[38;5;52m\u2588\u001b[38;5;52m\u2588\u001b[38;5;124m\u2588\u001b[38;5;60m\u2588\u001b[38;5;110m\u2588\u001b[38;5;67m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;67m\u2588\u001b[38;5;74m\u2588\u001b[38;5;111m\u2588\u001b[38;5;124m\u2588\u001b[38;5;131m\u2588\u001b[38;5;52m\u2588\u001b[38;5;242m\u2588\u001b[38;5;74m\u2588\u001b[38;5;67m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;67m\u2588\u001b[38;5;67m\u2588\u001b[38;5;52m\u2588\u001b[38;5;130m\u2588\u001b[38;5;124m\u2588\u001b[38;5;60m\u2588\u001b[38;5;67m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;240m\u2588\u001b[38;5;67m\u2588\u001b[38;5;88m\u2588\u001b[38;5;52m\u2588\u001b[38;5;236m\u2588\u001b[38;5;240m\u2588\u001b[38;5;60m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;237m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;236m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;60m\u2588\u001b[38;5;235m\u2588\u001b[38;5;88m\u2588\u001b[38;5;236m\u2588\u001b[38;5;239m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u2588\u001b[38;5;236m\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;232m\u2588\u001b[38;5;52m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;239m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;226m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;52m\u2588\u001b[38;5;52m\u2588\u001b[38;5;232m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;226m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;240m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;238m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;240m\u2588\u001b[38;5;235m\u2588\u001b[38;5;235m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;16m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;52m\u2588\u001b[38;5;52m\u2588\u001b[38;5;52m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;239m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;238m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;234m\u2588\u2588\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;190m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;237m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;249m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;233m\u2588\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;142m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;233m\u2588\u001b[38;5;234m\u2588\u001b[38;5;234m\u2588\u2588\u2588\u001b[38;5;233m\u2588\u001b[38;5;248m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u001b[38;5;256m\u2588\u001b[38;5;188m\u2588\u001b[38;5;250m\u2588\u001b[38;5;242m\u2588\u001b[38;5;233m\u2588\u001b[38;5;100m\u2588\u001b[38;5;3m\u2588\u001b[38;5;58m\u2588\u001b[38;5;58m\u2588\u001b[38;5;237m\u2588\u001b[38;5;236m\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;237m\u2588\u001b[38;5;3m\u2588\u001b[38;5;142m\u2588\u001b[38;5;0m\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u2588\u2588\u001b[38;5;234m\u2588\u001b[38;5;235m\u2588\u2588\u2588\u001b[38;5;235m\u2588\u001b[38;5;236m\u2588\u001b[38;5;102m\u2588\u001b[38;5;7m\u2588\u001b[38;5;254m\u2588\u001b[38;5;256m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n\u001b[38;5;15m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u2588\u001b[38;5;255m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;256m\u2588\u001b[38;5;15m\u2588\u2588\u2588\u2588\u2588\u2588\u2588\033[0m\n")
	});

	commander
		.command("*")
		.action(this.default.bind(this));

	commander.parse(process.argv);
}

CLI.prototype.list = function() {
	this._boss.invoke(function() {
		this._boss.listProcesses(function(error, processes) {
			console.info(processes);

			process.exit(0);
		});
	}.bind(this));
};

CLI.prototype.start = function(script, options) {
	script = path.resolve(script);

	this._boss.invoke(function() {
		this._boss.startProcess(script, function(error) {
			if(error) {
				console.error(error);
			}

			process.exit(0);
		});
	}.bind(this));
};

CLI.prototype.stop = function() {

};

CLI.prototype.kill = function() {
	this._boss.invoke(function() {
		this._boss.kill();

		process.exit(0);
	}.bind(this));
};

CLI.prototype.key = function() {

};

CLI.prototype.default = function() {
	console.info("Please specify a subcommand");
	process.exit(0);
};

module.exports = CLI;