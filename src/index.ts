import { dag, Container, object, func } from "@dagger.io/dagger";

@object
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Test {
  /**
   * example usage: "dagger call test"
   *
   */
  @func
  async test() {
    try {
      await this.testIt();
    } catch (e) {
      // Otherwise, show the full stack trace for debugging.
      console.error("an error ocurred");

      // Abort script with non-zero exit code.
      const output = await this.failureFn()
      console.log(output)
    }
  }

  async testIt() {
    await dag
      .container()
      .from("alpine")
      .withEnvVariable("CACHEBUSTER", Date.now().toString())
      .withExec(["sh", "-c", "exit 1"])
      .sync();
  }

  async failureFn(): Promise<string> {
    return dag
      .container()
      .from("alpine")
      .withEnvVariable("CACHEBUSTER", Date.now().toString())
      .withExec(["sh", "-c", "echo 'hiya buddy'"])
      .stdout();
  }
}
