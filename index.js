const core = require('@actions/core');
const SentryCli = require('@sentry/cli');

runAction().catch( error => {
  console.log(error.message);
  core.setFailed(error.message);
});


async function runAction() {

  // Can I leave this out? how to do this with sentryCli?
  const tag = "sentrycli-test-release222";

  // This input is defined in action.yml and its value is provided by users of this Action in their own workflow files
  const environment = core.getInput('environment');
  core.info(`Environment is: ${environment}`);
  console.log(`Environment is: ${environment}`);


  const sentryCli = new SentryCli();

  await sentryCli.releases.new(tag);

  console.log(sentryCli.releases);

  /*
  // Set commits
  await sentryCli.releases.setCommits(tag, {
    repo: 'repo',
    auto: true
  });
*/

  // Finalize the release
  await sentryCli.releases.finalize(tag);
}

