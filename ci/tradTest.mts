import { connect, Client, Container } from "@dagger.io/dagger";

connect(async (client: Client) => {
    try {
        await testIt(client);
    } catch (e) {
        // Otherwise, show the full stack trace for debugging.
        console.error("an error ocurred");

        // Abort script with non-zero exit code.
        const output = await failureFn(client)
        console.log(output)
    }
});

async function testIt(client: Client) {
    await client
        .container()
        .from("alpine")
        .withEnvVariable("CACHEBUSTER", Date.now().toString())
        .withExec(["sh", "-c", "exit 1"])
        .sync();
}

async function failureFn(client: Client): Promise<string> {
    return client
        .container()
        .from("alpine")
        .withEnvVariable("CACHEBUSTER", Date.now().toString())
        .withExec(["sh", "-c", "echo 'hiya buddy'"])
        .stdout();
}